#!/usr/bin/env python3
"""Phase 3: Remaining downloads. IA for big items, retry LibGen when available."""
import os, re, time, requests
from pathlib import Path

BASE = Path("/Users/victor/Downloads/taiping_wiki_markdown/08_Sources_and_Editing/downloads")
S = requests.Session()
S.headers.update({"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"})

def ia_download(url, dest, referer, desc, max_retries=5):
    dest.parent.mkdir(parents=True, exist_ok=True)
    for attempt in range(max_retries):
        try:
            headers = {"Referer": referer} if referer else {}
            start_byte = dest.stat().st_size if dest.exists() else 0
            if start_byte:
                headers["Range"] = f"bytes={start_byte}-"
                print(f"  [{desc}] Resuming from {start_byte/1024/1024:.1f}MB (attempt {attempt+1})")
            resp = S.get(url, headers=headers, stream=True, timeout=60)
            if resp.status_code not in (200, 206):
                print(f"  [{desc}] HTTP {resp.status_code}")
                time.sleep(10)
                continue
            total = int(resp.headers.get("content-length", 0)) or 50_000_000
            if resp.status_code == 206: total += start_byte
            mode = "ab" if start_byte else "wb"
            downloaded = start_byte
            t0 = time.time()
            last = 0
            with open(dest, mode) as f:
                for chunk in resp.iter_content(65536):
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        if time.time() - last > 5:
                            elapsed = time.time() - t0
                            spd = (downloaded-start_byte)/elapsed if elapsed>0 else 0
                            pct = downloaded/total*100
                            eta = (total-downloaded)/spd if spd>0 else 0
                            print(f"\r  [{desc}] {downloaded/1024/1024:.1f}/{total/1024/1024:.1f}MB ({pct:.0f}%) {spd/1024/1024:.2f}MB/s ETA:{eta:.0f}s   ", end="", flush=True)
                            last = time.time()
            actual = os.path.getsize(dest)
            print(f"\r  [{desc}] DONE: {actual/1024/1024:.1f}MB                          ")
            return actual > 100000
        except Exception as e:
            saved = dest.stat().st_size if dest.exists() else 0
            print(f"\n  [{desc}] Error at {saved/1024/1024:.1f}MB: {e}, retrying...")
            time.sleep(10)
    return False

def try_libgen_download(md5, dest, desc):
    """Try LibGen download, skip if 503."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 250000:
        print(f"  [{desc}] Already exists: {dest.stat().st_size/1024/1024:.1f}MB")
        return True
    try:
        ads_url = f"https://libgen.li/ads.php?md5={md5}"
        resp = S.get(ads_url, timeout=10)
        if resp.status_code == 503:
            print(f"  [{desc}] LibGen 503 (blocked), skipping for now")
            return False
        match = re.search(r'get\.php\?md5=' + md5 + r'&key=([A-Z0-9]+)', resp.text)
        if not match:
            print(f"  [{desc}] No key found in response")
            return False
        key = match.group(1)
        get_url = f"https://libgen.li/get.php?md5={md5}&key={key}"
        resp = S.get(get_url, stream=True, timeout=30)
        total = int(resp.headers.get("content-length", 0)) or 20_000_000
        downloaded = 0
        with open(dest, "wb") as f:
            for chunk in resp.iter_content(65536):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
        actual = os.path.getsize(dest)
        print(f"  [{desc}] DONE: {actual/1024/1024:.1f}MB")
        return actual > 100000
    except Exception as e:
        print(f"  [{desc}] Error: {e}")
        return False

# --- JOBS ---
# Known LibGen MD5s for items not yet downloaded:
LIBGEN_MD5S = []  # Will be populated when found

IA_JOBS = [
    # These are the large ones - skip if too big for current connection
    # Skipping 刘晨 (528MB) and BPP (1.6GB) for now - too large
]

SMALL_IA_JOBS = [
    ("https://archive.org/download/taipingrebellion0000mich/taipingrebellion0000mich.pdf",
     BASE / "english_scholarship" / "Michael_Taiping_Rebellion_IA.pdf",
     "https://archive.org/details/taipingrebellion0000mich",
     "Michael Taiping Rebellion (IA borrowable)"),
]

print("="*60)
print("PHASE 3: Remaining downloads")
print(f"LibGen status: Testing...")
r = S.get("https://libgen.li", timeout=10)
print(f"  LibGen.li: HTTP {r.status_code}")

if r.status_code == 200:
    print("  LibGen available! Will attempt remaining books.")
else:
    print("  LibGen unavailable, skipping LibGen downloads.")

for url, dest, ref, desc in SMALL_IA_JOBS:
    ia_download(url, dest, ref, desc)
    time.sleep(3)

print("\nDone!")
