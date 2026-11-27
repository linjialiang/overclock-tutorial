# AGENTS.md

本文件面向后续接手这个项目的 AI 助手。项目根目录是 `D:\project\overclock-tutorial`，以下路径均相对此目录。

## 项目是什么

**Overclocking 101**：面向新手的超频教程站点，中文内容，使用 VitePress 构建。

三大部分：

1. **超频概述**：一章讲清楚超频在超什么、代价是什么、怎么读这份教程。
2. **超频原理**：按主题分 9 章，平台无关，讲原理和判断方法。
3. **超友案例**：一位超友一章；第一篇是投稿模板与资源要求，案例 01 是 i7-4790K + Z97-AR。

## 技术栈与命令

- VitePress `1.6.4`，**只使用默认主题自带样式**，没有自定义 CSS/主题。
- Node 18+（开发时使用 Node 26 / npm 11）。
- 本地搜索使用 VitePress 内置 local search。

```bash
npm install
npm run docs:dev       # 开发
npm run docs:build     # 构建，产物在 docs/.vitepress/dist
npm run docs:preview   # 预览构建产物
```

构建成功的标志：`build complete`，当前应生成 **17 个 HTML 页面**。

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
│  ├─ index.md                 案例说明与列表
│  ├─ template.md              首篇：投稿模板与资源要求
│  └─ 01-4790k-z97ar.md        案例 01
├─ public/cases/4790k-z97ar/   案例截图（7 张）
└─ .vitepress/config.mts       导航、侧边栏、搜索、页脚
```

## 内容规范

### 原理篇必须平台无关

- `docs/principles/` 下**不要出现**具体机器数据，例如 `4790K`、`Z97-AR`、`1.55 V`、`PA120`、`本机`。
- 具体配置、实测读数、踩坑只放在 `docs/cases/` 对应的案例章。
- 需要举例时用通用表述（“某款 K 系列型号”“核心 47x、Ring 40x”），不要绑定本机。

### 来源标记

正文必须区分来源，不要把经验写成官方结论：

| 标记 | 用途 |
|---|---|
| `[Intel]` | Intel 官方规格或数据表 |
| `[手册]` | 主板官方手册，尽量写页码/章节 |
| `[官方页]` | 厂商产品页、官方指南 |
| `[本机]` | 案例投稿人的实测数据 |
| `[经验]` | 社区经验值，不是官方保证 |

### 写作规则

- 先给结论，再给依据；表格优先于长段落。
- 不编造数据；没有实测就写“未测试”或标 `[经验]`。
- 原理章结尾保留 `## 本章要点`（3–5 条）。
- 一次只改一项、先记录默认值、稳定性以 WHEA/错误/真实应用为准，这些原则不要弱化。
- 案例一人一章；同一人多次投稿合并更新，不另开新章。

### 文件与图片命名

- 原理章：`NN-topic.md`，例如 `02-voltage.md`。
- 案例章：`NN-平台简称.md`，例如 `01-4790k-z97ar.md`。
- 图片：`docs/public/cases/NN-平台简称/`，英文小写 + 连字符，例如 `cpu-adaptive-124.png`。
- 引用图片用站点绝对路径：`/cases/4790k-z97ar/cpu-adaptive-124.png`。

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
4. 跑 `npm run docs:build`，确认无死链、页面数正确。

## 当前状态

### 已完成

- VitePress 项目、默认主题、导航/侧边栏/本地搜索。
- 概述 1 章；原理 9 章 + 导读 + 术语表；案例 3 篇（说明、模板、案例 01）。
- 案例 01 配 7 张实测截图，含手动 / Tuner 两套本机配置。
- Git 已初始化，提交历史干净，工作区应为干净状态。

### 案例 01 的关键结论（不要改错）

平台：i7-4790K + ASUS Z97-AR（BIOS 2801）+ 4×8 GB DDR3-2400 + PA120 SE + WD500K。

- CPU 47x，Adaptive + Additional Turbo 标称 1.24 V；另测 1.20 V。
- 两组实测 **VID 都是 1.262 V、Vcore 都是 1.264 V**，频率、温度、功耗同一水平 → 低于原生 VID 的 Adaptive 目标没有改变实际电压。
- 因此“1.20 V 跑了 39 分钟”实际是在 1.26 V 下跑的，不能当作 1.20 V 稳定。
- 想真正降压：`Manual Mode` 固定 1.24 V 验证，稳定后改 `Offset Mode` + `Sign −`；只看 Vcore，不看 VID。
- 缓存 40x，Cache Voltage Auto；按 ASUS 的 300 MHz 经验，核心稳定后可试 44x。
- 内存 XMP 2400，DRAM 1.55 V 通过 1 小时内存测试；**1.50 V 开机直接蓝屏**，1.55 V 已是下限，日常建议留余量。
- 满载约 97–101 W，最高 73–74 °C，室温 20–22 °C，散热不是瓶颈。

### 已知待办

- 案例 01 还缺 BIOS 实拍/截图：Ai Tweaker 主界面、电压模式页、DRAM 电压/时序页。按 `docs/cases/template.md` 的截图清单补。
- 更多超友案例：复制 `template.md` 为 `NN-平台简称.md`，一人一章。
- 部署 GitHub Pages 前，在 `docs/.vitepress/config.mts` 加 `base: '/overclock-tutorial/'`，否则静态资源 404。
- 尚未推送到 GitHub 远端。

## 修改流程

1. 先读 `docs/.vitepress/config.mts` 和相关章节，确认现有结构。
2. 改内容；原理篇保持平台无关，案例篇保留真实数据。
3. `npm run docs:build` 必须通过；页面数变化时说明原因。
4. 需要时 `npm run docs:preview -- --port 4173`，检查首页、章节、案例、图片是否 200。
5. 提交信息用 `docs: ...`，例如 `docs: add case 02`。

## 不要做的事

- 不要引入自定义 CSS、主题或 UI 框架；用户明确要求 VitePress 自带渲染样式。
- 不要把本机数据写进原理篇。
- 不要编造官方结论；手册没写的，标 `[经验]` 或写“只能实测”。
- 不要删除 `docs/cases/template.md`：它是案例区的首篇。
- 不要提交 `node_modules/`、`docs/.vitepress/dist/`、`docs/.vitepress/cache/`（已在 `.gitignore`）。

## 旧资料位置（只读参考）

原始长文在另一个目录，可作为素材，但**新项目是唯一发布源**：

- `D:\project\AgentDefaultProject\超频教程原理篇.md`
- `D:\project\AgentDefaultProject\4790K_Z97-AR_DDR3_超频教程.html`
- `D:\project\AgentDefaultProject\4790K_Z97-AR_DDR3_超频设置.pdf`

迁移时不要把旧文里的本机数据带进 `docs/principles/`。
