---
title: 术语表
---

# 术语表

按主题分组，后面标了详细章节。读到不认识的词，先来这里查。

## 频率与核心

| 术语 | 含义 | 详见 |
|---|---|---|
| BCLK | 基准时钟，通常 100 MHz | [频率与倍频](/principles/01-frequency) |
| 倍频 | 频率 = BCLK × 倍频 | [频率与倍频](/principles/01-frequency) |
| Turbo | 官方自动加速，按活跃核心数分档 | [频率与倍频](/principles/01-frequency) |
| Turbo 分档（Turbo bin） | 活跃核心数与可用倍频的默认对应表；解锁平台可逐档覆盖 | [频率与倍频](/principles/01-frequency) |
| 全核同频 | 所有核心锁在同一个倍频上 | [频率与倍频](/principles/01-frequency) |

## 电压与供电

| 术语 | 含义 | 详见 |
|---|---|---|
| VID | CPU 按倍频/负载请求的电压 | [电压与供电](/principles/02-voltage) |
| Vcore | 实际加到核心上的电压 | [电压与供电](/principles/02-voltage) |
| VCCIN | 主板送给 CPU 的输入电压 | [电压与供电](/principles/02-voltage) |
| FIVR | Haswell 架构引入的片上调压器 | [电压与供电](/principles/02-voltage) |
| LLC | 负载线补偿，减少满载掉压 | [电压与供电](/principles/02-voltage) |
| SVID | CPU 与外部 VRM 之间的电压请求/反馈接口 | [电压与供电](/principles/02-voltage) |
| PL1 / PL2 | 长时间 / 短时间功耗上限（Intel 平台） | [电压与供电](/principles/02-voltage) |
| Tjmax | 结温上限；同一 SKU 固定，跨平台不同（如 Intel 4th Gen 约 100 °C、AMD Ryzen 7000 为 95 °C） | [电压与供电](/principles/02-voltage) |
| TCC | 热控制电路：接近 Tjmax 时降频/降电压的机制，不是温度点 | [电压与供电](/principles/02-voltage) |

## 内存

| 术语 | 含义 | 详见 |
|---|---|---|
| IMC | CPU 内的内存控制器 | [内存与 XMP](/principles/03-memory) |
| SPD | 内存条上记录参数的小芯片 | [内存与 XMP](/principles/03-memory) |
| JEDEC | 内存的默认标准档 | [内存与 XMP](/principles/03-memory) |
| XMP | Intel 的内存超频档：DDR3 时代 XMP、XMP 2.0（DDR4）、XMP 3.0（DDR5） | [内存与 XMP](/principles/03-memory) |
| EXPO | AMD 的 DDR5 内存超频档（Socket AM5） | [内存与 XMP](/principles/03-memory) |
| QVL | 主板厂商验证过的内存兼容列表 | [内存与 XMP](/principles/03-memory) |
| VCCSA / VCCIO | CPU 系统代理 / IO 电压，影响 IMC 与高频内存（Intel 平台） | [内存与 XMP](/principles/03-memory) |

## 缓存与稳定性

| 术语 | 含义 | 详见 |
|---|---|---|
| Ring / Cache | 环形总线及其频率，即 Cache Ratio | [缓存与 Ring](/principles/04-cache) |
| WHEA | Windows 的硬件错误上报机制 | [稳定性验证](/principles/08-stability) |
| Vdroop | 负载升高时的电压跌落 | [电压与供电](/principles/02-voltage) |
| 体质 | 同一频率所需电压的高低 | [调参与体质](/principles/09-tuning) |
