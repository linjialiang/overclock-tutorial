# AGENTS.md

本文件面向后续接手这个项目的 AI 助手。项目根目录是 `D:\project\overclock-tutorial`，以下路径均相对此目录。

## 项目是什么

**新手超频指南**：面向新手的超频教程站点，中文内容，使用 VitePress 构建。

三大部分：

1. **超频概述**：一章讲清楚超频在超什么、代价是什么、怎么读这份教程。
2. **超频原理**：按主题分 9 章，平台无关，讲原理和判断方法。
3. **烤机工具**：5 款工具各一页，用真实截图说明界面、读数和判读方法。
4. **超友案例**：按 CPU + 主板归组；每个平台先有独立的超频指导，再挂同平台案例。当前只有 i7-4790K + Z97-AR 的指导与平台页，案例位为空。

## 技术栈与命令

- VitePress `1.6.4`，**只使用默认主题自带样式**，没有自定义 CSS/主题。
- Node 18+（开发时使用 Node 26 / pnpm 12）。
- 本地搜索使用 VitePress 内置 local search。

```bash
pnpm install
pnpm docs:dev       # 开发
pnpm docs:build     # 构建，产物在 docs/.vitepress/dist
pnpm docs:preview   # 预览构建产物
```

构建成功的标志：`build complete`，当前应生成 **23 个内容页 + `404.html`，合计 24 个 HTML 文件**。

## 目录结构

```text
docs/
├─ index.md                    首页（默认 home 布局：hero + features）
├─ overview.md                 超频概述
├─ principles/
│  ├─ index.md                 章节导读
│  ├─ 01-frequency.md          频率与倍频
│  ├─ 02-voltage.md            电压与供电
│  ├─ 03-memory.md             内存与 XMP
│  ├─ 04-cache.md              缓存与 Ring
│  ├─ 05-igpu.md               集成显卡
│  ├─ 06-motherboard.md        主板与芯片组
│  ├─ 07-power-cooling.md      电源与散热
│  ├─ 08-stability.md          稳定性验证
│  ├─ 09-tuning.md             调参与体质
│  └─ glossary.md              术语表
├─ cases/
│  ├─ index.md                 案例区总览与平台索引
│  └─ 4790k-z97ar/
│     ├─ index.md              平台页：规格、指导入口、案例列表
│     ├─ guide.md              超频指导：7 步顺序、每步判据、异常处理
│     └─ case-01-daily-47x.md  案例 01：按指导顺序整理的实测记录（截图待补）
├─ tools/
│  ├─ index.md                 工具导读与选型表
│  ├─ aida64.md                AIDA64 系统稳定性测试
│  ├─ cpuz.md                  CPU-Z
│  ├─ hwinfo.md                HWiNFO
│  ├─ testmem5.md              TestMem5
│  └─ memtest86plus.md         MemTest86+
├─ public/cases/<平台>/        案例截图（当前为空，等第一个投稿）
├─ public/tools/<tool>/        工具页真实截图（aida64 / cpuz / hwinfo / testmem5 / memtest86plus）
└─ .vitepress/config.mts       导航、侧边栏、搜索、页脚
```

## 内容规范

### 原理篇必须平台无关

- `docs/principles/` 下**不要出现**具体机器数据，例如 `4790K`、`Z97-AR`、`1.55 V`、`PA120`、`本机`。
- 具体配置、实测读数、踩坑只放在 `docs/cases/` 对应的案例章。
- 需要举例时用通用表述（“某款 K 系列型号”“核心 47x、Ring 40x”），不要绑定本机。

### 来源标记

正文必须区分来源，不要把经验写成官方结论：

| 标记       | 用途                          |
| ---------- | ----------------------------- |
| `[Intel]`  | Intel 官方规格或数据表        |
| `[手册]`   | 主板官方手册，尽量写页码/章节 |
| `[官方页]` | 厂商产品页、官方指南          |
| `[本机]`   | 案例投稿人的实测数据          |
| `[经验]`   | 社区经验值，不是官方保证      |

### 写作规则

- 先给结论，再给依据；表格优先于长段落。
- 不编造数据；没有实测就写“未测试”或标 `[经验]`。
- 原理章结尾保留 `## 本章要点`（3–5 条）。
- 一次只改一项、先记录默认值、稳定性以 WHEA/错误/真实应用为准，这些原则不要弱化。
- 案例按 CPU + 主板归组：先写该平台的超频指导，再挂案例；同一平台多次投稿各占一篇，不另开平台。
- 超频指导里的每个数值必须站得住：官方规格标 `[Intel]`/`[手册]`，社区做法标 `[经验]`，不写「安全电压上限」这类没有官方依据的数字。

### 文件与图片命名

