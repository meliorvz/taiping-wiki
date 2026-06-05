# Source Processing Log

> Editor-only record. Session: 5 June 2026. Records all sources processed in the initial integration session of the Taiping wiki editorial infrastructure.

---

## Session overview

- **Date**: 5 June 2026
- **Purpose**: First integration session: create editorial infrastructure files (new source inventory, source extraction notes, claim map, processing log)
- **Sources inventoried**: SRC-0001 through SRC-0030 (30 sources)
- **Sources with PDFs acquired**: 16 (SRC-0001, 0002, 0003, 0004, 0005, 0006, 0007, 0008, 0009, 0010, 0011, 0012, 0016, 0018, 0019, 0020)
- **Sources with web/text access only**: 4 (SRC-0013 Wikisource, SRC-0014 Wikisource, SRC-0015 Wikisource, SRC-0023 Britannica, SRC-0024 ACS)
- **Sources identified but not fully acquired**: 3 (SRC-0027 Spence, SRC-0028 Jian Youwen, SRC-0029 Kilcourse — Internet Archive borrowable; identified, not downloaded)
- **Sources identified, digitally unavailable**: 1 (SRC-0026, 26-volume Qing archival set)
- **Sources with local gazetteer fragments**: 2 (SRC-0021 Anhui, SRC-0022 Jiangxi — partial fascicles on Internet Archive)
- **Source with portal access only**: 2 (SRC-0025 Qing Veritable Records via FHAC, SRC-0030 FHAC portal)
- **Full OCR/text extraction performed**: 0 (not in scope for this session)
- **Editorial files created**: 4 (new_source_inventory.md, source_extraction_notes.md, claim_map.md, source_processing_log.md)

---

## Processing log by source

### SRC-0001: Michael Vol. I (History, 1966)

- **Consultation method**: Metadata and bibliographic record confirmed via LibGen. PDF file verified as present at `downloads/english_scholarship/Michael_Vol1_History_1966.pdf` (15 MB, 264 pp).
- **Readability**: Not assessed in this session. PDF assumed readable; scan quality of the particular LibGen copy not verified page by page.
- **OCR/text extraction**: Not performed. The PDF exists but automated text extraction was not attempted in this session.
- **Access limitations**: None. File acquired via LibGen on 4 June 2026.
- **Processing notes**: Michael's six-phase periodisation and the translated imperial edict of January 1851 are flagged as high-value extractable content for future extraction sessions. The volume is relatively short (264 pp) compared to Vols. II-III and should be prioritised for reading.

### SRC-0002: Michael Vols. II-III (Documents, 1971)

- **Consultation method**: Metadata and bibliographic record confirmed via LibGen. PDF file verified as present at `downloads/english_scholarship/Michael_Vol2-3_Documents_1971.pdf` (83 MB, 764 pp).
- **Readability**: Not assessed page by page. PDF size (83 MB) suggests moderate-to-good scan resolution. The known content (approximately 400 translated documents) indicates the text is dense.
- **OCR/text extraction**: Not performed. At 83 MB and 764 pages, this is the highest-priority target for full-text extraction.
- **Access limitations**: None. File acquired via LibGen on 4 June 2026.
- **Processing notes**: This is the single most important source for English-language Taiping primary texts. Full translations of the Land System decree, New Treatise on Aids to Administration, Song on the Original Way, Awakening the World with the Original Way, army regulations, and British correspondence are all contained within. Future extraction sessions should target these specific translated documents.

### SRC-0003: Kuhn, Rebellion and Its Enemies (1970)

- **Consultation method**: Metadata and bibliographic record confirmed via LibGen. PDF file verified as present at `downloads/english_scholarship/Kuhn_Rebellion_and_Its_Enemies_1970.pdf` (57 MB, 270 pp).
- **Readability**: Not assessed page by page. The 57 MB size for 270 pages suggests high-resolution scan with good OCR potential.
- **OCR/text extraction**: Not performed.
- **Access limitations**: None. File acquired via LibGen on 4 June 2026.
- **Processing notes**: Kuhn is a tier-1 reliability source. The baojia/tuanlian distinction and the descriptions of Xiang Army recruitment are flagged for extraction. Relatively manageable length at 270 pages; a candidate for early close reading.

