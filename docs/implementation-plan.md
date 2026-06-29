# PinMe Gallery 实现计划

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** 构建一个展示"一时兴起用 PinMe 部署的各种页面"的站点，采用 Taste Skill (soft-skill) + GSAP Skills 设计风格。

**Architecture:** 使用 Astro 框架构建静态站点，GSAP 实现动画效果，Vercel 部署。

**Tech Stack:** Astro, GSAP, ScrollTrigger, SplitText, Playfair Display, Inter, Vercel

---

## Phase 1: 基础搭建

### Task 1: 创建项目结构

**Objective:** 创建 Astro 项目结构

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/layouts/Layout.astro`
- Create: `src/pages/index.astro`

**Step 1: 创建 package.json**

```json
{
  "name": "pinme-gallery",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "gsap": "^3.12.0"
  }
}
```

**Step 2: 创建 astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pinme-gallery.vercel.app',
  output: 'static'
});
```

**Step 3: 创建 tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

**Step 4: 创建 src/layouts/Layout.astro**

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="展示一时兴起用 PinMe 部署的各种页面" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  :root {
    /* 颜色 */
    --color-primary: #1a1a1a;
    --color-secondary: #666666;
    --color-accent: #0071e3;
    --color-bg: #ffffff;
    --color-bg-secondary: #f5f5f7;
    --color-text: #1a1a1a;
    --color-text-secondary: #666666;
    
    /* 字体 */
    --font-serif: "Playfair Display", "Georgia", serif;
    --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    
    /* 间距 */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;
    --space-24: 6rem;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-sans);
    color: var(--color-text);
    background: var(--color-bg);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>
```

**Step 5: 创建 src/pages/index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="PinMe Gallery - 一时兴起的创意画廊">
  <main>
    <h1>PinMe Gallery</h1>
    <p>一时兴起用 PinMe 部署的各种页面</p>
  </main>
</Layout>
```

**Step 6: 安装依赖并测试**

```bash
npm install
npm run dev
```

**Step 7: 提交**

```bash
git add .
git commit -m "feat: 初始化 Astro 项目结构"
```

---

### Task 2: 配置样式系统

**Objective:** 配置 CSS 变量和全局样式

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: 完善样式系统**

在 `src/layouts/Layout.astro` 的 `<style is:global>` 中添加：

```css
/* 排版 */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  font-weight: 700;
  line-height: 1.2;
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 1.5rem;
}

p {
  margin-bottom: 1rem;
}

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #0077ed;
}

/* 按钮 */
.button {
  display: inline-block;
  background: var(--color-accent);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.2s ease;
}

.button:hover {
  background: #0077ed;
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 响应式 */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
}
```

**Step 2: 测试**

```bash
npm run dev
```

**Step 3: 提交**

```bash
git add .
git commit -m "feat: 配置样式系统"
```

---

## Phase 2: 核心功能

### Task 3: 实现 Header 组件

**Objective:** 创建 Header 导航组件

**Files:**
- Create: `src/components/Header.astro`
- Modify: `src/pages/index.astro`

**Step 1: 创建 src/components/Header.astro**

```astro
---
---

<header class="header">
  <div class="container">
    <div class="header-content">
      <a href="/" class="logo">
        <span class="logo-text">PinMe Gallery</span>
      </a>
      <nav class="nav">
        <a href="/" class="nav-link">全部</a>
        <a href="/recent" class="nav-link">最近</a>
        <a href="/categories" class="nav-link">分类</a>
      </nav>
    </div>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    z-index: 1000;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
  }

  .logo-text {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
  }

  .nav {
    display: flex;
    gap: 32px;
  }

  .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-secondary);
    transition: color 0.2s ease;
  }

  .nav-link:hover {
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .nav {
      gap: 16px;
    }
  }
</style>
```

**Step 2: 在 index.astro 中使用**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
---

<Layout title="PinMe Gallery - 一时兴起的创意画廊">
  <Header />
  <main>
    <h1>PinMe Gallery</h1>
    <p>一时兴起用 PinMe 部署的各种页面</p>
  </main>
</Layout>
```

**Step 3: 测试**

```bash
npm run dev
```

**Step 4: 提交**

```bash
git add .
git commit -m "feat: 实现 Header 组件"
```

---

### Task 4: 实现 Hero 区域

**Objective:** 创建 Hero 区域

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Step 1: 创建 src/components/Hero.astro**

```astro
---
---

