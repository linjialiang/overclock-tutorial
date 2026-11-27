---
title: 超频指导：i7-4790K + Z97-AR
---

# 超频指导：i7-4790K + Z97-AR

这份指导只针对 i7-4790K + Z97-AR 这一套平台。每一步都给出**具体参数、参数在 BIOS 的哪个位置、建议填什么值**；数值是起点不是保证——同一型号的两颗 CPU，能稳的频率和电压也不一样。

参数位置与取值范围以 ASUS Z97-AR 用户手册（E9367）第 2 章为准 `[手册]`；CPU 规格以 Intel ARK 为准 `[Intel]`。板子不同、BIOS 版本不同，菜单名称可能略有差异，以实机为准。

## 开始之前

- **一次只改一项。** 改完立刻记录原始值与结果，出问题才知道是哪一步引入的。
- **每一步都要有判据。** "能开机""感觉快了"都不算通过，判据看[稳定性验证](/principles/08-stability)。
- **先把工具准备好。** 压力测试用 [AIDA64](/tools/aida64)，读数和记录用 [HWiNFO](/tools/hwinfo)，内存用 [TestMem5](/tools/testmem5)。

### 改完怎么保存、怎么回退

| 动作 | 位置 | 说明 |
|---|---|---|
| 保存并重启 | `F10` → Save & Exit | 每次只保存一项改动，重启后进系统确认读数 |
| 存配置档 | Tool → ASUS O.C. Profile（手册 2.9.3） | 稳定一档存一份，换散热、换内存、刷 BIOS 前先存 |
| 开不了机时 | 清 CMOS（跳线或拔电池） | 回到出厂设置，再逐项恢复 |
| 只想先跑起来 | Ai Tweaker → OC Tuner（手册 2.5.11） | `Ratio First` 只动倍频；`BCLK First` 会连带影响内存，不建议 |

## 顺序总览

| 顺序 | 调什么 | 为什么在这个位置 | 主要判据 |
|---|---|---|---|
| 0 | 基线：全默认 + 内存 JEDEC | 先证明平台本身没问题，否则后面分不清是谁的错 | 10 分钟 CPU 负载无蓝屏、无 WHEA |
| 1 | 内存 XMP | 内存不稳会伪装成 CPU 不稳；先把它定死，后面每一步的因果才干净 | 内存测试跑完且 Errors = 0 |
| 2 | CPU 核心倍频与电压 | 收益最大、影响面最广，必须在内存稳定之后 | 组合负载通过，温度有余量 |
| 3 | 缓存 / Ring 倍频 | 核心与缓存是两套倍频和电压，核心稳了才能单独动 | cache 负载与组合负载都通过 |
| 4 | 核显（可选） | 只有用核显时才需要；它会给功耗与温度再叠一层 | 核显负载与显示输出正常 |
| 5 | 组合验证与真实应用 | 单项通过不等于整机稳定 | 组合 30 分钟 + 冷启动 + 真实任务 |
| 6 | 降压到最低稳定电压 | 频率固定之后才有意义；把余量换成温度和噪音 | 同样负载仍通过，且 Vcore 确实下降 |

顺序的道理只有两条：**从窄到宽**（先单项、后组合），以及**一次只改一项**。内存排在最前，是因为内存出错的表现和 CPU 不稳几乎一样；不先固定内存，后面每一次蓝屏都可能是内存造成的误判。

## 步骤 0：建立基线

| 参数 | 位置 | 建议值 |
|---|---|---|
| `Ai Overclock Tuner` | Ai Tweaker → Ai Overclock Tuner（手册 2.5.1） | `Auto`，先不开 XMP |
| BCLK | 同上；默认 100.0 MHz | 保持默认；`BCLK Frequency` 输入项只在选 `Manual` 时出现（手册 2-19） |
| `Turbo Mode` | Ai Tweaker → Internal CPU Power Management（2.5.15） | `Enabled` |
| `Enhanced Intel SpeedStep Technology` | 同上（2.5.15） | `Enabled`，保留空闲降频 |
| `CPU Q-Fan Control` | Monitor → CPU Q-Fan Control（2.7.5） | 3-pin 风扇选 `DC Mode`，4-pin 选 `PWM Mode` |
| 内存 | — | 先跑 JEDEC 默认档，不开 XMP |

