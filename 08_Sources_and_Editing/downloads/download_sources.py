#!/usr/bin/env python3
"""Download remaining Taiping sources with retry logic."""

import sys, os, re, time, requests
from pathlib import Path

BASE = Path("/Users/victor/Downloads/taiping_wiki_markdown/08_Sources_and_Editing/downloads")
S = requests.Session()
S.headers.update({
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
})

def libgen_download_with_retry(md5, dest, desc, max_retries=3):
    """LibGen download with automatic retry on connection errors."""
    dest.parent.mkdir(parents=True, exist_ok=True)

    for attempt in range(max_retries):
        try:
            ads_url = f"https://libgen.li/ads.php?md5={md5}"
            resp = S.get(ads_url, timeout=20)
            match = re.search(r'get\.php\?md5=' + md5 + r'&key=([A-Z0-9]+)', resp.text)
            if not match:
                print(f"  [{desc}] No key found")
                return False
            key = match.group(1)
            get_url = f"https://libgen.li/get.php?md5={md5}&key={key}"

            # If partial file exists, try Range request
            headers = {}
            start_byte = 0
            if dest.exists():
                start_byte = dest.stat().st_size
                if start_byte > 0:
                    headers["Range"] = f"bytes={start_byte}-"
                    print(f"  [{desc}] Resuming from {start_byte/1024/1024:.1f}MB (attempt {attempt+1})")

            resp = S.get(get_url, headers=headers, stream=True, timeout=60)
            if resp.status_code not in (200, 206):
                print(f"  [{desc}] HTTP {resp.status_code}")
                return False

            total = int(resp.headers.get("content-length", 0)) or 50_000_000
            if resp.status_code == 206:
                total += start_byte  # Range response only gives remaining bytes

            mode = "ab" if start_byte > 0 else "wb"
            downloaded = start_byte
            start_time = time.time()
            last_report = 0

            with open(dest, mode) as f:
                for chunk in resp.iter_content(chunk_size=65536):
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        now = time.time()
                        if now - last_report > 3:
                            elapsed = now - start_time
                            speed = (downloaded - start_byte) / elapsed if elapsed > 0 else 0
                            pct = downloaded / total * 100
                            eta = (total - downloaded) / speed if speed > 0 else 0
                            print(f"\r  [{desc}] {downloaded/1024/1024:.1f}/{total/1024/1024:.1f}MB ({pct:.0f}%) {speed/1024/1024:.2f}MB/s ETA:{eta:.0f}s    ", end="", flush=True)
                            last_report = now

            actual = os.path.getsize(dest)
            print(f"\r  [{desc}] DONE: {actual/1024/1024:.1f}MB                               ")
            return actual > 250000

        except requests.exceptions.ChunkedEncodingError as e:
            saved = dest.stat().st_size if dest.exists() else 0
            print(f"\n  [{desc}] Connection broken at {saved/1024/1024:.1f}MB, retrying ({attempt+1}/{max_retries})...")
            time.sleep(3)
            continue
        except Exception as e:
            print(f"\n  [{desc}] Error: {e}, retrying ({attempt+1}/{max_retries})...")
            time.sleep(3)
            continue

    return False

def ia_download_with_retry(url, dest, referer, desc, max_retries=3):
    """IA download with retry."""
    dest.parent.mkdir(parents=True, exist_ok=True)

    for attempt in range(max_retries):
        try:
            headers = {"Referer": referer} if referer else {}
            start_byte = 0
            if dest.exists():
                start_byte = dest.stat().st_size
                if start_byte > 0:
                    headers["Range"] = f"bytes={start_byte}-"
                    print(f"  [{desc}] Resuming from {start_byte/1024/1024:.1f}MB (attempt {attempt+1})")

            resp = S.get(url, headers=headers, stream=True, timeout=60)
            if resp.status_code not in (200, 206):
                print(f"  [{desc}] HTTP {resp.status_code}")
                time.sleep(5)
                continue

            total = int(resp.headers.get("content-length", 0))
            if total == 0 and start_byte == 0:
                total = 50_000_000
            elif resp.status_code == 206:
                total += start_byte

            mode = "ab" if start_byte > 0 else "wb"
            downloaded = start_byte
            start_time = time.time()
            last_report = 0

            with open(dest, mode) as f:
                for chunk in resp.iter_content(chunk_size=65536):
                    if chunk:
                        f.write(chunk)
                        downloaded += len(chunk)
                        now = time.time()
                        if now - last_report > 3:
                            elapsed = now - start_time
                            speed = (downloaded - start_byte) / elapsed if elapsed > 0 else 0
                            pct = downloaded / total * 100
                            eta = (total - downloaded) / speed if speed > 0 else 0
                            print(f"\r  [{desc}] {downloaded/1024/1024:.1f}/{total/1024/1024:.1f}MB ({pct:.0f}%) {speed/1024/1024:.2f}MB/s ETA:{eta:.0f}s    ", end="", flush=True)
                            last_report = now

            actual = os.path.getsize(dest)
            print(f"\r  [{desc}] DONE: {actual/1024/1024:.1f}MB                               ")
            return actual > 250000

        except Exception as e:
            saved = dest.stat().st_size if dest.exists() else 0
            print(f"\n  [{desc}] Error at {saved/1024/1024:.1f}MB: {e}, retrying ({attempt+1}/{max_retries})...")
            time.sleep(5)
            continue

    return False