- 原理章：`NN-topic.md`，例如 `02-voltage.md`。
- 平台页：`docs/cases/<CPU简称>-<主板简称>/index.md`，例如 `docs/cases/4790k-z97ar/index.md`。
- 超频指导：同目录 `guide.md`。
- 案例：同目录 `case-NN-简述.md`，例如 `case-01-daily-47x.md`。
- 工具页：`docs/tools/<tool>.md`，例如 `testmem5.md`；工具截图为真实截图，放 `docs/public/tools/<tool>/`，图注必须写来源（本机 / 官方页 / 重绘）与软件版本。
- 图片：`docs/public/cases/<平台>/`，英文小写 + 连字符，例如 `cpu-adaptive-124.png`。
- 示意图：`docs/public/overview/`（概述章）或对应章节目录，英文小写 + 连字符，例如 `01-targets.svg`；图内配色与编号自成系列，不依赖站点主题样式。
- 引用图片用站点绝对路径：`/cases/4790k-z97ar/cpu-adaptive-124.png`、`/overview/01-targets.svg`。

### 新增页面时

1. 在对应目录创建 Markdown，开头写：

   ```md
   ---
   title: 页面标题
   ---

   # 页面标题
   ```

2. 在 `docs/.vitepress/config.mts` 的对应 `sidebar` 数组里加条目，否则页面不会出现在侧边栏。
3. 如果是原理章，同步更新 `docs/principles/index.md` 的导读表。
4. 跑 `pnpm docs:build`，确认无死链、页面数正确。

## 当前状态

### 已完成

- VitePress 项目、默认主题、导航/侧边栏/本地搜索。
- 概述 1 章；原理 9 章 + 导读 + 术语表；工具 5 页 + 导读；案例区为「平台 → 超频指导 → 案例」结构，当前 1 个平台（4790K + Z97-AR）+ 1 篇案例（日常 47x，数据取自旧案例，8 张截图待补）。
- 工具篇共 14 张图：AIDA64 2 张、CPU-Z 3 张、HWiNFO 2 张、TestMem5 6 张（1 张实机主界面 + 5 张手册附录 A 的中文对照重绘）、MemTest86+ 1 张官方图。中文对照图必须在图注写明「重绘，非软件原生界面」。
- Git 已初始化，提交历史干净，工作区应为干净状态。

### 已知待办

- 案例 01 还缺 8 张截图（HWiNFO 满载 ×2、空闲、AIDA64 CPU/缓存/内存、CPU-Z 内存与 SPD、BIOS Ai Tweaker），补齐后替换文中的【待补图 N】占位。
- 案例 01 还缺实测项：`Stress cache`、组合负载、冷启动/睡眠唤醒、真实应用、Manual/Offset 降压，补齐后更新对应步骤与结论。
- 新增平台时建 `docs/cases/<CPU>-<主板>/`，内含 `index.md`（平台页）与 `guide.md`（超频指导），并在侧边栏加一个可折叠分组。
- 部署 GitHub Pages 前，在 `docs/.vitepress/config.mts` 加 `base: '/overclock-tutorial/'`，否则静态资源 404。
- Git 远端已配置：`origin` = `git@github.com:linjialiang/overclock-tutorial.git`（SSH），`main` 已推送并跟踪 `origin/main`，之后改完 `git push` 即可。

## 修改流程

1. 先读 `docs/.vitepress/config.mts` 和相关章节，确认现有结构。
2. 改内容；原理篇保持平台无关，案例篇保留真实数据。
3. `pnpm docs:build` 必须通过；页面数变化时说明原因。
4. 需要时 `pnpm docs:preview -- --port 4173`，检查首页、章节、案例、图片是否 200。
5. 提交信息用 `docs: ...`，例如 `docs: add case 02`。

## 不要做的事

- 不要引入自定义 CSS、主题或 UI 框架；用户明确要求 VitePress 自带渲染样式。
- 不要把本机数据写进原理篇。
- 不要编造官方结论；手册没写的，标 `[经验]` 或写“只能实测”。
- 不要给 4790K 之类的型号编造「安全电压上限」；官方只给 Tjmax 与规格。
- 不要提交 `node_modules/`、`docs/.vitepress/dist/`、`docs/.vitepress/cache/`（已在 `.gitignore`）。

## 旧资料位置（只读参考）

原始长文在另一个目录，可作为素材，但**新项目是唯一发布源**：

- `D:\project\AgentDefaultProject\超频教程原理篇.md`
- `D:\project\AgentDefaultProject\4790K_Z97-AR_DDR3_超频教程.html`
- `D:\project\AgentDefaultProject\4790K_Z97-AR_DDR3_超频设置.pdf`

迁移时不要把旧文里的本机数据带进 `docs/principles/`。