| 项目 | 内容 |
|---|---|
| 怎么测 | [AIDA64](/tools/aida64) 只勾 `Stress CPU` 跑 10 分钟；[HWiNFO](/tools/hwinfo) 记录封装温度最高值、封装功耗、有效频率 |
| 通过判据 | 无蓝屏/重启；温度明显低于 100 °C；`有效频率` 与 `核心频率` 接近（没有节流） |
| 没通过怎么办 | 先查散热器是否压紧、风扇是否转、内存是否插到位；平台本身有问题时不要开始超频 |

基线这一轮的作用是留一份"什么都没改"的对照数据，后面每一步都要拿它比。

## 步骤 1：内存 XMP

| 参数 | 位置 | 建议值 |
|---|---|---|
| `Ai Overclock Tuner` | Ai Tweaker → Ai Overclock Tuner（手册 2.5.1） | `X.M.P.` |
| `eXtreme Memory Profile` | 同上，选 `X.M.P.` 后出现（2.5.1） | `Profile #1`，按内存条标称选 |
| `DRAM Voltage` | Ai Tweaker → DRAM Voltage（2.5.24） | 先用 XMP 标称值；可调范围 1.20–1.92 V，0.01 V 步进 |
| `DRAM Command Rate` | Ai Tweaker → DRAM Timing Control（2.5.13） | 先 `Auto`（通常给出 2T） |
| 主时序（`DRAM CAS# Latency` 等） | 同上（2.5.13） | 先 `Auto` / 跟随 XMP，不稳再放宽 |
| `CPU System Agent Voltage Offset` / CPU Digital I/O | Ai Tweaker → CPU System Agent / CPU Digital I/O（2.5.19 / 2.5.21） | 先 `Auto`，把实际值记下来 |

| 项目 | 内容 |
|---|---|
| 怎么测 | [TestMem5](/tools/testmem5) 用默认的 `Universal 2 @ LMhz` 至少 90 分钟；要更长时间验证就用 [MemTest86+](/tools/memtest86plus) 从 U 盘启动 |
| 通过判据 | 测试完整跑完且 `Errors = 0`；冷启动正常 |
| 没通过怎么办 | ① 先确认命令率是 2T ② 降一档频率复测 ③ 再放宽主时序 ④ 最后才在 1.20–1.92 V 范围内微调 DRAM 电压 `[手册]` ⑤ 四条满插时优先降频，不要靠猛加电压硬顶 |

::: warning 手册对高 DRAM 电压的警告
手册 2.5.24 引 Intel 规格提醒：**需要 1.65 V 以上电压的 DIMM 可能永久损坏 CPU**，建议装低于 1.65 V 的条子 `[手册]`。看到 XMP 标称 1.65 V 的天生高电压条，要先想清楚再决定长期跑。
:::

四条 DDR3 满插对内存控制器的压力比两条大，XMP 档位不保证能直接跑稳；这条判断依据见[内存与 XMP](/principles/03-memory)。

XMP 通过之后还有两个方向可以继续收：**命令率**和**电压**。两个都要单独改、单独测，别一起动。

### 命令率：先 2T，稳了再试 1T

四条满插时，XMP 档位的命令率（`DRAM Command Rate`，CPU-Z 里显示为「指令比率」）通常是 **2T**——这是这一代四条 DDR3 的常见默认，也是更宽容、更容易稳的那一档 `[经验]`。

| 档位 | 特点 | 什么时候用 |
|---|---|---|
| `2T` | 对内存控制器与信号质量要求低，四条满插的默认选择 | 先按 2T 跑完内存测试，作为通过基准 |
| `1T` | 延迟略低，但对信号与 IMC 要求更高，四条时经常不稳 | 2T 通过后想再压一档延迟时试 |

操作：在 `DRAM Timing Control` 里把 `DRAM Command Rate` 从 2 改成 1 → **完整重跑一遍内存测试**（不是加跑几分钟）→ 出现任意 `Errors` 就改回 2，不要靠加电压硬顶。四条满插能把 1T 跑稳的情况有，但不常见；1T 的收益主要是延迟、幅度有限，优先级低于频率与时序 `[经验]`。