### SRC-0004: Reilly, Taiping Heavenly Kingdom (2004)

- **Consultation method**: Metadata and bibliographic record confirmed via LibGen. PDF file verified as present at `downloads/english_scholarship/Reilly_Taiping_Heavenly_Kingdom_2004.pdf` (1 MB, 248 pp).
- **Readability**: The 1 MB size is unusually small for 248 pages, suggesting either a highly compressed scan or a text-based (not scanned) PDF. Should be verified as readable before dependence.
- **OCR/text extraction**: Not performed. If the PDF is text-based (not scanned images), text extraction will be straightforward.
- **Access limitations**: None. File acquired via LibGen on 4 June 2026.
- **Processing notes**: The small file size raises a concern about scan quality. If the file proves to be a low-resolution scan, the printed edition or a higher-quality scan should be sought. The Internet Archive has a borrowable copy as backup.

### SRC-0005: Meyer-Fong, What Remains (2013)

- **Consultation method**: Metadata and bibliographic record confirmed via LibGen. PDF file verified as present at `downloads/english_scholarship/Meyer-Fong_What_Remains_2013.pdf` (27 MB, 335 pp).
- **Readability**: Not assessed page by page. The 27 MB size for 335 pages is consistent with a moderate-to-good quality scan.
- **OCR/text extraction**: Not performed.
- **Access limitations**: None. File acquired via LibGen on 4 June 2026. The download log shows the file completed successfully at 27.0 MB after resuming from a partial download.
- **Processing notes**: Meyer-Fong's descriptions of postwar corpse collection, mass burial, and Jiangnan demographic catastrophe are flagged for extraction. The focus on Jiangnan means other regions are less well covered; this source should be supplemented with gazetteer data for Anhui, Hubei, and Zhejiang.

### SRC-0006: Luo Ergang, Taiping Tianguo Shi (4 vols, 1991)

- **Consultation method**: Metadata confirmed via GitHub/Z-Library. PDF files verified as present at `downloads/chinese_scholarship/Luo_Ergang_Taiping_Tianguo_Shi_Vol1.pdf` through Vol4.pdf (approximately 100 MB total).
- **Readability**: Not assessed page by page. Individual volumes range from approximately 15-35 MB each. The download log shows the full 4-volume consolidated PDF (103.8 MB) was acquired successfully. Chinese character OCR on scanned PDFs will require specialised tools.
- **OCR/text extraction**: Not performed. Chinese-language OCR is a significant task requiring tools like tesseract with Chinese language packs, or commercial OCR services. The 88-juan structure means extraction should be targeted by relevant juan rather than blanket extraction.
- **Access limitations**: None. Files acquired via GitHub/Z-Library on 4 June 2026.
- **Processing notes**: This is the most comprehensive treatment of the Taiping in any language. The biographical sections (especially for minor figures) and institutional history are the highest-value targets. The full text runs to 88 juan across 4 volumes. Prioritise the biographical juan and institutional juan for first-pass extraction.

### SRC-0007: Mao Jiaqi, Taiping Tianguo Tongshi (3 vols, 1991)

- **Consultation method**: Metadata confirmed via Z-Library. PDF files acquired (25 MB, 22 MB, 20 MB for the three volumes). Files not yet verified in the local downloads directory; placeholder status.
- **Readability**: Not assessed. PDF sizes (20-25 MB per volume) suggest standard scan quality.
- **OCR/text extraction**: Not performed.
- **Access limitations**: Files acquired via Z-Library. File presence in the local directory needs verification.
- **Processing notes**: The Nanjing University school perspective complements Luo Ergang's approach. The Jiangsu-Zhejiang theatre coverage is particularly valuable. The treatment of foreign relations follows a PRC anti-imperialist framing that should be noted and contextualised.

### SRC-0008: Liu Chen, Taiping Tianguo Zai Yanjiu (2025)

