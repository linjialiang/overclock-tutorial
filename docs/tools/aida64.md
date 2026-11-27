---
title: AIDA64
---

# AIDA64

AIDA64 的 **System Stability Test**（系统稳定性测试）是这份教程里最常用的 CPU 压力测试工具：勾选不同负载、看实时曲线、结束后看统计。它回答的是**在持续负载下，温度、电压、功耗、频率能不能守住**；内存有没有算错，要靠 [TestMem5](/tools/testmem5) 或 [MemTest86+](/tools/memtest86plus)。

本文结论以 AIDA64 官方手册的 System Stability Test 章节与官方产品页为准 `[官方页]`。

## 下载与版本

- 官方站点 `aida64.com`，提供试用版下载；该功能在 **AIDA64 Extreme / Business / Engineer** 三个版本中都包含 `[官方页]`。
- 本文截图来自 AIDA64 Engineer v8.35.8400 `[本机]`，不同版本界面布局基本一致，标签数量可能略有差别。

## 界面与关键读数

![AIDA64 系统稳定性测试窗口：左上为六个负载勾选项，中间为启动/停止日志，下方为温度曲线与 CPU 使用率曲线，底部为 Start/Stop/Clear/Save/Preferences 与已运行时间](/tools/aida64/stability-test.png)

| 位置 | 内容 | 怎么看 |
|---|---|---|
| 左上 | `Stress CPU`、`Stress FPU`、`Stress cache`、`Stress system memory`、`Stress local disks`、`Stress GPU(s)` | 勾哪几项决定压哪个部件，可组合 |
| 中上 | `Date / Time`、`Status` | 每次开始/停止都记一行，用来确认测试真的跑起来了 |
| 标签页 | `Temperatures`、`Cooling Fans`、`Voltages`、`Currents`、`Powers`、`Clocks`、`Unified`、`Statistics` | 官方手册点名的是前四个与 Statistics，其余是本版界面里实际存在的标签 `[官方页]` |
| 曲线区 | 温度曲线 + `CPU Usage / CPU Throttling` 曲线 | 看温度是否饱和、有没有出现节流 |
| 底部 | `Start / Stop`、`Clear`、`Save`、`CPUID`、`Preferences`、`Elapsed Time` | `Save` 存报告，`Elapsed Time` 是本次时长 |

`Statistics` 标签给出所有被监控参数的**最小值、最大值、平均值**，以及测试时长与电池状态 `[官方页]`。判断"稳不稳"，看的是这张表，不是某一瞬间的截图。

### 每个标签看什么

下表行名取自本机 v8.35 的实际界面 `[本机]`，不同平台与版本会增减个别行：

| 标签 | 本机可见的行 | 主要用途 |
|---|---|---|
| `Temperatures` | `Motherboard`、`CPU`、`CPU Core #1`~`#4`、`HDD #1` | 温度与核心间温差 |
| `Cooling Fans` | `CPU`、`Chassis #1` | 转速是否随负载上升 |
| `Voltages` | `CPU Core`、`+3.3 V`、`+5 V`、`+12 V` | Vcore 与电源各路电压 |
| `Currents` | `CPU` | 电流读数 |
| `Powers` | `CPU`、`CPU Package`、`CPU IA Cores`、`CPU GT Cores` | 判断有没有撞功耗墙 |
| `Clocks` | `CPU Clock`、`North Bridge Clock`、`Memory Clock`、`CPU Core #1`~`#4 Clock` | 频率与 Ring/内存频率 |
| `Unified` | 上述多类混在一张图 | 一屏对照温度、功耗、频率 |
| `Statistics` | `Item` / `Current` / `Minimum` / `Maximum` / `Average` | 测试结束后看统计 |

### 结束看 Statistics

![AIDA64 Statistics 标签：Item 列按 Temperatures、Cooling Fans、Voltages、Currents 分组，右侧四列为 Current、Minimum、Maximum、Average](/tools/aida64/statistics.png)

上图是本机**空闲状态**下的统计页，数值本身没有参考意义，要看的是表的结构：每一行一个传感器，四列分别是当前值、最小值、最大值、平均值。

判读时重点看 **`Maximum`**（测试期间的峰值）与 **`Average`**（长期水平）；`Current` 只是一瞬间的读数，单独截一张说明不了问题。这也是本站强调"截图要连统计页一起截"的原因。

## 勾选建议