### 电压：不只是往上加，也可以往下试

DRAM 电压有两个方向，别只想着加：

- **降压**：XMP 给的电压是厂商验证值，颗粒体质好时往往能往下走一点，换来更低温度与更小的 IMC 压力。做法是每次 `−0.02~0.05 V`，每改一次重新跑完整内存测试；开不了机或报错就回上一档。
- **加压**：不稳时的小幅补偿手段，不要超过 1.92 V 的可调上限 `[手册]`，更不要越过 1.65 V 这条 Intel 提醒线；也别把它当万灵药——四条满插加电压带来的温升，可能反而让情况更糟。

两个方向的共同点：**以测试结果为准，不追求"最低电压"这个数字**。降压和上 1T 通常互相冲突（1T 更吃电压），所以顺序是先在 2T 下把电压压到稳定下限，再单独试 1T；1T 不稳就退回 2T，而不是先加电压。

## 步骤 2：CPU 核心倍频与电压

| 参数 | 位置 | 建议值 |
|---|---|---|
| `CPU Core Ratio` | Ai Tweaker → CPU Core Ratio（手册 2.5.3） | `Sync All Cores` → `47` |
| `CPU Core Voltage` | Ai Tweaker → CPU Core Voltage（2.5.17） | `Manual Mode` |
| `CPU Core Voltage Override` | 同上，选 `Manual Mode` 后出现（2.5.17） | `1.240 V`；可调范围 0.001–1.920 V |
| `CPU Load-line Calibration` | Ai Tweaker → DIGI+ VRM（2.5.14） | `Auto`；需要时 Level 1–9 |
| `CPU Input Voltage`（VCCIN） | Ai Tweaker → CPU Input Voltage（2.5.23） | `Auto`；可调范围 0.800–2.700 V |
| `SVID Support` | Ai Tweaker → SVID Support（2.5.22） | `Enabled`，手册说明超频时应开启 |

| 项目 | 内容 |
|---|---|
| 怎么测 | [AIDA64](/tools/aida64) 勾 `Stress CPU` + `Stress FPU` + `Stress cache` 跑 10 分钟做筛查；通过后再跑 30 分钟；全程 [HWiNFO](/tools/hwinfo) 盯 Vcore、封装温度、`CPU Throttling` |
| 通过判据 | 30 分钟无蓝屏/重启；封装温度距 100 °C 还有明显余量；`有效频率` 不掉 |
| 没通过怎么办 | 先把 `CPU Core Voltage Override` 加 0.01 V 复测；如果是温度先顶，先降 1x 频率；连续加压两三次仍不稳，回上一档频率 |

三点说明：

- **47x 与 1.24 V 都是起点** `[经验]`。体制好的芯片能更低，体制一般的要更高，不要照抄。
- **没有"安全电压上限"这回事。** Intel 只规定 Tjmax 与规格，不给日常 Vcore 上限 `[Intel]`；手册只给可调范围 0.001–1.920 V `[手册]`。能不能长期用，看温度余量与稳定性测试。
- **这一步只加电压，不降压。** 找频率上限时降压会让两个变量互相掩盖；等 47x 稳定后，再按步骤 6 把电压压回去。

## 步骤 3：缓存 / Ring 倍频

| 参数 | 位置 | 建议值 |
|---|---|---|
| `Min. CPU Cache Ratio` / `Max. CPU Cache Ratio` | Ai Tweaker → Min./Max. CPU Cache Ratio（手册 2.5.4 / 2.5.5） | 先都设 `40` |
| `CPU Cache Voltage` | Ai Tweaker → CPU Cache Voltage（2.5.18） | 先 `Auto` |
| `CPU Cache Voltage Override` | 同上，选 `Manual Mode` 后出现（2.5.18） | 需要时再填，范围 0.001–1.920 V |

| 项目 | 内容 |
|---|---|
| 怎么测 | [AIDA64](/tools/aida64) 只勾 `Stress cache` 跑 10–20 分钟，再跑一次组合负载 |
| 通过判据 | cache 负载与组合负载都通过，频率不异常掉落 |
| 没通过怎么办 | 回上一档；`Auto` 不稳时再改 `Manual Mode`，小幅加 0.01–0.02 V `[经验]` |

