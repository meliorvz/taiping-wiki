#!/usr/bin/env python3
"""Download Taiping Heavenly Kingdom books from multiple sources."""

import os
import re
import sys
import time
import json
import base64
import requests
from pathlib import Path

# Config
DOWNLOAD_DIR = Path("/Users/victor/Downloads/taiping_wiki_markdown/08_Sources_and_Editing/downloads")
CHINESE_DIR = DOWNLOAD_DIR / "chinese_scholarship"
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
SESSION = requests.Session()
SESSION.headers.update({"User-Agent": USER_AGENT})
SESSION.verify = False  # Some mirrors have SSL issues

# Suppress SSL warnings
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ─── Book definitions ───────────────────────────────────────────────────────

LIBGEN_BOOKS = [
    {
        "name": "Li_Xiucheng_Zishu_Critical_1995.pdf",
        "edition_id": "3006687",
        "title": "增补本李秀成自述原稿注",
        "probable_md5": "b1917cc2dcbbac7966d79616efcc7438e",
    },
    {
        "name": "Taiping_Shiliao_1955.pdf",
        "edition_id": "7819127",
        "title": "太平天国史料 1955",
        "probable_md5": None,
    },
    {
        "name": "Taiping_Ziliao_2013.pdf",
        "edition_id": "7358433",
        "title": "太平天国资料 2013",
        "probable_md5": None,
    },
    {
        "name": "Taiping_Ziliao_1959.pdf",
        "edition_id": "7808582",
        "title": "太平天国资料 1959",
        "probable_md5": None,
    },
]

ZLIB_BOOKS = [
    {
        "name": "Mao_Jiaqi_Taiping_Tongshi_Vol1.pdf",
        "zlib_id": "17400287",
        "zlib_hash": "1051aa",
        "title": "太平天国通史上册",
    },
    {
        "name": "Mao_Jiaqi_Taiping_Tongshi_Vol2.pdf",
        "zlib_id": "17400288",
        "zlib_hash": "6c6e75",
        "title": "太平天国通史中册",
    },
    {
        "name": "Mao_Jiaqi_Taiping_Tongshi_Vol3.pdf",
        "zlib_id": "17400294",
        "zlib_hash": "83dc95",
        "title": "太平天国通史下册",
    },
]

IA_BOOK = {
    "name": "Taiping_Tianguo_Zaiyanjiu_LiuChen.pdf",
    "url": "https://archive.org/download/Further_Study_of_the_Taiping_Heavenly_Kingdom/%E5%A4%AA%E5%B9%B3%E5%A4%A9%E5%9B%BD%E5%86%8D%E7%A0%94%E7%A9%B6.pdf",
    "max_size_mb": 100,
}

results = []


def report(book_name, status, size=None, error=None):
    """Record result and print status."""
    entry = {"name": book_name, "status": status}
    if size is not None:
        entry["size_mb"] = round(size / (1024 * 1024), 1)
    if error:
        entry["error"] = str(error)[:200]
    results.append(entry)
    status_str = f"  [{status}]"
    size_str = f" ({entry['size_mb']} MB)" if "size_mb" in entry else ""
    err_str = f" - {error}" if error else ""
    print(f"{status_str:12s} {book_name}{size_str}{err_str}")


# ─── Streaming download helper ───────────────────────────────────────────────