- **Consultation method**: Metadata confirmed via Internet Archive. PDF file acquired at 528 MB, 882 pp. File not yet verified in local downloads; placeholder status.
- **Readability**: The 528 MB size is extremely large for 882 pages, indicating very high-resolution scans (possibly uncompressed). This may cause performance issues with PDF readers. The file may need to be optimised/compressed before use.
- **OCR/text extraction**: Not performed. The high-resolution scans should yield good OCR results, but the file size will make processing slow. Chinese-language OCR required.
- **Access limitations**: None. File acquired via Internet Archive free download on 4 June 2026.
- **Processing notes**: As a 2025 publication, this is the most current synthesis. Its very recent date means it has not been widely reviewed. The content should be treated as a useful overview of current Chinese scholarship but cross-checked against established works (Luo Ergang, Mao Jiaqi). The large file size (528 MB) may require splitting into smaller chunks for OCR processing.

### SRC-0009: Lindley, Ti-ping Tien-kwoh (2 vols, 1866)

- **Consultation method**: Metadata confirmed via Internet Archive and Project Gutenberg. PDF files verified as present at `downloads/contemporary_accounts/Lindley_Vol1_1866.pdf` (516 pp) and `Lindley_Vol2_1866.pdf` (466 pp). Full plain-text versions also available via Project Gutenberg (ebooks #39180, #39735).
- **Readability**: PDFs assumed readable (Internet Archive scans). The Project Gutenberg plain-text versions are fully searchable and extractable.
- **OCR/text extraction**: Full text extraction is available via the Project Gutenberg plain-text editions. No OCR is needed for those versions. The PDF versions may yield better illustrations and maps.
- **Access limitations**: None. Files acquired via Internet Archive and Project Gutenberg. Multiple formats available (PDF, EPUB, HTML, MOBI, TXT).
- **Processing notes**: Lindley is a tier-4 reliability source due to his pro-Taiping partisanship. His accounts should be used only where corroborated by other sources. However, his first-hand observations of Li Xiucheng, Taiping military organisation, and camp life in Nanjing are unique. The Project Gutenberg plain-text versions should be used for search and extraction; the PDFs for maps and illustrations.

### SRC-0010: Wilson, Ever-Victorious Army (1868)

- **Consultation method**: Metadata confirmed via Internet Archive. PDF file verified as present at `downloads/contemporary_accounts/Wilson_Ever_Victorious_Army_1868.pdf` (444 pp).
- **Readability**: Not assessed page by page. Multiple Internet Archive scans exist; the best quality Toronto copy (705 MB) should be consulted for illustrations and maps, but the smaller copies are adequate for text reading.
- **OCR/text extraction**: Not performed.
- **Access limitations**: None. File acquired via Internet Archive. Multiple format options (PDF, EPUB, DjVu).
- **Processing notes**: Wilson is a tier-3 reliability source. His account is essential for the Ever-Victorious Army and the foreign-led campaigns around Shanghai and Suzhou. His descriptions of the Suzhou Massacre should be cross-checked against Qing sources and Li Xiucheng's confession. The detailed campaign narratives are the most valuable extractable content.

### SRC-0011: Li Xiucheng Confession (Luo Ergang critical edition, 1995)

- **Consultation method**: Metadata confirmed via LibGen. PDF file acquired (17 MB, LibGen ID 3006687). Other Li Xiucheng text versions also available (LibGen ID 8236749, multiple formats).
- **Readability**: Not assessed. The 17 MB size is adequate for a text-focused PDF. Chinese-character OCR will be required.
- **OCR/text extraction**: Not performed. Chinese-language OCR required. The critical apparatus (Luo Ergang's annotations) is integral to the value of this edition and must be preserved in any extraction.
- **Access limitations**: None. File acquired via LibGen. Additional plain-text versions (PDF/EPUB/MOBI/AZW3, approximately 735 KB) are also available and may be easier to extract.
- **Processing notes**: This is the most important single Taiping primary source. The text contains Li Xiucheng's account of the Tianjing Incident, the 1860-1863 campaigns, and the fall of Nanjing. Luo Ergang's annotations identify Zeng Guofan's edits and cross-reference other sources. The plain-text versions (LibGen ID 8236749) may be easier to extract but lack the critical apparatus.

### SRC-0012: Ying Jie Gui Zhen (1861)

- **Consultation method**: Metadata confirmed via Library of Congress digital record and Internet Archive. PDF facsimile acquired (26.4 MB). File verified as present at `downloads/primary_texts/Ying_Jie_Gui_Zhen_1861.pdf`.
- **Readability**: Not assessed. The facsimile is a scan of the original 1861 woodblock print. Classical Chinese text in woodblock font may present OCR challenges. The LOC digital record is accessible for catalogue verification.
- **OCR/text extraction**: Not performed. Classical Chinese woodblock OCR is particularly challenging due to variant character forms, vertical layout, and decorative elements.
- **Access limitations**: None. Facsimile PDF acquired via Internet Archive on 4 June 2026. The download log shows slow but successful acquisition (25.2 MB at very low speed).
- **Processing notes**: The dialogue format and Taiping propaganda content make this a unique window into Taiping self-representation. Transcription (manual or assisted) may be more reliable than automated OCR for this source. Portions of the text may have been translated in secondary literature; check Michael Vols. II-III for English translations of key passages.

### SRC-0013: Tianchao Tianmu Zhidu (Land System, 1853)

- **Consultation method**: Text accessed via Chinese Wikisource. Full English translation available in Michael Vols. II-III (SRC-0002).
- **Readability**: Wikisource text is in modern Unicode Chinese characters; fully readable and searchable. The Michael translation provides a standard English version.
- **OCR/text extraction**: Not required. The Wikisource text is already in digital form. The Michael translation is in a PDF that requires extraction.
- **Access limitations**: None. Wikisource is freely accessible. The Michael translation is available in the acquired PDF.
- **Processing notes**: The Land System is one of the most cited and debated Taiping documents. Key debates concern: (a) whether it was ever intended for implementation or was a utopian statement; (b) whether Yang Xiuqing or Hong Xiuquan was the primary author; (c) the extent to which it was actually implemented in Taiping-controlled areas. These questions should be flagged for dispute pages.

### SRC-0014: Zizheng Xinpian (New Treatise, 1859)

- **Consultation method**: Text accessed via Chinese Wikisource (zh-hans). Full English translation available in Michael Vols. II-III (SRC-0002).
- **Readability**: Wikisource text is fully readable. The Hong Xiuquan marginal annotations are preserved in some versions (check which Wikisource version includes them).
- **OCR/text extraction**: Not required. Wikisource text is digital. The Michael translation requires PDF extraction.
- **Access limitations**: None.
- **Processing notes**: Hong Rengan's reform proposals are frequently cited as evidence of Taiping modernisation potential. Key question for wiki articles: what was actually implemented? The answer is "almost nothing," which needs careful contextualisation to avoid creating a misleading impression of Taiping reform capacity. Hong Xiuquan's annotations ("This is correct" / 是也) should be included where available.

### SRC-0015: Yuandao Jiushi Ge (Song on the Original Way, 1845)

- **Consultation method**: Text accessed via Chinese Wikisource. English translation available in Michael Vols. II-III (SRC-0002).
- **Readability**: Wikisource text is fully readable. The text is in verse form (song/ge 歌), which complicates translation.
- **OCR/text extraction**: Not required.
- **Access limitations**: None.
- **Processing notes**: This is one of the key texts for understanding early Taiping theology. Hong Xiuquan's six denunciations (opium, alcohol, gambling, prostitution, divination, geomancy) are frequently cited. Note that some of these prohibitions were later violated by the leadership (particularly polygamy and concubinage), creating tension between the text's moral program and Taiping practice.

### SRC-0016: British Parliamentary Papers, Vol. 32

- **Consultation method**: Metadata confirmed via Internet Archive. PDF file acquired (approximately 1.6 GB, 600 pp). ACS encryption on the Internet Archive copy noted.
- **Readability**: Not assessed page by page. ACS encryption may prevent programmatic access to the file contents. Manual reading of the PDF may be possible depending on the encryption type.
- **OCR/text extraction**: Not performed. ACS encryption is a significant barrier. If the encryption cannot be bypassed, alternative access options should be explored: (a) check if the same documents are available through the UK Parliamentary Papers database (institutional access required); (b) check if HathiTrust has a non-encrypted copy; (c) download the EPUB version from Internet Archive if available.
- **Access limitations**: ACS encryption on the primary Internet Archive copy. Alternative formats (EPUB) may be available. Institutional access to commercial databases may provide alternative paths.
- **Processing notes**: The ACS encryption is a significant obstacle. Priority for resolution: check for EPUB version on Internet Archive; check HathiTrust catalogue; explore institutional access options. The content is uniquely valuable for understanding British policy formation and the sequence of decisions regarding intervention.

### SRC-0017: North-China Herald (1850-1864)

- **Consultation method**: Internet Archive collection page and individual issues accessed. Approximately 22 issues (1850), 49 (1851), 52 (1852), 17+ (1859), 53 (1864) identified. Individual issue format varies (PDF, DjVu, JP2, OCR text).
- **Readability**: Variable. Some issues have OCR text available; others are image-only. OCR quality varies significantly across issues. 19th-century newspaper typography and layout present OCR challenges.
- **OCR/text extraction**: Partial OCR text exists for some issues on Internet Archive. Not all issues have OCR. The DjVu format may contain hidden text layers.
- **Access limitations**: Individual issue download may be slow. The collection is large (approximately 3,900 issues total across all years). Targeted selection of relevant issues (1853-1864, especially 1853, 1860, 1862, 1864) is recommended.
- **Processing notes**: This is the best English-language near-real-time source for the rebellion as seen from Shanghai. Priority issues: 1853 (first Taiping approach to Shanghai), 1860-1862 (intense period of Taiping advances and foreign military response), 1864 (fall of Nanjing). The OCR text, where available, should be used for keyword searching; issues without OCR will need to be manually reviewed.

### SRC-0018: Taiping Tianguo Shiliao (1955, Jin Yufu ed.)

- **Consultation method**: Metadata confirmed via LibGen. PDF file acquired (15 MB, LibGen ID 7819127).
- **Readability**: Not assessed. Chinese-language scanned PDF.
- **OCR/text extraction**: Not performed. Chinese-language OCR required.
- **Access limitations**: None. File acquired via LibGen.
- **Processing notes**: This 1955 collection is an important early documentary collection but has been partly superseded by the 2013 CASS edition (SRC-0019). Where the two collections overlap, prefer the 2013 edition for transcriptions. The 1955 edition remains valuable for documents not republished in later collections.

### SRC-0019: Taiping Tianguo Ziliao (2013, CASS ed.)

- **Consultation method**: Metadata confirmed via LibGen. PDF file acquired (68 MB, LibGen ID 7358433).
- **Readability**: Not assessed. The 68 MB size suggests good scan quality.
- **OCR/text extraction**: Not performed. Chinese-language OCR required.
- **Access limitations**: None. File acquired via LibGen.
- **Processing notes**: This is the most recent and comprehensive PRC documentary collection. It should be the default reference for Chinese-language documentary evidence. The 1959 Taiping Tianguo Ziliao (LibGen ID 7808582, 14 MB) is a related but separate collection and should be checked for unique content.

### SRC-0020: Luo Ergang Quanji (22 vols)

- **Consultation method**: Metadata confirmed via LibGen. RAR archive acquired (840 MB, LibGen ID 2729793).
- **Readability**: Not assessed. The contents have not been extracted from the RAR archive. 22 volumes in PDF format are expected inside.
- **OCR/text extraction**: Not performed. Extraction from the RAR archive is a prerequisite. The contents are likely to contain substantial duplication with the separately acquired 太平天国史 (SRC-0006).
- **Access limitations**: None for the archive itself. RAR extraction requires appropriate software (unrar on macOS, or 7-Zip). The 840 MB size may require significant disk space after extraction.
- **Processing notes**: The relationship between the Complete Works and the separately acquired 太平天国史 (1991) needs to be clarified. The Complete Works likely includes: (a) the 1991 太平天国史, (b) Luo Ergang's earlier works (1940s-1980s), (c) critical editions not published separately, (d) collected essays and historiographical writings. An inventory of the 22 volumes should be the first step before further processing.

### SRC-0021: Guangxu Anhui Gazetteer

- **Consultation method**: Internet Archive catalogue accessed. Fascicles identified in the range 02085213-02085359 (1200+ fascicles). No systematic download performed.
- **Readability**: Not assessed. Woodblock-print scanned fascicles on Internet Archive; classical Chinese. OCR will be extremely challenging.
- **OCR/text extraction**: Not performed. Classical Chinese woodblock OCR is a specialist task. Manual transcription of targeted sections may be more practical.
- **Access limitations**: Individual fascicle download is possible but tedious (1200+ files). No consolidated PDF. Fascicle organisation and numbering need systematic mapping before targeted download.
- **Processing notes**: Priority sections for extraction: military affairs (兵事) for campaign details; biographies (忠义/人物) for local elites and martyrs; population and land tax records (食货志) for demographic and economic data. The Taiping are referred to with standard Qing pejorative terms; fact extraction requires filtering this bias.

### SRC-0022: Guangxu Jiangxi Gazetteer

- **Consultation method**: Internet Archive catalogue accessed. Sample fascicle confirmed (02085378.cn for 卷十七). Approximately 90 fascicles available. No systematic download performed.
- **Readability**: Not assessed. Same woodblock challenges as the Anhui gazetteer.
- **OCR/text extraction**: Not performed.
- **Access limitations**: Partial coverage (approximately 90 fascicles). The full set may have more fascicles accessible through related IA identifiers.
- **Processing notes**: Priority sections: military affairs for Jiujiang, Nanchang, and the Xiang Army deployments; biographies for local officials and literati; economic sections for tea and porcelain trade impacts. The relationship between this provincial gazetteer and county-level gazetteers (which may contain more detailed local data) should be established.

### SRC-0023: Encyclopaedia Britannica entries

- **Consultation method**: Web pages accessed and read on 4 June 2026. Two pages consulted: "Taiping Rebellion" (https://www.britannica.com/event/Taiping-Rebellion) and "Hong Xiuquan" (https://www.britannica.com/biography/Hong-Xiuquan, last updated 28 May 2026).
- **Readability**: Fully readable. Modern English text with standardised Chinese romanisation.
- **OCR/text extraction**: Not required. Web text is digital.
- **Access limitations**: None (freely accessible online). Some content may be behind a paywall on sustained use.
- **Processing notes**: Britannica entries are tertiary sources. Use for quick date/name verification and as a check against scholarly consensus. Do not cite as an authoritative source in reader-facing prose. The entry on Hong Xiuquan was updated on 28 May 2026, making it more current than many academic publications.

### SRC-0024: Academy of Chinese Studies (ACS) Hong Kong reference

- **Consultation method**: Web page accessed and read on 4 June 2026. "The Jintian Uprising and Founding of the Heavenly Kingdom of Great Peace" (https://chiculture.org.hk/en/photo-story/1186).
- **Readability**: Fully readable. A short photo-story format with English text. Chinese version also available.
- **OCR/text extraction**: Not required.
- **Access limitations**: None (freely accessible).
- **Processing notes**: Use only for quick orientation or as an example of Hong Kong educational presentation. Not suitable for scholarly citation. The Jintian Uprising date (11 January 1851) and the list of founding leaders match standard accounts.

### SRC-0025: Qing Veritable Records (Qing Shilu)

- **Consultation method**: FHAC portal accessed on 4 June 2026. Specific reign sections (Daoguang, Xianfeng, Tongzhi) identified but not yet systematically searched.
- **Readability**: Not assessed. The FHAC portal provides a search interface; digitised text quality and completeness vary.
- **OCR/text extraction**: Not applicable. FHAC portal provides native digital text where available.
- **Access limitations**: FHAC portal accessibility for foreign users is uncertain. Some holdings may require Chinese institutional credentials. Search interface in Chinese.
- **Processing notes**: Target searches: (a) Jintian Uprising edicts, (b) Nanjing proclamation response, (c) edicts authorising Zeng Guofan, (d) fall of Nanjing records, (e) postwar reconstruction orders. The records span the Daoguang (1820-1850), Xianfeng (1850-1861), and Tongzhi (1861-1875) reigns. The Daoguang reign covers the pre-rebellion period and early response; the Xianfeng reign covers the main war; the Tongzhi reign covers the late war, fall of Nanjing, and postwar settlement.

### SRC-0026: Qing Government Archival Materials on the Taiping Suppression (26 vols)

- **Consultation method**: Reference entry accessed on 4 June 2026 at https://www.zgbk.com/ecph/words?ID=38095. Not digitally available on LibGen, IA, or Anna's Archive.
- **Readability**: Not applicable. Source not acquired.
- **OCR/text extraction**: Not applicable.
- **Access limitations**: Highest-priority acquisition target. Not available through any major open digital repository. Possible access routes: (a) institutional library holdings, (b) CNKI/读秀 subscription, (c) Baidu Wangpan sharing, (d) interlibrary loan of physical volumes.
- **Processing notes**: This is the single most important gap in the current source inventory. The 26 volumes contain the most comprehensive published collection of Qing archival documents on the Taiping suppression. Without this source, the Qing perspective relies on secondary compilations and the Veritable Records, which are less granular. Continue to search for digital access. If unavailable, consider selective institutional access for targeted document retrieval.

### SRC-0027: Spence, God's Chinese Son (1996)

- **Consultation method**: Internet Archive listing confirmed at https://archive.org/details/godschinesesonta0000spen. Borrowable; requires IA account. Not downloaded or read in this session.
- **Readability**: Not assessed. Academic publication from W. W. Norton; expected to be high quality.
- **OCR/text extraction**: Not applicable unless the book is digitised. IA borrowable status means the book is under copyright and cannot be freely downloaded.
- **Access limitations**: Internet Archive borrowable (requires IA account, borrowing period, DRM). Possible alternative access through library holdings. A LibGen copy may exist but was not searched for in this session.
- **Processing notes**: Spence is the most widely read English-language biography of Hong Xiuquan. Priority for acquisition: search LibGen for a non-DRM copy; check institutional library e-book access. If only IA borrowable is available, plan a focused reading session during a borrowing period to extract key passages.

### SRC-0028: Jian Youwen, Taiping Revolutionary Movement (1973)

- **Consultation method**: Internet Archive listing confirmed at https://archive.org/details/taipingrevolutio0000jian. Borrowable. Not downloaded or read in this session.
- **Readability**: Not assessed.
- **OCR/text extraction**: Not applicable.
- **Access limitations**: Internet Archive borrowable. May also be available through academic libraries. Check LibGen for non-DRM copy.
- **Processing notes**: Jian Youwen's English-language survey was the standard reference for decades. While now dated (1973), his campaign narratives and biographical sketches remain useful where newer scholarship has not superseded them.

### SRC-0029: Kilcourse, Taiping Theology (2016)

- **Consultation method**: Internet Archive listing confirmed at https://archive.org/details/taipingtheologyl0000kilc. Borrowable. Not downloaded or read in this session.
- **Readability**: Not assessed.
- **OCR/text extraction**: Not applicable.
- **Access limitations**: Internet Archive borrowable. Check LibGen for non-DRM copy.
- **Processing notes**: Kilcourse's theological analysis is the most thorough English-language treatment of Taiping religious beliefs. Priority for acquisition: the analysis of the Taiping Ten Commandments, baptism practices, and Sabbath observance is likely to be valuable for the religion-related wiki pages.

### SRC-0030: FHAC Qing Archival Portal

- **Consultation method**: FHAC portal accessed on 4 June 2026 at https://fhac.com.cn/index.html. Portal interface consulted; catalogue search attempted but no systematic document retrieval performed.
- **Readability**: Portal is in Chinese; partial English interface available. Search functionality requires Chinese-language search terms and knowledge of Qing bureaucratic categories.
- **OCR/text extraction**: Not applicable. Portal provides access to digital documents where available.
- **Access limitations**: Primary limitation is institutional access requirements for document retrieval. The portal itself is accessible. English-language interface is limited. Registration or institutional affiliation may be required for full-text access.
- **Processing notes**: The FHAC portal is the gateway to the world's largest Qing archival collection. Even without full document access, the catalogue can be used to identify relevant record groups. Search terms to use: 太平天国, 洪秀全, 曾国藩, 湘军, 常胜军, 天京. The portal's document delivery system for international users needs investigation.

---

## Additional sources referenced (not in SRC-0001 to SRC-0030)

These sources are listed in the source_database.json and bibliography.md but were not assigned formal SRC numbers in this session:

| Source key | Title | Status |
|-----------|-------|--------|
| britannica-taiping | Britannica: Taiping Rebellion | Incorporated into SRC-0023 |
| britannica-hong | Britannica: Hong Xiuquan | Incorporated into SRC-0023 |
| acs-jintian | ACS: Jintian Uprising | Assigned SRC-0024 |
| fhac | FHAC portal | Assigned SRC-0030 |
| taiping-ziliao-1959 | 太平天国资料 (1959, 科学出版社) | Noted under SRC-0019 |
| shen-yunlong-taiping-shiliao | 沈云龙, 近代中国史料丛刊 | Not assigned SRC; bibliographic reference only |
| gazetteers-fujian | 福建通志 | Not assigned SRC; noted for future gazetteer expansion |
| gazetteers-missing | Multiple provincial gazetteers | Not assigned SRC; acquisition targets |
| british-parliamentary-china | BPP China (42 vols) | Noted under SRC-0016 |
| british-military-china | BPP Military Affairs in China | Not assigned SRC; supplementary to SRC-0016 |
| not-found (various) | Multiple unfound sources | Acquisition log, not processing log |

---

## Action items (from this session)

1. **HIGH PRIORITY**: Attempt text extraction from Michael Vols. II-III (SRC-0002) — the 400 translated documents are the most immediately usable content.
2. **HIGH PRIORITY**: Verify readability of Reilly PDF (SRC-0004) — the 1 MB size is suspiciously small.
3. **HIGH PRIORITY**: Attempt to bypass or work around ACS encryption on BPP Vol. 32 (SRC-0016) — check for EPUB version.
4. **HIGH PRIORITY**: Continue search for SRC-0026 (26-volume Qing archives) through all available channels.
5. **MEDIUM PRIORITY**: Extract Luo Ergang Quanji (SRC-0020) from RAR archive and inventory the 22 volumes.
6. **MEDIUM PRIORITY**: Download Spence (SRC-0027), Jian Youwen (SRC-0028), and Kilcourse (SRC-0029) from Internet Archive or alternative sources.
7. **MEDIUM PRIORITY**: Perform targeted FHAC portal searches for key Qing edicts (SRC-0025, SRC-0030).
8. **LOW PRIORITY**: Map the gazetteers' fascicle structure for Anhui (SRC-0021) and Jiangxi (SRC-0022) to identify target fascicles.
9. **LOW PRIORITY**: Process North-China Herald OCR text (SRC-0017) for keyword extraction across available issues.
10. **LOW PRIORITY**: Process Chinese Wikisource texts (SRC-0013, 0014, 0015) into a structured extraction format with English translations aligned.

---

## Known constraints

- **Chinese OCR**: Automated OCR of Chinese-language scanned PDFs (especially classical Chinese in woodblock print) is a significant technical challenge. Manual transcription may be necessary for key passages from SRC-0012 (Ying Jie Gui Zhen) and the gazetteers (SRC-0021, SRC-0022).
- **File sizes**: The Liu Chen PDF (SRC-0008, 528 MB), the Luo Ergang Quanji RAR (SRC-0020, 840 MB), and the BPP Vol. 32 PDF (SRC-0016, 1.6 GB) present storage and processing challenges.
- **Language barrier**: Chinese-language sources (SRC-0006, 0007, 0008, 0011, 0012, 0013, 0014, 0015, 0018, 0019, 0020, 0021, 0022, 0025, 0026) require either Chinese reading proficiency or systematic translation workflows. English translations exist partially for some (Michael SRC-0002 covers key documents; Spence SRC-0027 translates Hong Xiuquan's poetry). Most Chinese scholarly works have no English translation.
- **DRM and access restrictions**: Internet Archive borrowable books (SRC-0027, 0028, 0029) have access restrictions. BPP Vol. 32 (SRC-0016) has ACS encryption. FHAC portal documents (SRC-0030) may have institutional access requirements.
- **Gazetteer fragmentation**: The provincial gazetteers (SRC-0021, SRC-0022) are available only as individual fascicles on Internet Archive. Systematic download and organisation of hundreds of files is a significant logistical task.

---

## Next session agenda

The next processing session should focus on:
1. Text extraction from high-priority English-language PDFs (Michael, Kuhn, Meyer-Fong)
2. Resolution of access issues (BPP encryption, IA borrowable books, FHAC portal)
3. Chinese Wikisource texts — structured extraction with aligned English translations
4. Inventory of the Luo Ergang Quanji contents