缓存和核心是两套倍频、两套电压，必须分开验证，原理见[缓存与 Ring](/principles/04-cache)。ASUS 的 ROG Haswell 指南给的经验是缓存比核心低约 300 MHz，可以作为参照 `[经验]`。缓存倍频固定后，缓存电压也能按步骤 6 逐档往下压。

## 步骤 4：核显（可选）

| 参数 | 位置 | 建议值 |
|---|---|---|
| `Max. CPU Graphics Ratio` | Ai Tweaker → Max. CPU Graphics Ratio（手册 2.5.10） | 先 `Auto`，要用核显再设固定值 |
| `CPU Graphics Voltage` | Ai Tweaker → CPU Graphics Voltage（2-30） | 先 `Auto`；模式有 `Auto` / `Manual Mode` / `Offset Mode` / `Adaptive Mode` |
| `Additional Turbo Mode CPU Graphics Voltage` | 同上，选 `Adaptive Mode` 后出现（2-31） | 按需；它只作用于 Turbo 区间 |

| 项目 | 内容 |
|---|---|
| 怎么测 | 核显负载 + 实际显示输出正常，再跑一次组合负载 |
| 通过判据 | 无驱动重置、无花屏、温度不顶 |
| 没通过怎么办 | 回默认值；核显收益小，优先保核心与内存 |

不要在调核显时顺手改核心电压——那会把两件事混在一起。核显电压同样可以降，方法和核心一样，见步骤 6。

## 步骤 5：组合验证与真实应用

| 项目 | 内容 |
|---|---|
| 改哪里 | 不改 BIOS 参数，只做验证 |
| 怎么测 | [AIDA64](/tools/aida64) 勾 `Stress CPU` + `Stress FPU` + `Stress cache` + `Stress system memory` 跑 30 分钟；然后冷启动、睡眠唤醒各一次；再跑一次真实任务（游戏、渲染或编译） |
| 通过判据 | 全部通过，无 WHEA、无应用崩溃、频率不掉 |
| 没通过怎么办 | 回到对应单项步骤降一档，不要在组合阶段盲加电压 |

烤机是恒定负载，日常是不断切换的负载；电压跌落、频率跳变、电源瞬态这些环节在恒定负载里被绕过去了，所以真实应用往往比多烤半小时更早暴露问题。

## 步骤 6：降压到最低稳定电压

降压是独立的调校环节，不是顺手改一下：**频率和稳定性先固定，再把电压一档一档往下压**，直到找到"还能通过全部判据"的最低点。

### 为什么值得降

功耗近似正比于电压的平方 × 频率（见[电压与供电](/principles/02-voltage)），电压降 5%，功耗约降 10%，温度与风扇噪音跟着下降。收益是实打实的，代价是稳定性余量变小。

### 核心：Manual 逐档下调，再换 Offset

| 参数 | 位置 | 怎么填 |
|---|---|---|
| `CPU Core Voltage` | Ai Tweaker → CPU Core Voltage（手册 2.5.17） | 先用 `Manual Mode` 找下限 |
| `CPU Core Voltage Override` | 同上（2.5.17） | 每档 `−0.010 V`，范围 0.001–1.920 V |
| `CPU Core Voltage` | 同上（2.5.17） | 找到下限后改 `Offset Mode` 做日常自动降压 |
| `Offset Mode Sign` | 同上，选 `Offset Mode` 后出现（2.5.17） | `[–]` |
| `CPU Core Voltage Offset` | 同上（2.5.17） | 从 `0.020 V` 起，每次 `+0.010 V`（往负方向加深），上限 0.999 V |

Manual 固定电压在空闲时不会跟着降，`Offset Mode` 才有空闲降压效果——这是最后要换成 Offset 的原因 `[手册]`。

### 其余三块

| 调什么 | 在哪降 | 注意 |
|---|---|---|
| 缓存 | `CPU Cache Voltage` 改 `Manual Mode` 后逐档 −0.010 V（2.5.18）；也可用 `CPU Cache Voltage Offset` + `Sign [–]` | 缓存与核心是两套电压，降完必须单独跑 `Stress cache` |
| 核显 | `CPU Graphics Voltage` 固定频率后逐档下调，或用 `Offset Mode`（2-30） | 只有用核显时才有意义 |
| 内存 | 已在步骤 1 处理：在 XMP 电压基础上每次 −0.02~0.05 V（2.5.24） | 与 1T 互相冲突，先降压再试 1T |