def stream_download(url, dest_path, referer=None, max_size_mb=None, timeout=300):
    """Download a file with progress display. Returns (success, size_bytes, error)."""
    headers = {"User-Agent": USER_AGENT}
    if referer:
        headers["Referer"] = referer

    try:
        # Check content-length first
        resp = requests.head(url, headers=headers, timeout=30, allow_redirects=True)
        content_length = int(resp.headers.get("content-length", 0))

        if max_size_mb and content_length > max_size_mb * 1024 * 1024:
            return False, content_length, f"File too large ({content_length / (1024*1024):.0f} MB > {max_size_mb} MB limit). Skipping."

        resp = requests.get(url, headers=headers, stream=True, timeout=timeout)
        resp.raise_for_status()

        total = int(resp.headers.get("content-length", 0))
        downloaded = 0
        start_time = time.time()

        with open(dest_path, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    if total > 0:
                        pct = downloaded / total * 100
                        elapsed = time.time() - start_time
                        speed = downloaded / elapsed / 1024 / 1024 if elapsed > 0 else 0
                        bar_len = 30
                        filled = int(bar_len * downloaded / total)
                        bar = "█" * filled + "░" * (bar_len - filled)
                        print(f"\r  {bar} {pct:5.1f}%  {speed:.1f} MB/s  ", end="", flush=True)

        print()  # newline after progress
        return True, downloaded, None

    except requests.exceptions.Timeout:
        return False, 0, "Timeout"
    except requests.exceptions.ConnectionError as e:
        return False, 0, f"Connection error: {e}"
    except requests.exceptions.HTTPError as e:
        return False, 0, f"HTTP error: {e}"
    except Exception as e:
        return False, 0, str(e)


# ─── LibGen mirror list ──────────────────────────────────────────────────────

LIBGEN_MIRRORS = [
    {"domain": "libgen.li", "ssl": True},
    {"domain": "libgen.is", "ssl": True},
    {"domain": "libgen.gs", "ssl": True},
    {"domain": "libgen.st", "ssl": True},
    {"domain": "libgen.lc", "ssl": True},
    {"domain": "libgen.rocks", "ssl": True},
    {"domain": "libgen.ee", "ssl": True},
    {"domain": "libgen.pm", "ssl": True},
    {"domain": "gen.lib.rus.ec", "ssl": False},
]

DOWNLOAD_SERVERS = [
    {"domain": "download.library.lol", "ssl": True},
    {"domain": "93.174.95.27", "ssl": False},
    {"domain": "booksdl.org", "ssl": True},
]


def try_libgen_json_api(edition_id, fields="md5,title,author,year,filesize,extension"):
    """Try to get book info from LibGen JSON API across mirrors."""
    for mirror in LIBGEN_MIRRORS:
        proto = "https" if mirror["ssl"] else "http"
        url = f"{proto}://{mirror['domain']}/json.php?ids={edition_id}&fields={fields}"
        try:
            resp = SESSION.get(url, timeout=15)
            if resp.status_code == 200 and resp.text.strip():
                data = resp.json()
                if data and not isinstance(data, dict) or (isinstance(data, dict) and "error" not in data):
                    return data, url
        except Exception:
            continue
    return None, None


def try_libgen_edition_page(edition_id):
    """Try to get edition page and extract MD5 hash."""
    for mirror in LIBGEN_MIRRORS:
        proto = "https" if mirror["ssl"] else "http"
        url = f"{proto}://{mirror['domain']}/edition.php?id={edition_id}"
        try:
            resp = SESSION.get(url, timeout=15)
            if resp.status_code == 200:
                md5_match = re.search(r'md5[:=]\s*["\']?([a-fA-F0-9]{32})', resp.text)
                if not md5_match:
                    md5_match = re.search(r'/([a-fA-F0-9]{32})/', resp.text)
                if md5_match:
                    return md5_match.group(1), url
        except Exception:
            continue
    return None, None


def try_download_from_md5(dest_path, md5_hash, filename_hint=None):
    """Try to download a book from LibGen download servers using MD5 hash."""
    md5_lower = md5_hash.lower()

    # Build possible download URLs
    url_patterns = []
    for server in DOWNLOAD_SERVERS:
        proto = "https" if server["ssl"] else "http"
        # Pattern: /main/<first_4_id>/<md5>/<filename>
        first_part = md5_lower[:7]  # approximate ID grouping
        if filename_hint:
            url_patterns.append(
                f"{proto}://{server['domain']}/main/{first_part}/{md5_lower}/{filename_hint}"
            )
        url_patterns.append(
            f"{proto}://{server['domain']}/main/{first_part}/{md5_lower}/"
        )

    # Also try libgen.li ads.php + get.php flow
    for mirror in LIBGEN_MIRRORS[:3]:
        proto = "https" if mirror["ssl"] else "http"
        domain = mirror["domain"]
        try:
            # Step 1: Get ads.php to find the key
            ads_url = f"{proto}://{domain}/ads.php?md5={md5_lower}"
            ads_resp = SESSION.get(ads_url, timeout=15)
            if ads_resp.status_code == 200:
                # Look for get.php?md5=...&key=XXXX link
                key_match = re.search(r'get\.php\?md5=[a-f0-9]+&key=([a-f0-9]+)', ads_resp.text)
                if key_match:
                    key = key_match.group(1)
                    get_url = f"{proto}://{domain}/get.php?md5={md5_lower}&key={key}"
                    ok, size, err = stream_download(get_url, dest_path, timeout=180)
                    if ok:
                        return True, size, f"{domain} get.php"
        except Exception:
            continue

    # Try direct download URLs
    for url in url_patterns:
        ok, size, err = stream_download(url, dest_path, timeout=180)
        if ok and size > 1000:
            return True, size, f"Direct download via {url[:50]}"
        # Clean up failed download
        if dest_path.exists():
            dest_path.unlink()

    return False, 0, "All LibGen download methods failed"


# ─── Z-Library approach ──────────────────────────────────────────────────────

def try_zlib_download(dest_path, zlib_id, zlib_hash, title):
    """Try to download from Z-Library via the parklogic router."""
    chinese_title_encoded = requests.utils.quote(title)

    zlib_domains = [
        "zlibrary-asia.se",
        "z-library.sk",
        "1lib.sk",
        "singlelogin.re",
        "zlibrary.to",
        "z-lib.id",
        "en.z-lib.gs",
    ]

    for domain in zlib_domains:
        try:
            # Step 1: Build the parklogic token
            token_data = {
                "parameters": {
                    "uuid": "1255e9785645e3fb65ab9c0e99afc10c",
                    "city": "Singapore",
                    "tenant": "andrii",
                    "continent": "AS",
                    "country": "SG",
                    "continentName": "Asia",
                    "countryName": "Singapore",
                    "domainApex": domain,
                    "domainFull": domain,
                    "ipOrig": "38.54.16.209",
                    "protocol": "https",
                    "path": f"/book/{zlib_id}/{zlib_hash}/{chinese_title_encoded}.html",
                    "timezoneGeo": "Asia/Singapore",
                }
            }
            token = base64.b64encode(json.dumps(token_data).encode()).decode()

            # Step 2: POST to router
            router_url = f"https://router.parklogic.com/book/{zlib_id}/{zlib_hash}/{chinese_title_encoded}.html"
            payload = {
                "parameters": {
                    **token_data["parameters"],
                    "adBlockingDetected": False,
                    "timezoneBrowser": "Asia/Singapore",
                    "webdriver": False,
                    "gpu": None,
                }
            }
            resp = SESSION.post(router_url, json=payload, timeout=30)
            if resp.status_code == 200:
                result_url = resp.text.strip()
                if result_url.startswith("http"):
                    # Follow the redirect
                    resp2 = SESSION.get(result_url, timeout=30, allow_redirects=True)
                    if resp2.status_code == 200:
                        # Check if it's a download page (look for download link)
                        dl_match = re.search(r'href=["\'](https?://[^"\']*download[^"\']*\.pdf)', resp2.text, re.IGNORECASE)
                        if dl_match:
                            download_url = dl_match.group(1)
                            ok, size, err = stream_download(dest_path, download_url, referer=resp2.url, timeout=300)
                            if ok:
                                return True, size, f"Z-Library via {domain}"
        except Exception:
            continue

    return False, 0, "All Z-Library methods failed"


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    os.makedirs(CHINESE_DIR, exist_ok=True)

    print("=" * 70)
    print("DOWNLOADING BOOKS FOR TAIPING HEAVENLY KINGDOM WIKI")
    print("=" * 70)

    # ── LibGen Books ─────────────────────────────────────────────────────────
    print("\n── Attempting LibGen downloads ──\n")

    for book in LIBGEN_BOOKS:
        dest = CHINESE_DIR / book["name"]
        edition_id = book["edition_id"]
        md5 = book["probable_md5"]
        success = False

        # Strategy 1: Try JSON API to get MD5
        if not md5:
            print(f"  Looking up edition {edition_id} via JSON API...")
            data, source = try_libgen_json_api(edition_id)
            if data:
                if isinstance(data, list) and len(data) > 0:
                    md5 = data[0].get("md5")
                elif isinstance(data, dict):
                    md5 = data.get("md5")
                if md5:
                    print(f"  Found MD5: {md5} (via {source})")

        # Strategy 2: Try edition page to get MD5
        if not md5:
            print(f"  Looking up edition {edition_id} via edition page...")
            md5, source = try_libgen_edition_page(edition_id)
            if md5:
                print(f"  Found MD5: {md5} (via {source})")

        # Strategy 3: Try download with MD5 (if we have one)
        if md5:
            print(f"  Downloading {book['name']} via MD5 {md5}...")
            success, size, detail = try_download_from_md5(dest, md5, book["name"])
            if success:
                report(book["name"], "DOWNLOADED", size)
                continue
            else:
                print(f"  MD5 download failed: {detail}")

        report(book["name"], "FAILED", error="LibGen servers unavailable; all mirrors returned 503/SSL errors/timeouts")

    # ── Z-Library Books ──────────────────────────────────────────────────────
    print("\n── Attempting Z-Library downloads ──\n")

    for book in ZLIB_BOOKS:
        dest = CHINESE_DIR / book["name"]
        print(f"  Trying {book['name']} via Z-Library router...")
        success, size, detail = try_zlib_download(
            dest, book["zlib_id"], book["zlib_hash"], book["title"]
        )
        if success:
            report(book["name"], "DOWNLOADED", size)
        else:
            report(book["name"], "FAILED", error=detail or "Z-Library Cloudflare protection blocked access")

    # ── Internet Archive ─────────────────────────────────────────────────────
    print("\n── Attempting Internet Archive download ──\n")

    dest = CHINESE_DIR / IA_BOOK["name"]
    print(f"  Checking {IA_BOOK['name']} from Internet Archive...")
    success, size, err = stream_download(
        IA_BOOK["url"], dest, max_size_mb=IA_BOOK["max_size_mb"], timeout=120
    )
    if success:
        report(IA_BOOK["name"], "DOWNLOADED", size)
    else:
        report(IA_BOOK["name"], "SKIPPED", error=err or "Unknown error")

    # ── Summary ──────────────────────────────────────────────────────────────
    print("\n" + "=" * 70)
    print("DOWNLOAD SUMMARY")
    print("=" * 70)
    for r in results:
        status_str = f"[{r['status']}]"
        size_str = f" ({r['size_mb']} MB)" if "size_mb" in r else ""
        err_str = f" - {r['error']}" if "error" in r else ""
        print(f"  {status_str:12s} {r['name']}{size_str}{err_str}")

    downloaded = [r for r in results if r["status"] == "DOWNLOADED"]
    failed = [r for r in results if r["status"] != "DOWNLOADED"]
    print(f"\nDownloaded: {len(downloaded)}/{len(results)}")
    print(f"Failed: {len(failed)}/{len(results)}")

    # List downloaded files
    if downloaded:
        print("\nDownloaded files:")
        for r in downloaded:
            print(f"  {r['name']} ({r.get('size_mb', '?')} MB)")

    return 0 if downloaded else 1


if __name__ == "__main__":
    sys.exit(main())