<section class="hero">
  <div class="container">
    <h1 class="hero-title">PinMe Gallery</h1>
    <p class="hero-subtitle">一时兴起用 PinMe 部署的各种页面</p>
    <p class="hero-description">像走进一间安静的画廊，每个页面都是一幅画</p>
  </div>
</section>

<style>
  .hero {
    padding: 160px 0 80px;
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
    margin: 0 auto 16px;
  }

  .hero-description {
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 120px 0 60px;
    }

    .hero-title {
      font-size: 2.5rem;
    }
  }
</style>
```

**Step 2: 在 index.astro 中使用**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
---

<Layout title="PinMe Gallery - 一时兴起的创意画廊">
  <Header />
  <main>
    <Hero />
  </main>
</Layout>
```

**Step 3: 测试**

```bash
npm run dev
```

**Step 4: 提交**

```bash
git add .
git commit -m "feat: 实现 Hero 区域"
```

---

### Task 5: 实现项目卡片组件

**Objective:** 创建项目卡片组件

**Files:**
- Create: `src/components/ProjectCard.astro`
- Modify: `src/pages/index.astro`

**Step 1: 创建 src/components/ProjectCard.astro**

```astro
---
interface Props {
  title: string;
  description: string;
  techStack: string[];
  pinmeUrl: string;
  createdAt: string;
  category: string;
}

const { title, description, techStack, pinmeUrl, createdAt, category } = Astro.props;
---

<article class="card">
  <div class="card-image">
    <div class="card-image-placeholder">
      <span class="card-image-icon">🌐</span>
    </div>
  </div>
  <div class="card-content">
    <h3 class="card-title">{title}</h3>
    <p class="card-description">{description}</p>
    <div class="card-tags">
      {techStack.map((tech) => (
        <span class="card-tag">{tech}</span>
      ))}
    </div>
    <div class="card-meta">
      <span class="card-date">{createdAt}</span>
      <span class="card-category">{category}</span>
    </div>
    <a href={pinmeUrl} class="card-link" target="_blank" rel="noopener noreferrer">
      访问项目 →
    </a>
  </div>
</article>

<style>
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
    background: var(--color-bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-image-icon {
    font-size: 3rem;
  }

  .card-content {
    padding: 24px;
  }

  .card-title {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--color-primary);
  }

  .card-description {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin-bottom: 16px;
    line-height: 1.6;
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

  .card-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
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
    font-weight: 500;
    transition: background 0.2s ease;
  }

  .card-link:hover {
    background: #0077ed;
    color: white;
  }
</style>
```

**Step 2: 在 index.astro 中使用**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import ProjectCard from '../components/ProjectCard.astro';

// 示例数据
const projects = [
  {
    title: "加密聊天室",
    description: "一个简单的加密聊天室应用",
    techStack: ["HTML", "CSS", "JavaScript"],
    pinmeUrl: "https://xxx.pinme.dev",
    createdAt: "2026-06-29",
    category: "web"
  },
  {
    title: "Flappy Bird",
    description: "经典 Flappy Bird 游戏克隆",
    techStack: ["HTML5 Canvas", "JavaScript"],
    pinmeUrl: "https://yyy.pinme.dev",
    createdAt: "2026-06-28",
    category: "game"
  }
];
---

<Layout title="PinMe Gallery - 一时兴起的创意画廊">
  <Header />
  <main>
    <Hero />
    <section class="projects">
      <div class="container">
        <div class="grid">
          {projects.map((project) => (
            <ProjectCard {...project} />
          ))}
        </div>
      </div>
    </section>
  </main>
</Layout>

