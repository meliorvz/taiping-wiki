[Chinese translation — 中文翻译]

# 太平天国运动 / Taiping Rebellion Wiki

本目录是一个面向读者的 Markdown 维基，主题为太平天国运动与太平天国。其结构编排旨在让读者先以故事形式理解这场战争，再深入探索史料、论争、人物、制度及后世记忆。

**当前状态**：96个 Markdown 文件（约183,000字），分布于11个目录中。史料整合工作正在进行。2026年6月5日，首轮史料整合共清点了30种史料、映射了33项史实主张、翻译了9段原始文献，并搭建了编辑基础设施。同日进行的第二轮扩展工作创建了9个新页面，深化了15个已有页面。系统化的引文升级是下一阶段的工作。

从这里开始：

1. [维基首页](index.md)
2. [阅读路径](00_Start_Here/reading_path.md)
3. [主条目：太平天国运动 / Taiping Rebellion](01_Main_Story/taiping_rebellion.md)
4. [详细年表](07_Reference/chronology.md)
5. [术语表](07_Reference/glossary.md)

主条目使用脚注，不使用随文史料引用。史料状态、有争议的文本、引用规则及编辑指南均位于 `08_Sources_and_Editing` 文件夹中。

## 史料整合状态

截至2026年6月5日：

- **30种史料**已完成清点，附有可靠性分级（一级至四级）、已知偏向、可用摘录及推荐引用格式。参见 `08_Sources_and_Editing/new_source_inventory.md`。
- **16份PDF**已从 LibGen、Internet Archive 和 Z-Library 获取并验证。参见 `08_Sources_and_Editing/source_processing_log.md`。
- **33项史实主张**已映射（CLM-0001 至 CLM-0033），附有支撑史料、证据分类、置信度评级及受影响的维基页面。参见 `08_Sources_and_Editing/claim_map.md`。
- **9段原始文献**已翻译，附有中文原文、精译英文及术语注解。参见 `07_Reference/translated_primary_passages.md`。
- **1项重大缺口**：26卷本《清政府镇压太平天国档案史料》（1990–2001）目前尚无数字版本。

[完整变更日志](CHANGELOG_SOURCE_INTEGRATION.md)

## 如何使用本维基

1. **先读故事**：从主条目和 `01_Main_Story/` 中的六个叙事章节开始。这些章节提供了完整的时间线叙事：从鸦片战争背景直至南京陷落及最后的战役。

2. **深入专题**：使用索引查找关于特定领袖、制度、战役和政策的页面。页面之间的交叉链接将人物与事件、思想与战役连接起来。

3. **查阅参考资料**：`07_Reference/` 中的年表、术语表、中文术语、原始文献翻译和关键争议提供快速查找和原始文本。

4. **理解论争**：`06_Aftermath_and_Memory/` 中的主题论文介绍了史学争议——定性之争、清朝取胜问题、江南经验、宗教语言以及湘淮势力的遗产。

5. **追溯史料**：`08_Sources_and_Editing/` 包含史料指南、参考书目、编辑标准、史料数据库以及供编辑使用的编辑基础设施文件（史料清册、摘录笔记、史实主张映射、处理日志）。

## 文件夹结构

```text
00_Start_Here/              — 新访客阅读路径
01_Main_Story/               — 7个按时间顺序排列的叙事章节
02_Origins_and_Religion/     — 11页关于领袖、信仰和社会起源
03_Taiping_State/            — 11页关于制度、政策与治理
04_War_and_Campaigns/        — 15页关于战役、战斗与指挥官
05_Qing_Response/            — 8页关于清廷的军事与政治应对
06_Aftermath_and_Memory/     — 13页关于后果、记忆与史学史
07_Reference/                — 13页参考资料
08_Sources_and_Editing/      — 12个文件：读者导向的指南 + 编辑基础设施
09_Backlog/                  — 1页：研究待办清单
CHANGELOG_SOURCE_INTEGRATION.md — 史料整合变更日志（2026年6月5日）
FILE_MANIFEST.md             — 完整文件清单
index.md                     — 维基首页 / 目录
README.md                    — 本文件
quality_check.txt            — 质量状态追踪
```

## 网站部署

公开站点由 Cloudflare Worker 提供服务，地址为：

- 生产环境：`https://taiping.vzfz.me`
- Worker 名称：`taiping-wiki`
- GitHub 仓库：`https://github.com/meliorvz/taiping-wiki`

源 Markdown 文件仍是权威数据源。`npm run build` 生成
`app/content.generated.ts`，然后将 Worker 输出构建到 `dist/` 目录。

### 本地命令

```bash
npm ci
npm run build
npm run deploy:cloudflare:dry-run
npm run deploy:cloudflare
```

`wrangler.jsonc` 是提交到仓库的 Cloudflare 部署配置。它将 Wrangler 指向
生成的 Worker 包：

- Worker 入口：`dist/server/index.js`
- 静态资源：`dist/client`
- 自定义域名：由部署命令提供，`taiping.vzfz.me`

### GitHub Actions 部署

`.github/workflows/deploy-cloudflare.yml` 在每次 Pull Request 和 Push 时构建。
当以下 GitHub 设置存在时，推送到 `main` 分支将部署到 Cloudflare：

- 仓库变量：`CLOUDFLARE_ACCOUNT_ID`
- 仓库密钥：`CLOUDFLARE_API_TOKEN`

在 Cloudflare 控制面板中创建 Cloudflare 令牌，授予对
`Victor@melior.group's Account` 账户和 `vzfz.me` 区域的权限：

- 账户：Workers Scripts：编辑
- 账户：Workers Routes：编辑
- 账户：Account Settings：读取
- 区域：Zone：读取
- 区域：SSL and Certificates：编辑

然后将其存储到 GitHub：

```bash
gh variable set CLOUDFLARE_ACCOUNT_ID --body '5f859aa789a9938e8e5605f796e747c4' --repo meliorvz/taiping-wiki
gh secret set CLOUDFLARE_API_TOKEN --repo meliorvz/taiping-wiki
```

### Cloudflare 控制面板 Git 关联

您也可以直接在 Cloudflare Workers Builds 中关联 GitHub 仓库，而不使用 GitHub Actions。

1. 打开 Cloudflare 控制面板。
2. 进入 `Workers & Pages`。
3. 选择已有的 `taiping-wiki` Worker。
4. 打开 `Settings` > `Builds`。
5. 选择 `Connect` 并选择 `meliorvz/taiping-wiki`。
6. 使用以下构建设置：
   - 生产分支：`main`
   - 根目录：`/`
   - 构建命令：`npm run build`
   - 部署命令：`npm run deploy:cloudflare`
   - Node 版本：`22.13.0` 或更新版本
7. 保存并部署。

Cloudflare 的 Workers Builds 文档指出，关联的 Worker 名称必须与仓库根目录中 Wrangler 配置的名称一致；本仓库的
`wrangler.jsonc` 使用 `name: "taiping-wiki"` 正是为此。
