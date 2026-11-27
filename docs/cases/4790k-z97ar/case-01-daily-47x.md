---
title: 案例 01：日常 47x
---

# 案例 01：i7-4790K + Z97-AR 日常 47x

> 超友：匿名投稿
> 目标：47x 全核日常，尽量压低核心电压；内存 XMP 2400 四条稳定
> 结论：47x 稳定，但 Adaptive 标称 1.20 / 1.24 V 都没有改变实际电压（实测仍是 1.264 V）；内存 1.55 V 是一小时测试的下限

本篇按平台[超频指导](/cases/4790k-z97ar/guide)的顺序记录：先必要的 BIOS 基础设置，再内存、核心、缓存、核显、组合验证，最后是降压。没做的项目写"未测试"，不补猜。

## 平台信息

| 项目 | 内容 |
|---|---|
| CPU | Intel Core i7-4790K，4C/8T，4.00 / 4.40 GHz，8 MB，88 W `[Intel]` |
| 主板 | ASUS Z97-AR，BIOS 3503 |
| 内存 | 4×8 GB DDR3-2400，共 32 GB，XMP，四条满插 |
| 显卡 | 核显 HD Graphics 4600 |
| 电源 | 航嘉 WD500K，500 W 金牌 |
| 散热 | 利民 PA120 SE，双塔 6 热管，2×120 mm 风扇 |
| 机箱风道 | 前 2×120 mm 进、后 1×120 mm 出 |
| 室温 | 约 20–22 °C |
| 操作系统 | Windows 10 |

## 步骤 0：基础设置与基线

按指导先做与超频无关但必须先确认的几项，再留一份全默认读数当对照。

| 参数 | 位置 | 本机设置 |
|---|---|---|
| BCLK | Ai Tweaker（手册 2.5.1，Manual 时才出现输入项） | 100.0 MHz |
| `Turbo Mode` | Ai Tweaker → Internal CPU Power Management（2.5.15） | `Enabled` |
| `Enhanced Intel SpeedStep Technology` | 同上（2.5.15） | `Enabled`，保留空闲降频 |
| EIST / C-States | 同上 | 保持默认，未关闭 |
| `CPU Q-Fan Control` | Monitor（2.7.5） | 3-pin 风扇用 `DC Mode`，4-pin 用 `PWM Mode` |
| `Ai Overclock Tuner` | Ai Tweaker → Ai Overclock Tuner（2.5.1） | 先 `Auto`（JEDEC），后改 `X.M.P.` |

空闲读数（`Ai Overclock Tuner = Auto` + XMP 之后日常状态）：

| 项目 | 读数 |
|---|---|
| 核心频率 | 800 MHz（峰值 4699.3 MHz） |
| Core VID | 0.723 V（峰值 1.252 V） |
| Vcore | 0.720 V（峰值 1.248 V） |
| Ring 频率 | 约 4000 MHz |
| 封装温度 | 31 °C（峰值 42 °C） |
| 封装功耗 | 13.9 W（峰值 27.7 W） |
| VCCIN | 1.792 V |

空闲能降到 800 MHz、Vcore 到 0.72 V，说明 EIST 与空闲降压工作正常。这只证明"空闲会掉压"，不能证明 Turbo 目标电压生效——两件事要分开看。

> **【待补图 1】HWiNFO 空闲读数**：核心频率、Core VID、Vcore、封装温度、封装功耗同屏。

## 步骤 1：内存 XMP

| 参数 | 位置 | 本机设置 |
|---|---|---|
| `Ai Overclock Tuner` | Ai Tweaker（2.5.1） | `X.M.P.` |
| `eXtreme Memory Profile` | 同上（2.5.1） | 内存条自带的 2400 档 |
| `DRAM Voltage` | Ai Tweaker → DRAM Voltage（2.5.24） | 手动 `1.55 V`（XMP 标称 1.65 V） |
| `DRAM Command Rate` | Ai Tweaker → DRAM Timing Control（2.5.13） | `Auto`（四条，实际 2T） |
| 主时序 | 同上（2.5.13） | 跟随 XMP，未手动改 |

测试：AIDA64 只勾 `Stress system memory`，运行 `01:02:05`。

