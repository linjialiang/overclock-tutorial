---
title: MemTest86+
---

# MemTest86+

MemTest86+ 是一个独立启动的内存测试程序：它不依赖 Windows，直接接管整台机器去读写内存，因此能测到操作系统占用的那部分内存。它回答的是**内存（含内存控制器与内存通道）在持续读写下会不会出错**，不回答 CPU 电压、缓存倍频这类问题。

本文所有结论以官方站点 [memtest.org](https://www.memtest.org/) 与官方 README 为准 `[官方页]`。

## 先分清两个同名软件

| | MemTest86+ | MemTest86（PassMark） |
|---|---|---|
| 来源 | memtest.org，开源 | PassMark Software，闭源 Freemium |
| 授权 | GPL v2 | 商业授权，分免费版与付费版 |
| 关系 | 独立项目 | 2013 年起与前者无关 |

官方 README 明确写了这一句：Memtest86+ **不是** MemTest86 的一个版本，后者自 2013 年起是 PassMark 的闭源 Freemium 软件 `[官方页]`。两者的界面、选项、默认行为都不一样，网上教程经常混用。

## 下载与启动介质

当前版本 v9.00，支持 x86（32 位）、x86-64、ARM64 与 LoongArch64 `[官方页]`。

官方提供三种安装方式，Windows 用户用第一种最省事 `[官方页]`：

1. 准备一个 **FAT32** 格式的 U 盘（会被写入，先备份数据）；
2. 下载并运行官方 **Windows USB Installer**，按提示写入；
3. 重启，在开机启动菜单里选择这个 U 盘。

也可以下载 ISO 直接写盘，或在 Linux 下用 `dd` 写入；ISO 必须**原样写入设备**，不能解压后拷文件 `[官方页]`。写入后 U 盘里的数据会被覆盖。

::: tip Secure Boot
从 v9.00 起，MemTest86+ 的 EFI 镜像用 MemTest86+ 自己的 Secure Boot 密钥签名。要在开启 Secure Boot 的机器上启动，需要先把 MemTest86+ 的根 CA 证书导入固件 `db`；官方正在做由 Microsoft 签名的 shim，之后可以免手动导入 `[官方页]`。不导入也能用，但要先在固件里临时关闭 Secure Boot。
:::

## 界面与关键读数

![MemTest86+ v9.00 运行界面：左上为 CPU 频率/温度、各级缓存速度与内存带宽，右上为整体进度、当前测试项与测试范围，左下为内存 SPD 信息，底部为快捷键提示。截图取自 memtest.org 官方截图（assets/media/screenshots/mt86plus-01.png）](/tools/memtest86plus/interface.png)

上图为官方站点的界面截图（i9-13900K + 4×16 GB DDR5-6400 平台，Pass 0、正在跑第 45% 的 Test 5）`[官方页]`。

| 位置 | 读数 | 怎么看 |
|---|---|---|
| 左上 | `CLK / Temp` | 当前主频与 CPU 温度；温度异常高说明散热或风扇有问题 |
| 左上 | `L1/L2/L3 Cache`、`Memory` | 各级缓存与内存的实测带宽，用于确认内存频率有没有跑在预期档位 |
| 右上 | `Pass` | 已完成轮次；正在跑第几轮就看这个 |
| 右上 | `Test` | 当前测试项编号与百分比，括号内是该测试的算法说明 |
| 右上 | `Testing` | 本次测试覆盖的地址范围与总量 |
| 中右 | `Time`、`Status`、`Pass`、`Errors` | **最关键的一行**：耗时、状态、轮次、错误数 |
| 左下 | `Memory SPD Information` | 每个插槽的容量、标称频率、XMP/EXPO 与型号、周期，用来核对条子是否被正确识别 |
| 底部 | 快捷键 | `<ESC> Exit`、`<F1> Configuration`、`<Space> Scroll Lock` |

## 操作步骤

1. 用 U 盘启动后，程序会先初始化显示，**暂停几秒**等按键；不按任何键就开始默认测试 `[官方页]`。
2. 想改设置就按 `F1` 进配置菜单，可改：跑哪些测试、地址范围、CPU 顺序模式、错误报告模式、用哪几个核心 `[官方页]`。
3. 默认配置已经够用：**除 Test 1 与 Test 11 之外的全部测试**、SMP 可用时启用、CPU 顺序模式为 parallel `[官方页]`。
4. 测试期间不要再动键盘鼠标，让它自己跑；按 `Space` 可以锁定滚动，避免错误信息刷屏 `[官方页]`。
5. 想保存结果：按 `F6` 把完整报告（系统信息、内存模组、测试结果）写到 FAT32 U 盘，每份报告自动编号，不会覆盖上一份 `[官方页]`。
6. 结束时按 `Esc`，程序退出并重启机器 `[官方页]`。

## 结果判读

| 现象 | 判断 | 下一步 |
|---|---|---|
| `Errors: 0` 且跑完至少一轮 | 本轮没测出错误 | 想要更高把握就继续跑；怀疑间歇性故障要延长 |
| `Errors` 大于 0 | 内存链路出错 | 先回默认频率/关闭 XMP 复测，确认是超频还是硬件 |
| 一开始就大量报错 | 更像内存条、插槽或接触问题 | 单条单槽逐根排查，再清金手指 |
| 报错地址集中在同一段 | 更像某根条或某个通道 | 按 SPD 页的插槽信息对调验证 |
| 温度很高或频率异常低 | 散热/供电问题，不是内存问题 | 先解决散热，再看结果 |

两个容易搞错的点：

- **它不会自己停。** 默认行为是持续运行，直到你重启或关机 `[官方页]`；不存在"跑满 N 轮自动结束"。
- **跑几轮没有硬性规定。** 官方原话是：完整一轮所需时间取决于 CPU 速度、内存速度与容量；MemTest86+ 会无限运行，**一般情况下单轮就足以发现除最隐蔽之外的所有错误，怀疑间歇性错误时建议延长测试时间** `[官方页]`。网上"必须跑满 4 轮"的说法不是官方要求，只能当经验参考 `[经验]`。

## 常见误区

| 说法 | 事实 |
|---|---|
| "MemTest86+ 就是 MemTest86 的免费版" | 两个独立项目，后者闭源且分免费/付费版 `[官方页]` |
| "跑完 4 轮会自动退出" | 不会自动退出，需要手动 `Esc` `[官方页]` |
| "没报错就绝对没问题" | Rowhammer 这类对抗性测试的错误不计入 BadRAM 统计，DDR5/ECC 的 on-die ECC 还可能静默纠正单比特翻转，所以"没报错"不等于免疫 `[官方页]` |
| "内存测试通过就不用管稳定性了" | 内存只是其中一项，还要看 CPU/FPU 与组合负载，见[稳定性验证](/principles/08-stability) |

先在一台机器上用内存测试确认内存本身没问题，再去超 CPU，能把变量分开。原理部分见[内存与 XMP](/principles/03-memory)。

## 来源

| 结论 | 来源 | 位置 | 核对日期 |
|---|---|---|---|
| 开源、GPL v2、独立于 PassMark MemTest86 | memtest.org 官方 README | Licensing | 2026-11 |
| v9.00、支持 x86/x86-64/ARM64/LoongArch64 | memtest.org 首页与 README | 首页版本说明、README 开头 | 2026-11 |
| 默认跑除 Test 1/Test 11 外的测试、SMP、parallel、无限运行 | memtest.org 官方 README | Operation | 2026-11 |
| 启动/配置/退出快捷键 | memtest.org 官方 README | Operation | 2026-11 |
| 单轮通常足够、怀疑间歇性错误需延长 | memtest.org 官方 README | Execution Time | 2026-11 |
| F6 保存报告到 FAT32 U 盘 | memtest.org 首页 | Save Report to USB Drive（v9 新功能） | 2026-11 |
| Secure Boot 根 CA 与 shim | memtest.org 官方 README | Secure Boot | 2026-11 |
| U 盘安装流程与 ISO 原样写入 | memtest.org 首页 FAQ / README | Installation on Removable Media | 2026-11 |
| Rowhammer 错误不计入 BadRAM、on-die ECC 可能静默纠正 | memtest.org 官方 README | Individual Test Descriptions（Test 11） | 2026-11 |
| 界面截图 | memtest.org 官方截图 | `assets/media/screenshots/mt86plus-01.png` | 2026-11 |
