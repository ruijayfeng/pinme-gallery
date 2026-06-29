# PinMe 展示站设计方案

> **项目名称：** PinMe Gallery（PinMe 画廊）
> **定位：** 展示一时兴起用 PinMe 部署的各种页面
> **风格：** Taste Skill (soft-skill) + GSAP Skills
> **创建时间：** 2026-06-29

---

## 📌 项目概述

### 定位

这是一个展示"一时兴起用 PinMe 部署的各种页面"的站点，不是项目展示站，而是**个人创意画廊**。

### 核心理念

- **一时兴起** — 随性、灵动、有趣
- **各种页面** — 多样性、创意性
- **优雅优美** — 对标顶级设计
- **艺术感** — 像走进一间安静的画廊

### 设计哲学

采用 **Anti-Slop 设计**（反对平庸、反对套路），每个细节都拒绝平庸。

---

## 🎨 设计方案

### 设计风格：Taste Skill (soft-skill) + GSAP Skills

**核心特点：**
- ✅ 高端视觉设计，优雅优美
- ✅ 柔和对比，不刺眼
- ✅ 大量留白，呼吸感强
- ✅ 高级字体，品质感强
- ✅ 弹性动画，交互体验好
- ✅ Anti-Slop 设计，拒绝平庸

### 设计调性

```
基调：柔和暖白背景 + 极少量高级深色文字
字体：衬线标题（Playfair Display）+ 无衬线正文（Inter）
色彩：大面积留白 + 1-2 个点缀色（柔和、不饱和）
动画：弹性入场、滚动视差、卡片翻转、文字逐字展开
整体感：像走进一间安静的画廊，每个页面都是一幅画
```

### 颜色系统

```css
:root {
  /* 主色调 */
  --color-primary: #1a1a1a;      /* 深黑 */
  --color-secondary: #666666;    /* 中灰 */
  --color-accent: #0071e3;       /* Apple 蓝 */
  
  /* 背景色 */
  --color-bg: #ffffff;           /* 纯白 */
  --color-bg-secondary: #f5f5f7; /* 浅灰 */
  
  /* 文字色 */
  --color-text: #1a1a1a;         /* 深黑 */
  --color-text-secondary: #666666; /* 中灰 */
}
```

### 字体系统

```css
:root {
  /* 衬线标题 */
  --font-serif: "Playfair Display", "Georgia", serif;
  
  /* 无衬线正文 */
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* 等宽字体 */
  --font-mono: "JetBrains Mono", "SF Mono", monospace;
}
```

### 间距系统

```css
:root {
  /* 间距 */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
}
```

### 动画系统（GSAP）

```javascript
// 时间轴动画
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2" } });
tl.to(".card", { y: 0, opacity: 1 })
  .to(".title", { y: 0, opacity: 1 }, "-=0.3")
  .to(".description", { y: 0, opacity: 1 }, "-=0.2");

// 滚动驱动动画
gsap.to(".card", {
  scrollTrigger: {
    trigger: ".card",
    start: "top center",
    end: "bottom center",
    scrub: true
  },
  y: 0,
  opacity: 1
});

// SplitText 文字动画
const split = new SplitText(".title", { type: "chars" });
gsap.from(split.chars, {
  duration: 0.6,
  y: 50,
  opacity: 0,
  stagger: 0.02,
  ease: "power2.out"
});
```

---

## 📐 页面结构

### 首页 (/)

```
Header（简洁导航）
├── Logo/站点名称
├── 筛选标签（全部、最近、分类）
└── 搜索框

Hero 区域
├── 标题（SplitText 逐字动画）
├── 副标题
└── 简短介绍

项目网格（bento-grid 布局）
├── 卡片设计
│   ├── 截图/预览图
│   ├── 项目名称
│   ├── 简短描述
│   ├── 技术栈标签
│   ├── 创建时间
│   └── 部署链接按钮
└── 悬停效果（弹性动画）

Footer（简洁页脚）
```

### 项目详情 (/projects/:slug)

```
Header（简洁导航）

项目详情
├── 项目名称（SplitText 逐字动画）
├── 简短描述
├── 技术栈标签
├── 创建时间
├── 部署链接按钮
├── GitHub 仓库（如有）
└── 截图/预览图

相关项目（推荐）

Footer（简洁页脚）
```

---

## 🛠️ 技术栈

| 组件 | 选择 | 原因 |
|------|------|------|
| 设计 Skill | Taste Skill (soft-skill) | 高端视觉设计，优雅优美 |
| 动画引擎 | GSAP Skills | 专业级动画，时间轴、滚动驱动 |
| 框架 | Astro | 快速、静态生成、Markdown 支持 |
| 样式 | 手写 CSS | 精细控制，优雅实现 |
| 字体 | Playfair Display + Inter | 优雅 + 可读性 |
| 动画 | GSAP + ScrollTrigger + SplitText | 专业级动画效果 |
| 部署 | Vercel | 你已有账号 |
| 图标 | Lucide | 简洁现代 |

---

## 🎯 功能规划

### 核心功能

1. **项目展示** — 展示所有 PinMe 部署的页面
2. **分类筛选** — 按技术栈、时间、类型筛选
3. **搜索功能** — 搜索项目名称、描述
4. **项目详情** — 查看项目详细信息
5. **响应式设计** — 适配各种设备

### 扩展功能

1. **暗色模式** — 支持暗色主题
2. **动画效果** — 精致的微动画
3. **分享功能** — 分享项目链接
4. **统计功能** — 展示项目数量、技术栈统计

---

## 📊 数据结构

### 项目数据