| 项目 | 读数 |
|---|---|
| DRAM 设定 / 传感器读数 | 1.55 V / 1.563–1.584 V |
| Vcore 平均 / 最大 | 1.214 / 1.264 V |
| 核心频率 平均 / 最大 | 4460.0 / 4699.3 MHz |
| 封装功耗 平均 / 最大 | 53.0 / 63.2 W |
| 封装温度 平均 / 最大 | 44 / 51 °C |
| CPU 节流 | 0% |
| 结果 | 1 小时通过，`Errors = 0` |

**关键边界：1.50 V 开机直接蓝屏。** 所以 1.55 V 是这套四条内存的下限，不是推荐值——贴着下限没有余量，室温升高或换 BIOS 后可能就不稳。这条只是"通过 1 小时内存负载"的记录，不等于内存永久稳定。

> **【待补图 2】HWiNFO 内存测试读数**：DRAM 电压 1.56 V 左右、封装功耗与温度。
> **【待补图 3】AIDA64 内存测试页**：勾选 `Stress system memory`、`Elapsed 01:02:05`。
> **【待补图 4】CPU-Z 内存 / SPD 页**：频率、时序、命令率、通道与条数。

## 步骤 2：核心 47x 与电压

| 参数 | 位置 | 本机设置 |
|---|---|---|
| `CPU Core Ratio` | Ai Tweaker（2.5.3） | `Sync All Cores` → `47` |
| `CPU Core Voltage` | Ai Tweaker（2.5.17） | `Adaptive Mode`（实机存在，手册核心电压节未收录） |
| `Additional Turbo Mode CPU Core Voltage` | 同上（实机项） | `1.240 V`，另测 `1.200 V` |
| `Offset Mode Sign` / `CPU Core Voltage Offset` | 同上（2.5.17） | 默认，未加偏移 |
| `Total Adaptive Mode CPU Core Voltage` | 同上（实机项） | 默认显示，用来核对是否写入 |
| `CPU Load-line Calibration` | Ai Tweaker → DIGI+ VRM（2.5.14） | `Auto` |
| `CPU Input Voltage`（VCCIN） | Ai Tweaker（2.5.23） | `Auto`（约 1.79–1.81 V） |

两组测试都是 AIDA64 只勾 `Stress CPU`（未勾 FPU），读数几乎完全一致：

| 项目 | 标称 1.20 V | 标称 1.24 V |
|---|---|---|
| Core VID 当前 / 最小 / 最大 | 1.262 / 1.248 / 1.263 V | 1.262 / 1.248 / 1.263 V |
| Vcore 当前 / 最小 / 最大 | 1.264 / 1.248 / 1.280 V | 1.264 / 1.248 / 1.280 V |
| 核心频率 | 4698.8 MHz | 4698.8 MHz |
| 有效频率 | 4700.0 MHz | 4700.0 MHz |
| Ring 频率 | 3999.8 MHz | 3999.8 MHz |
| 封装功耗 平均 / 最大 | 100.7 / 104.5 W | 96.5 / 100.2 W |
| 封装温度 平均 / 最大 | 65 / 73 °C | 66 / 74 °C |
| 最高单核温度 | 73 °C | 73 °C |
| VCCIN | 1.808 V | 1.808 V |
| 测试时长 | 39:12 | 35:29 |

**结论：这两组设定没有改变实际输出电压。** VID 与 Vcore 完全相同，频率相同，温度差在噪声范围内；标称 1.20 V 那轮功耗反而高约 4 W，方向与"降了 40 mV"相反。原因是这颗 CPU 在 47x 下的原生 VID 就是 1.262 V，低于它的 Adaptive 目标没有落地。所以只能说"BIOS 目标 1.24 V"，不能写成"运行在 1.24 V"。

这条与[电压与供电](/principles/02-voltage)的说法一致：官方没有承诺 Adaptive 能低于 VID，判断要看 Vcore 读数，不是 BIOS 里的数字。

> **【待补图 5】HWiNFO 满载读数**：Core VID、Vcore、核心频率、封装温度、封装功耗同屏（1.24 V 与 1.20 V 各一张）。
> **【待补图 6】AIDA64 稳定性测试页**：勾选 `Stress CPU`、Elapsed、温度曲线、`CPU Throttling`。
> **【待补图 7】BIOS Ai Tweaker 主界面**：`CPU Core Ratio`、`CPU Core Voltage`、`DRAM Voltage` 同屏。

## 步骤 3：缓存 / Ring

| 参数 | 位置 | 本机设置 |
|---|---|---|
| `Min./Max. CPU Cache Ratio` | Ai Tweaker（2.5.4 / 2.5.5） | `40`（4000 MHz） |
| `CPU Cache Voltage` | Ai Tweaker（2.5.18） | `Auto` |

