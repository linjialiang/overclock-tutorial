import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '新手超频指南',
  description: '面向新手的超频教程：先看懂原理，再看超友案例。',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '超频概述', link: '/overview' },
      { text: '超频原理', link: '/principles/' },
      { text: '烤机工具', link: '/tools/' },
      { text: '超友案例', link: '/cases/' }
    ],
    sidebar: {
      '/principles/': [
        {
          text: '超频原理',
          items: [
            { text: '章节导读', link: '/principles/' },
            { text: '01 频率与倍频', link: '/principles/01-frequency' },
            { text: '02 电压与供电', link: '/principles/02-voltage' },
            { text: '03 内存与 XMP', link: '/principles/03-memory' },
            { text: '04 缓存与 Ring', link: '/principles/04-cache' },
            { text: '05 集成显卡', link: '/principles/05-igpu' },
            { text: '06 主板与芯片组', link: '/principles/06-motherboard' },
            { text: '07 电源与散热', link: '/principles/07-power-cooling' },
            { text: '08 稳定性验证', link: '/principles/08-stability' },
            { text: '09 调参与体质', link: '/principles/09-tuning' },
            { text: '术语表', link: '/principles/glossary' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '烤机工具',
          items: [
            { text: '工具导读', link: '/tools/' },
            { text: 'AIDA64', link: '/tools/aida64' },
            { text: 'CPU-Z', link: '/tools/cpuz' },
            { text: 'HWiNFO', link: '/tools/hwinfo' },
            { text: 'TestMem5', link: '/tools/testmem5' },
            { text: 'MemTest86+', link: '/tools/memtest86plus' }
          ]
        }
      ],
      '/cases/': [
        {
          text: '超友案例',
          items: [
            { text: '案例区说明', link: '/cases/' },
            {
              text: 'i7-4790K + Z97-AR',
              collapsed: false,
              items: [
                { text: '超频指导', link: '/cases/4790k-z97ar/guide' },
                { text: '平台与案例', link: '/cases/4790k-z97ar/' },
                { text: '案例 01：日常 47x', link: '/cases/4790k-z97ar/case-01-daily-47x' }
              ]
            }
          ]
        }
      ],
      '/': [
        {
          text: '开始阅读',
          items: [
            { text: '超频概述', link: '/overview' },
            { text: '超频原理', link: '/principles/' },
            { text: '烤机工具', link: '/tools/' },
            { text: '超友案例', link: '/cases/' }
          ]
        }
      ]
    },
    outline: { level: [2, 3], label: '本页目录' },
    search: { provider: 'local' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    lastUpdated: { text: '最后更新' }
  }
})