<style>
  .projects {
    padding: 80px 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Step 3: 测试**

```bash
npm run dev
```

**Step 4: 提交**

```bash
git add .
git commit -m "feat: 实现项目卡片组件"
```

---

### Task 6: 实现 Footer 组件

**Objective:** 创建 Footer 组件

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Step 1: 创建 src/components/Footer.astro**

```astro
---
---

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-left">
        <span class="footer-logo">PinMe Gallery</span>
        <span class="footer-copyright">© 2026 冯哲</span>
      </div>
      <div class="footer-right">
        <a href="https://github.com/ruijayfeng" class="footer-link" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://pinme.eth.limo" class="footer-link" target="_blank" rel="noopener noreferrer">
          PinMe
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-bg-secondary);
    padding: 40px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .footer-logo {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary);
  }

  .footer-copyright {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .footer-right {
    display: flex;
    gap: 24px;
  }

  .footer-link {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    transition: color 0.2s ease;
  }

  .footer-link:hover {
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 24px;
      text-align: center;
    }
  }
</style>
```

**Step 2: 在 index.astro 中使用**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import ProjectCard from '../components/ProjectCard.astro';
import Footer from '../components/Footer.astro';

// 示例数据
const projects = [
  {
    title: "加密聊天室",
    description: "一个简单的加密聊天室应用",
    techStack: ["HTML", "CSS", "JavaScript"],
    pinmeUrl: "https://xxx.pinme.dev",
    createdAt: "2026-06-29",
    category: "web"
  },
  {
    title: "Flappy Bird",
    description: "经典 Flappy Bird 游戏克隆",
    techStack: ["HTML5 Canvas", "JavaScript"],
    pinmeUrl: "https://yyy.pinme.dev",
    createdAt: "2026-06-28",
    category: "game"
  }
];
---

<Layout title="PinMe Gallery - 一时兴起的创意画廊">
  <Header />
  <main>
    <Hero />
    <section class="projects">
      <div class="container">
        <div class="grid">
          {projects.map((project) => (
            <ProjectCard {...project} />
          ))}
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>

<style>
  .projects {
    padding: 80px 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Step 3: 测试**

```bash
npm run dev
```

**Step 4: 提交**

```bash
git add .
git commit -m "feat: 实现 Footer 组件"
```

---

## Phase 3: 动画效果

### Task 7: 配置 GSAP

**Objective:** 安装和配置 GSAP

**Files:**
- Modify: `src/layouts/Layout.astro`
- Create: `src/scripts/animations.js`

**Step 1: 安装 GSAP**

```bash
npm install gsap
```

**Step 2: 创建 src/scripts/animations.js**

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// 注册插件
gsap.registerPlugin(ScrollTrigger, SplitText);

// 页面加载动画
export function initPageAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  tl.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0
  })
  .from('.hero-subtitle', {
    duration: 0.8,
    y: 30,
    opacity: 0
  }, '-=0.5')
  .from('.hero-description', {
    duration: 0.6,
    y: 20,
    opacity: 0
  }, '-=0.3');
}

// 卡片入场动画
export function initCardAnimations() {
  gsap.utils.toArray('.card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });
}

// 标题逐字动画
export function initTitleAnimation() {
  const split = new SplitText('.hero-title', { type: 'chars' });
  gsap.from(split.chars, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.03,
    ease: 'power2.out'
  });
}

// 初始化所有动画
export function initAllAnimations() {
  initPageAnimations();
  initCardAnimations();
  initTitleAnimation();
}
```

**Step 3: 在 Layout.astro 中引入**

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="展示一时兴起用 PinMe 部署的各种页面" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <title>{title}</title>
  </head>
  <body>
    <slot />
    <script>
      import { initAllAnimations } from '../scripts/animations.js';
      document.addEventListener('DOMContentLoaded', initAllAnimations);
    </script>
  </body>
</html>
```

**Step 4: 测试**

```bash
npm run dev
```

**Step 5: 提交**

```bash
git add .
git commit -m "feat: 配置 GSAP 动画"
```

---

### Task 8: 实现滚动视差效果

**Objective:** 实现滚动视差效果

**Files:**
- Modify: `src/scripts/animations.js`

**Step 1: 添加滚动视差效果**

在 `src/scripts/animations.js` 中添加：

```javascript
// 滚动视差效果
export function initParallaxEffect() {
  gsap.to('.hero', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 100,
    opacity: 0.5
  });
}

// 更新初始化函数
export function initAllAnimations() {
  initPageAnimations();
  initCardAnimations();
  initTitleAnimation();
  initParallaxEffect();
}
```

**Step 2: 测试**

```bash
npm run dev
```

**Step 3: 提交**

```bash
git add .
git commit -m "feat: 实现滚动视差效果"
```

---

## Phase 4: 数据管理

### Task 9: 创建数据文件

**Objective:** 创建项目数据文件

**Files:**
- Create: `src/data/projects.json`

**Step 1: 创建 src/data/projects.json**

```json
[
  {
    "id": 1,
    "title": "加密聊天室",
    "description": "一个简单的加密聊天室应用，支持实时通信",
    "techStack": ["HTML", "CSS", "JavaScript"],
    "pinmeUrl": "https://xxx.pinme.dev",
    "githubUrl": "",
    "createdAt": "2026-06-29",
    "category": "web",
    "tags": ["前端", "实时通信", "实验"],
    "screenshot": ""
  },
  {
    "id": 2,
    "title": "Flappy Bird",
    "description": "经典 Flappy Bird 游戏克隆，使用 HTML5 Canvas 实现",
    "techStack": ["HTML5 Canvas", "JavaScript"],
    "pinmeUrl": "https://yyy.pinme.dev",
    "githubUrl": "",
    "createdAt": "2026-06-28",
    "category": "game",
    "tags": ["游戏", "Canvas", "实验"],
    "screenshot": ""
  }
]
```

