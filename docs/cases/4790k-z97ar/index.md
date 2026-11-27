---
title: i7-4790K + Z97-AR
---

# i7-4790K + Z97-AR

这是「超友案例」里第一个平台分组。同一个 CPU + 主板的所有案例都挂在这一页下面，动手之前先读[超频指导](/cases/4790k-z97ar/guide)。

## 平台规格

| 项目 | 规格 |
|---|---|
| CPU | Intel Core i7-4790K，4 核 8 线程，4.00 GHz 基准 / 4.40 GHz 睿频，8 MB 缓存，88 W，Tjmax 100 °C `[Intel]` |
| 主板 | ASUS Z97-AR，Intel Z97 芯片组，LGA1150 |
| 内存 | DDR3，双通道，四条插槽（可用 CPU-Z 的 SPD 页逐槽核对） |
| 供电架构 | FIVR：主板送 VCCIN，核心电压由片内调压器生成，见[电压与供电](/principles/02-voltage) `[官方页]` |
| 核显 | Intel HD Graphics 4600（无独显时使用） |

## 这个平台要注意什么

- **核心电压只有三种模式**：Z97-AR 手册 2-29 列出的 CPU Core Voltage 是 `Auto` / `Manual Mode` / `Offset Mode`；手册里的 Adaptive 与 `Additional Turbo` 属于**核显电压**（2-31），不要和核心电压混在一起 `[手册]`。
- **VCCIN 是独立一层**：这一代核心电压由片内调压器生成，LLC 通常作用在 VCCIN 一侧，对 Vcore 只是间接影响，详见[电压与供电](/principles/02-voltage)。
- **四条 DDR3 更难稳**：满插时内存控制器压力更大，XMP 档位不一定能直接跑稳，需要按内存测试的结果判断。
- **Tjmax 100 °C**：核心温度接近它就会触发降频，判断散热够不够看的是距 Tjmax 的余量，不是"摸着烫不烫" `[Intel]`。

## 超频指导

顺序、每一步怎么调、没通过怎么办、温度与电压异常怎么处理，都写在独立页里：

| 页面 | 内容 |
|---|---|
| [超频指导：i7-4790K + Z97-AR](/cases/4790k-z97ar/guide) | 基线 → 内存 → 核心 → 缓存 → 核显 → 组合 → 收敛，共 7 步 |

## 案例

| 案例 | 配置摘要 | 结果 | 状态 |
|---|---|---|---|
| 暂无 | — | — | 等第一个真实投稿 |

这一组还没有案例。想投稿的话，准备平台信息、BIOS 改动、测试记录与截图即可；没有实测数据的部分写"未测试"，不要留空。

## 来源

| 结论 | 来源 | 位置 |
|---|---|---|
| 4790K 核心/线程、频率、缓存、TDP、Tjmax | Intel ARK 产品页 | Core i7-4790K |
| CPU Core Voltage 三种模式 | ASUS Z97-AR 用户手册 | 2-29 |
| 核显 Adaptive / Additional Turbo | ASUS Z97-AR 用户手册 | 2-31 |
| FIVR 与 VCCIN 关系 | 站内[电压与供电](/principles/02-voltage) | 两种架构一节 |
| 内存满插的压力 | 站内[内存与 XMP](/principles/03-memory) | 四条为什么难 |