官方手册给了两条关键判断 `[官方页]`：

> 同时启用 CPU、FPU、cache 三项，构成一次完整的 CPU 压力测试，等于对整个处理器施压。
>
> 如果目标是最大化功耗与发热，只勾 FPU——它给处理器最高负载，也最容易把处理器逼到极限。

| 目的 | 勾选 | 说明 |
|---|---|---|
| 完整 CPU 压力测试 | CPU + FPU + cache | 官方定义的"comprehensive CPU stress test" `[官方页]` |
| 只看散热极限 | 仅 FPU | 官方说明这是功耗与发热最高的组合 `[官方页]` |
| 验内存 | system memory | 与 [TestMem5](/tools/testmem5) 互补，不替代 |
| 验整机功耗与电源 | CPU/FPU + GPU 同时 | 官方提醒这类组合会显著抬高整机功耗，压力会转移到电源上 `[官方页]` |

官方还特别提醒：某些组合（尤其 FPU + GPU）会明显提高整机功耗，**稳定性问题不一定能归到某一个部件**——电源不够稳同样会导致测试失败 `[官方页]`。

## 操作步骤

1. 双击打开 AIDA64，菜单里进入 `工具` → `系统稳定性测试`（System Stability Test）。
2. 按上表勾选负载；只勾需要的那几项，不要一上来全勾。
3. 点 `Start`，观察曲线 3~5 分钟，确认温度在上升但未触顶、频率没有掉。
4. 测试中可以随时增删某一项负载，不需要重启测试 `[官方页]`。
5. 跑够时长后点 `Stop`，切到 `Statistics` 看最小值/最大值/平均值，再点 `Save` 存报告。
6. 需要复现时，用 `Preferences` 检查温度单位、图表刷新等设置是否与上次一致。

::: warning 官方使用警告
AIDA64 手册明确写着：稳定性测试会给硬件带来明显压力，**建议只用于排障，不要当作日常监控手段** `[官方页]`。它是诊断工具，不是"每天跑一跑更健康"的东西。
:::

## 结果判读

| 现象 | 判断 | 下一步 |
|---|---|---|
| 温度到平台上限并稳定，频率不掉 | 散热够用 | 记下最高温度，继续加时长或换组合 |
| `CPU Throttling` 出现非 0 | 触发了热保护或功耗限制 | 先查散热与功耗墙，不要继续加电压 |
| 频率周期性下降 | 撞到功耗墙/电流墙 | 对照 [电压与供电](/principles/02-voltage) 的三道墙 |
| 测试中蓝屏或程序无响应 | 不稳 | 回默认频率复测，确认是超频还是硬件 |
| `Statistics` 里最高温度离上限很远、频率也稳 | 这套设置还有余量 | 可以继续试探，但别跳过真实应用验证 |

组合负载通过不等于日常稳定：烤机是恒定负载，日常是不断切换负载。因此 AIDA64 跑完还要看真实应用、冷启动与 WHEA，方法见[稳定性验证](/principles/08-stability)。

## 来源

| 结论 | 来源 | 位置 | 核对日期 |
|---|---|---|---|
| 六个负载选项与"三项构成完整 CPU 压力测试" | AIDA64 官方手册 | System Stability Test → How To Use | 2026-11 |
| 只勾 FPU 时功耗与发热最高 | AIDA64 官方手册 | System Stability Test → How To Use | 2026-11 |
| 测试中可随时增删负载 | AIDA64 官方手册 | Granular Control and Monitoring | 2026-11 |
| 启动/停止日志、曲线、四个监控标签 | AIDA64 官方手册 | Real-Time Insights / Detailed Monitoring | 2026-11 |
| Statistics 提供最小/最大/平均、时长、电池状态 | AIDA64 官方手册 | Comprehensive Results | 2026-11 |
| 仅建议用于排障，不作日常监控 | AIDA64 官方手册 | 章节结尾提示 | 2026-11 |
| 功能包含于 Extreme / Business / Engineer | AIDA64 官方手册 | Available in the following products | 2026-11 |
| 界面截图 | 本机截图，AIDA64 Engineer v8.35.8400 | 稳定性测试主窗口 / Statistics 页 | 2026-11 |
| 各标签行名 | 本机截图，AIDA64 Engineer v8.35.8400 | Cooling Fans / Voltages / Currents / Powers / Clocks / Unified | 2026-11 |