**Step 2: 在 index.astro 中使用**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import ProjectCard from '../components/ProjectCard.astro';
import Footer from '../components/Footer.astro';
import projects from '../data/projects.json';
---

<Layout title="PinMe Gallery - 一时兴起的创意画廊">
  <Header />
  <main>
    <Hero />
    <section class="projects">
      <div class="container">
        <div class="grid">
          {projects.map((project) => (
            <ProjectCard {...project} />
          ))}
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>

<style>
  .projects {
    padding: 80px 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Step 3: 测试**

```bash
npm run dev
```

**Step 4: 提交**

```bash
git add .
git commit -m "feat: 创建数据文件"
```

---

## Phase 5: 自动化

### Task 10: 创建 @pin 脚本

**Objective:** 创建 @pin 触发脚本

**Files:**
- Create: `scripts/pin.sh`

**Step 1: 创建 scripts/pin.sh**

```bash
#!/bin/bash

# @pin 触发脚本
# 使用方法: ./scripts/pin.sh <url> <description>

URL=$1
DESCRIPTION=$2

if [ -z "$URL" ]; then
  echo "错误: 请提供 URL"
  echo "使用方法: ./scripts/pin.sh <url> <description>"
  exit 1
fi

if [ -z "$DESCRIPTION" ]; then
  echo "错误: 请提供描述"
  echo "使用方法: ./scripts/pin.sh <url> <description>"
  exit 1
fi

# 生成项目 ID
ID=$(date +%Y%m%d%H%M%S)

# 生成项目文件名
FILENAME="src/data/projects.json"

# 读取现有数据
EXISTING=$(cat $FILENAME)

# 添加新项目
NEW_PROJECT=$(cat <<EOF
{
  "id": $ID,
  "title": "$DESCRIPTION",
  "description": "$DESCRIPTION",
  "techStack": ["HTML", "CSS", "JavaScript"],
  "pinmeUrl": "$URL",
  "githubUrl": "",
  "createdAt": "$(date +%Y-%m-%d)",
  "category": "web",
  "tags": ["PinMe"],
  "screenshot": ""
}
EOF
)

# 更新 JSON 文件
echo "$EXISTING" | jq ". + [$NEW_PROJECT]" > $FILENAME

echo "✅ 已添加项目: $DESCRIPTION"
echo "🔗 链接: $URL"
```

**Step 2: 设置执行权限**

```bash
chmod +x scripts/pin.sh
```

**Step 3: 测试**

```bash
./scripts/pin.sh "https://test.pinme.dev" "测试项目"
```

**Step 4: 提交**

```bash
git add .
git commit -m "feat: 创建 @pin 脚本"
```

---

## Phase 6: 部署

### Task 11: 配置 Vercel 部署

**Objective:** 配置 Vercel 部署

**Files:**
- Create: `vercel.json`

**Step 1: 创建 vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

**Step 2: 部署到 Vercel**

```bash
vercel deploy --prod
```

**Step 3: 提交**

```bash
git add .
git commit -m "feat: 配置 Vercel 部署"
```

---

## 📋 任务清单

- [ ] Task 1: 创建项目结构
- [ ] Task 2: 配置样式系统
- [ ] Task 3: 实现 Header 组件
- [ ] Task 4: 实现 Hero 区域
- [ ] Task 5: 实现项目卡片组件
- [ ] Task 6: 实现 Footer 组件
- [ ] Task 7: 配置 GSAP
- [ ] Task 8: 实现滚动视差效果
- [ ] Task 9: 创建数据文件
- [ ] Task 10: 创建 @pin 脚本
- [ ] Task 11: 配置 Vercel 部署

---

## 🎯 总结

本实现计划包含 11 个任务，分为 6 个阶段：

1. **基础搭建** — 创建项目结构、配置样式系统
2. **核心功能** — 实现 Header、Hero、项目卡片、Footer
3. **动画效果** — 配置 GSAP、实现滚动视差
4. **数据管理** — 创建数据文件
5. **自动化** — 创建 @pin 脚本
6. **部署** — 配置 Vercel 部署

每个任务都是 bite-sized（2-5 分钟），包含完整的代码和测试步骤。