实测 Ring 频率 3999.8 MHz，与 40x 一致。**没有单独跑 `Stress cache`**，所以这一项只有频率记录，没有稳定性结论；按指导，缓存要单独验证，这一步算未完成。

> **【待补图 8】AIDA64 缓存测试页**：勾选 `Stress cache`、`Elapsed`、温度曲线。

## 步骤 4：核显

核显 HD Graphics 4600 未超频，`Max. CPU Graphics Ratio` 与 `CPU Graphics Voltage` 都是默认。

| 项目 | 状态 |
|---|---|
| 核显超频 | 未测试 |
| 核显负载测试 | 未测试 |

## 步骤 5：组合验证与真实应用

| 项目 | 状态 |
|---|---|
| AIDA64 CPU + FPU + cache + system memory 组合负载 | 未测试 |
| 冷启动、睡眠唤醒 | 未测试 |
| 真实应用（游戏 / 渲染 / 编译） | 未测试 |

这是本案例最大的缺口：两组 CPU 测试都只勾了 `Stress CPU`（约 100 W），内存测试也只覆盖内存；组合负载与真实应用都还没做，所以结论只能停在"单项通过"。

## 步骤 6：降压

旧记录里没有真正跑通降压，只验证到"低于 VID 的 Adaptive 目标没有生效"。

| 项目 | 状态 | 下一步 |
|---|---|---|
| `Manual Mode` 固定 1.20 V 验证 | 未测试 | 按指导用 Manual 同频降压，确认 Vcore 是否真的到 1.20 V |
| `Offset Mode` + `Sign [–]` | 未测试 | Manual 确认下限后，再用负偏移做成日常自动降压 |
| 缓存 / 内存降压 | 未测试 | 核心稳定后按核心 → 缓存 → 内存的顺序逐档试 |

## 关键发现与踩坑

- **Adaptive 低于 VID 不等于降压**：两组 VID / Vcore 完全相同，实测仍在 1.262 / 1.264 V，"1.20 V 跑了 39 分钟"实际是在 1.26 V 下跑的。
- **只看 VID 会误判**：这个平台默认状态两者几乎重合，必须看 Vcore。
- **内存贴着下限**：1.50 V 开机蓝屏，1.55 V 过一小时测试，日常建议留余量并复核冷启动与真实应用。
- **负载覆盖不足**：只跑 `Stress CPU` 不能代表 FPU / AVX 与组合负载，结论有边界。
- **PL1 / PL2 显示 4.0959 W** 是本机 HWiNFO 的显示缩放问题，不是真实限制。

## 待补截图清单

| 编号 | 截图 | 需要拍到什么 |
|---|---|---|
| 1 | HWiNFO 空闲 | 核心频率、Core VID、Vcore、封装温度、封装功耗 |
| 2 | HWiNFO 内存测试 | DRAM 电压、封装功耗、封装温度 |
| 3 | AIDA64 内存测试 | `Stress system memory`、`Elapsed 01:02:05` |
| 4 | CPU-Z 内存 / SPD | 内存频率、时序、命令率、通道、条数 |
| 5 | HWiNFO 满载 ×2 | 1.24 V 与 1.20 V 各一张，读数同屏 |
| 6 | AIDA64 稳定性测试 | 勾选项、Elapsed、温度曲线、`CPU Throttling` |
| 7 | BIOS Ai Tweaker 主界面 | 倍频、核心电压、DRAM 电压 |
| 8 | AIDA64 缓存测试 | `Stress cache`、Elapsed、温度曲线 |

## 来源

| 结论 / 数据 | 来源 | 说明 |
|---|---|---|
| 全部实测读数 | 投稿人本机 HWiNFO / AIDA64 截图 | `[本机]` |
| BIOS 参数位置与范围 | ASUS Z97-AR 用户手册（E9367） | 2.5.1 / 2.5.3 / 2.5.4–2.5.5 / 2.5.13 / 2.5.14 / 2.5.15 / 2.5.17 / 2.5.18 / 2.5.23 / 2.5.24 / 2.7.5 |
| 4790K 规格 | Intel ARK | Core i7-4790K |
| Adaptive 不改变实际电压 | 本案例两组对照读数 + [电压与供电](/principles/02-voltage) | — |
| 内存下限 1.55 V | 本机 1.50 V 蓝屏、1.55 V 过一小时 | `[本机]` |