# ============================================================
# REMAINING DOWNLOADS
# ============================================================

# LibGen - remaining
LIBGEN_JOBS = [
    # Meyer-Fong (partial at 9MB / 27MB total)
    ("fc0115e90a21bf3ff6acd8253bfb241d", BASE / "english_scholarship" / "Meyer-Fong_What_Remains_2013.pdf", "Meyer-Fong (27MB)"),
    # Kuhn (partial at 36MB / 57MB total)
    ("d8f71918b56668791c063cd658b21adb", BASE / "english_scholarship" / "Kuhn_Rebellion_and_Its_Enemies_1970.pdf", "Kuhn (57MB)"),
    # Michael Vol2-3 (83MB) - new
    ("611e786cbe9c81da016af76df338a64a", BASE / "english_scholarship" / "Michael_Vol2-3_Documents_1971.pdf", "Michael Vol2-3 (83MB)"),
    # Luo Ergang full (MD5 from search) - new
    ("e115d966cb4e28dd3d741fee81b051d6", BASE / "chinese_scholarship" / "Luo_Ergang_Taiping_Tianguo_Shi_FULL.pdf", "Luo Ergang 全四册"),
]

# IA - remaining
IA_JOBS = [
    ("https://archive.org/download/heroes-return-truth-taiping/heroesreturn.pdf",
     BASE / "primary_texts" / "Ying_Jie_Gui_Zhen_1861.pdf",
     "https://archive.org/details/heroes-return-truth-taiping",
     "Ying Jie Gui Zhen (26MB)"),
    ("https://archive.org/download/evervictoriousar00wils/evervictoriousar00wils.pdf",
     BASE / "contemporary_accounts" / "Wilson_Ever_Victorious_Army_1868.pdf",
     "https://archive.org/details/evervictoriousar00wils",
     "Wilson Ever-Victorious Army (34MB)"),
    ("https://archive.org/download/tipingtienkwohhi01lind/tipingtienkwohhi01lind.pdf",
     BASE / "contemporary_accounts" / "Lindley_Vol1_1866.pdf",
     "https://archive.org/details/tipingtienkwohhi01lind",
     "Lindley Vol1"),
    ("https://archive.org/download/tipingtienkwohhi02lind/tipingtienkwohhi02lind.pdf",
     BASE / "contemporary_accounts" / "Lindley_Vol2_1866.pdf",
     "https://archive.org/details/tipingtienkwohhi02lind",
     "Lindley Vol2"),
]

if __name__ == "__main__":
    # First remove the failed partial downloads so we start fresh
    failed = [
        BASE / "primary_texts" / "Ying_Jie_Gui_Zhen_1861.pdf",
    ]
    for f in failed:
        if f.exists() and f.stat().st_size < 1000:
            f.unlink()
            print(f"Removed empty: {f.name}")

    print("="*60)
    for md5, dest, desc in LIBGEN_JOBS:
        ok = libgen_download_with_retry(md5, dest, desc)
        print(f"  {'✓' if ok else '✗'} {desc}")
        time.sleep(2)

    print(f"\n{'='*60}")
    for url, dest, referer, desc in IA_JOBS:
        ok = ia_download_with_retry(url, dest, referer, desc)
        print(f"  {'✓' if ok else '✗'} {desc}")
        time.sleep(3)

    print(f"\nDone!")
