# overclock-tutorial

面向新手的超频教程，使用 VitePress 构建，默认主题样式。

## 内容结构

- **超频概述**：一章讲清楚超频在超什么、代价是什么、怎么读这份教程。
- **超频原理**：按频率、电压、内存、缓存、核显、主板、电源散热、稳定性、调参分成 9 章。
- **超友案例**：一位超友一章；第一篇是投稿模板与资源要求。

## 本地开发

```bash
npm install
npm run docs:dev
```

构建与预览：

```bash
npm run docs:build
npm run docs:preview
```

## 目录

```text
docs/
├─ .vitepress/config.mts
├─ index.md
├─ overview.md
├─ principles/
├─ cases/
└─ public/
```