顺序是**核心 → 缓存 → 核显 → 内存**，一次只降一块。核心电压影响面最大，先把它的下限找准，其余几块再各自收。

### 通用三步

1. **固定频率**：只动电压，不动倍频；`LLC`、`VCCIN` 保持上一轮通过时的值，不要同时改。
2. **每次降 0.01 V**：每降一档，跑 30 分钟组合负载并做一次冷启动；[HWiNFO](/tools/hwinfo) 只看 Vcore。
3. **回退一档**：出现蓝屏、WHEA、报错或开不了机，就回上一档，把那一档记为"最低稳定电压"，日常停在这里，不再往下压。

### 降压过头的信号

- 满载报错、蓝屏 0x124 / 0x101，或事件查看器里出现新的 WHEA
- 空闲、轻载反而不稳（降过头后低载电压不足），或冷启动失败
- 频率看着正常，应用却崩溃——先怀疑电压，别先怀疑软件

出现任意一条就回上一档复测，**不要用拉高 LLC 去救**：那是把风险从"电压不够"换成"瞬态过冲"。

### 什么时候不该降压

- 频率本身还没稳定——先稳频率，再谈电压
- 温度离 Tjmax 还很远，也不在意噪音和功耗——收益有限，风险照旧
- 正在追极限频率或跑分——那种场景需要的余量比日常多

这一代平台的常见坑是把 Adaptive 目标值填得比 VID 还低，结果实际电压没变——判断依据是 Vcore 读数，不是 BIOS 里的数字。

## 特殊场景怎么处理

| 场景 | 现象 | 处理顺序 |
|---|---|---|
| 温度顶到 Tjmax | 核心 95–100 °C、出现节流 | ① 先降压，每次 0.01 V ② 再降 1x 频率 ③ 查风扇曲线、硅脂、风道 ④ 最后才考虑换散热 |
| 电压读数与设定不符 | 设定 1.24 V，读到 1.26 V | 先分清 VID 与 Vcore，再看 LLC 档位，最后用 Manual 同值对照 |
| 加压后反而更不稳 | 加电压后温度升高、开始报错 | 先退回上一档电压与频率，排除温度因素，再单独加频率 |
| 内存测试报错 | TestMem5 出现 Error | ① 先确认命令率是 2T ② 降一档频率 ③ 范围内加 DRAM 电压 ④ 单条换槽复测 |
| 开不了机 / 黑屏 | 无 POST、反复重启 | 清 CMOS（跳线或拔电池）→ 最小配置（单条内存、核显）→ 回到上一个稳定设置 |
| 蓝屏或 WHEA | 0x124、0x101，或事件查看器有 WHEA | 先分来源：核心降 1x 或加 0.01 V，缓存回 Auto，内存回默认，逐项复测 |
| 四条内存不稳 | XMP 开不了、频繁报错 | 优先降频率，其次放宽时序，最后才动 VCCSA / VCCIO |
| 高室温 / 小机箱 | 室温 30 °C 以上、进风受限 | 目标频率整体降一档，温度判据按室温上浮，不要照抄冬天的数值 |
| 长期满载用途 | 渲染、编译、长时间导出 | 以组合负载 1 小时 + 真实任务为判据，日常频率比"能开机上限"低一档 |

处理顺序的道理一致：**先排除最容易改变的因素（电压、频率），再动硬件，最后才换配置**。任何一步改完都要重新跑一遍判据，不要凭感觉继续。

## 参数速查