```yaml
---
title: "项目名称"
description: "项目简短描述"
tech_stack: ["HTML", "CSS", "JavaScript"]
pinme_url: "https://xxx.pinme.dev"
github_url: "https://github.com/xxx"  # 可选
created_at: "2026-06-29"
category: "web"  # web, tool, game, etc.
tags: ["前端", "动画", "实验"]
screenshot: "screenshot.png"  # 截图文件名
---
```

### 数据存储

```
/content/projects/
├── 2026-06-29_project-1.md
├── 2026-06-29_project-2.md
└── 2026-06-30_project-3.md
```

---

## 🎨 设计细节

### 卡片设计

```css
.card {
  background: var(--color-bg);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 24px;
}

.card-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.card-description {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.card-tag {
  background: var(--color-bg-secondary);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.card-link {
  display: inline-block;
  background: var(--color-accent);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  text-decoration: none;
  transition: background 0.2s ease;
}

.card-link:hover {
  background: #0077ed;
}
```

### Hero 区域

```css
.hero {
  padding: 120px 0 80px;
  text-align: center;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.1;
}

.hero-subtitle {
  font-family: var(--font-sans);
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto 40px;
}
```

### 网格布局

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  padding: 0 24px;
  max-width: 1200px;
  margin: 0 auto;
}
```

---

## 🎬 动画效果

### 页面加载动画

```javascript
// 页面加载动画
const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

tl.from(".hero-title", {
  duration: 1,
  y: 50,
  opacity: 0
})
.from(".hero-subtitle", {
  duration: 0.8,
  y: 30,
  opacity: 0
}, "-=0.5")
.from(".hero-cta", {
  duration: 0.6,
  y: 20,
  opacity: 0
}, "-=0.3");
```

### 卡片入场动画

```javascript
// 卡片入场动画
gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    delay: i * 0.1,
    ease: "power2.out"
  });
});
```

### 标题逐字动画

```javascript
// 标题逐字动画
const split = new SplitText(".hero-title", { type: "chars" });
gsap.from(split.chars, {
  duration: 0.8,
  y: 50,
  opacity: 0,
  stagger: 0.03,
  ease: "power2.out"
});
```

### 滚动视差效果

```javascript
// 滚动视差效果
gsap.to(".hero", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  y: 100,
  opacity: 0.5
});
```

---

## 📱 响应式设计

### 断点

```css
/* 移动端 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
}

/* 平板端 */
@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🎯 使用规划

### 触发指令

- **@pin** — 将 PinMe 部署的页面推入展示站

### 使用流程

1. 用户使用 PinMe 部署一个页面
2. 用户发送 `@pin <url> <描述>` 推入展示站
3. 系统自动抓取页面信息（标题、描述、截图）
4. 系统生成项目卡片
5. 系统自动部署到 Vercel

### 数据存储

```
/content/projects/
├── 2026-06-29_project-1.md
├── 2026-06-29_project-2.md
└── 2026-06-30_project-3.md
```

### 自动化流程

1. **抓取页面信息** — 使用 curl 抓取页面标题、描述
2. **生成截图** — 使用浏览器截图
3. **生成项目卡片** — 使用模板生成 Markdown
4. **部署到 Vercel** — 自动构建部署

---

## 📋 实现计划

### Phase 1：基础搭建（1-2 天）

1. 创建项目结构
2. 配置 Astro
3. 配置 Tailwind CSS
4. 配置字体
5. 配置颜色系统

### Phase 2：核心功能（2-3 天）

1. 实现首页布局
2. 实现项目卡片
3. 实现项目详情页
4. 实现响应式设计

### Phase 3：动画效果（1-2 天）

1. 实现页面加载动画
2. 实现卡片入场动画
3. 实现标题逐字动画
4. 实现滚动视差效果

### Phase 4：自动化（1-2 天）

1. 实现 @pin 触发指令
2. 实现页面信息抓取
3. 实现截图生成
4. 实现自动部署

### Phase 5：优化完善（1-2 天）

1. 性能优化
2. SEO 优化
3. 测试修复
4. 文档编写

---

## 🎨 设计参考

### 参考设计

- **Apple** — 优雅简洁，高品质
- **Linear** — 暗色主题，紫色强调
- **Notion** — 温暖极简，Serif 标题
- **Framer** — 大胆黑白，运动优先

### 设计原则

1. **Anti-Slop 设计** — 反对平庸、反对套路
2. **柔和对比** — 不刺眼，舒适阅读
3. **大量留白** — 呼吸感强，不拥挤
4. **高级字体** — 品质感强，优雅优美
5. **弹性动画** — 交互体验好，灵动有趣

---

## 📚 相关 Skill

| Skill | 用途 |
|-------|------|
| **taste-skill** | 整体视觉设计 + Anti-Slop 质量把控 |
| **gsap-skills** | ScrollTrigger、SplitText、Flip 等动画 |
| **impeccable** | UI 设计、视觉层次、响应式、动画 |
| **popular-web-designs** | 参考 Linear / Apple HIG 的设计语言 |
| **writing-plans** | 实现计划编写 |

---

## 🎯 总结

**PinMe Gallery** 是一个展示"一时兴起用 PinMe 部署的各种页面"的站点，采用 **Taste Skill (soft-skill) + GSAP Skills** 设计风格，追求**优雅优美、艺术感强、对标顶级设计**。

**核心特点：**
- ✅ Anti-Slop 设计，拒绝平庸
- ✅ 柔和对比，不刺眼
- ✅ 大量留白，呼吸感强
- ✅ 高级字体，品质感强
- ✅ 弹性动画，交互体验好
- ✅ 像走进一间安静的画廊

**触发指令：**
- **@pin** — 将 PinMe 部署的页面推入展示站