| 要改的东西 | BIOS 位置 | 手册 |
|---|---|---|
| 开 XMP / 手动超频入口 | Ai Tweaker → Ai Overclock Tuner | 2.5.1 |
| 核心倍频 | Ai Tweaker → CPU Core Ratio | 2.5.3 |
| 缓存倍频 | Ai Tweaker → Min./Max. CPU Cache Ratio | 2.5.4 / 2.5.5 |
| 核显倍频 | Ai Tweaker → Max. CPU Graphics Ratio | 2.5.10 |
| 一键超频 | Ai Tweaker → OC Tuner | 2.5.11 |
| 内存时序与命令率 | Ai Tweaker → DRAM Timing Control | 2.5.13 |
| 防掉压 / 供电能力 | Ai Tweaker → DIGI+ VRM | 2.5.14 |
| 节能与功耗墙 | Ai Tweaker → Internal CPU Power Management | 2.5.15 |
| 核心电压（含 Override / Offset） | Ai Tweaker → CPU Core Voltage | 2.5.17 |
| 缓存电压 | Ai Tweaker → CPU Cache Voltage | 2.5.18 |
| 核显电压（含 Adaptive） | Ai Tweaker → CPU Graphics Voltage | 2-30 |
| VCCSA / VCCIO 偏移 | Ai Tweaker → CPU System Agent / CPU Analog·Digital I/O | 2.5.19–2.5.21 |
| SVID | Ai Tweaker → SVID Support | 2.5.22 |
| VCCIN | Ai Tweaker → CPU Input Voltage | 2.5.23 |
| 内存电压 | Ai Tweaker → DRAM Voltage | 2.5.24 |
| 风扇模式 | Monitor → CPU Q-Fan Control | 2.7.5 |
| 保存配置档 | Tool → ASUS O.C. Profile | 2.9.3 |

## 每次改动都要记录

没有记录就没有对照。建议每次只填一行：

| 日期 | 改了什么 | 测试与时长 | 最高温度 | 结果 | 下一步 |
|---|---|---|---|---|---|
| 例：11-28 | 核心 47x，Manual 1.24 V | AIDA64 CPU+FPU+cache 30 分钟 | 74 °C | 通过 | 缓存试 41x |

记录最少要包含：改了哪一项、原始值、测试工具与时长、最高温度、有没有 WHEA 或错误。

## 来源

| 结论 | 来源 | 位置 |
|---|---|---|
| 4790K 规格、Tjmax 100 °C | Intel ARK | Core i7-4790K |
| Ai Overclock Tuner / CPU Core Ratio / 缓存与核显倍频 / OC Tuner | ASUS Z97-AR 用户手册（E9367） | 2.5.1 / 2.5.3 / 2.5.4–2.5.5 / 2.5.10 / 2.5.11 |
| DRAM Timing Control、命令率 | 同上 | 2.5.13 |
| CPU Load-line Calibration 与 DIGI+ VRM | 同上 | 2.5.14 |
| Turbo Mode、EIST、功耗墙 | 同上 | 2.5.15 |
| 核心电压三种模式、Override 与 Offset 范围 | 同上 | 2.5.17（2-29） |
| 缓存电压及其 Override / Offset | 同上 | 2.5.18（2-30） |
| 核显电压四种模式与 Additional Turbo | 同上 | 2-30 / 2-31 |
| VCCSA / VCCIO 偏移、SVID | 同上 | 2.5.19–2.5.22 |
| CPU Input Voltage（VCCIN）范围 | 同上 | 2.5.23 |
| DRAM 电压范围与 1.65 V 警告 | 同上 | 2.5.24（2-32） |
| 风扇模式 | 同上 | 2.7.5 |
| 配置档保存 | 同上 | 2.9.3 |
| 从窄到宽、核心与缓存分开验证、WHEA 判读 | 站内[稳定性验证](/principles/08-stability) | 负载类型 / WHEA |
| VID 与 Vcore 的区别、Adaptive 低于 VID 不生效 | 站内[电压与供电](/principles/02-voltage) | 电压模式一节 |
| 缓存与核心的倍频关系、300 MHz 阶梯 | 站内[缓存与 Ring](/principles/04-cache)；ASUS ROG Haswell 指南 `[经验]` | — |
| 四条内存的压力 | 站内[内存与 XMP](/principles/03-memory) | 四条为什么难 |
| 47x / 1.24 V 起点、缓存加 0.01–0.02 V | 社区常见做法 | 标 `[经验]` |
| 四条满插先 2T、稳后再试 1T | 社区常见做法 | 标 `[经验]` |
| DRAM 可在 XMP 值基础上降压，以测试为准 | 社区常见做法 | 标 `[经验]` |
| 每次 0.01 V 逐档降压、不稳回退一档 | 社区常见做法 | 标 `[经验]` |
