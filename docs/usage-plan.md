# PinMe Gallery 使用规划

> **项目名称：** PinMe Gallery（PinMe 画廊）
> **定位：** 展示一时兴起用 PinMe 部署的各种页面
> **触发指令：** @pin
> **创建时间：** 2026-06-29

---

## 📌 项目定位

### 核心理念

**PinMe Gallery** 是一个展示"一时兴起用 PinMe 部署的各种页面"的站点，不是项目展示站，而是**个人创意画廊**。

### 设计哲学

- **一时兴起** — 随性、灵动、有趣
- **各种页面** — 多样性、创意性
- **优雅优美** — 对标顶级设计
- **艺术感** — 像走进一间安静的画廊

---

## 🎯 使用流程

### 触发指令

- **@pin** — 将 PinMe 部署的页面推入展示站

### 使用场景

1. **场景一：** 你用 PinMe 部署了一个有趣的页面
   - 你：@pin https://xxx.pinme.dev 加密聊天室
   - 系统：自动抓取页面信息，生成项目卡片，部署到 Vercel

2. **场景二：** 你用 PinMe 部署了一个实验性页面
   - 你：@pin https://yyy.pinme.dev Flappy Bird 游戏
   - 系统：自动抓取页面信息，生成项目卡片，部署到 Vercel

3. **场景三：** 你用 PinMe 部署了一个工具页面
   - 你：@pin https://zzz.pinme.dev Markdown 编辑器
   - 系统：自动抓取页面信息，生成项目卡片，部署到 Vercel

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

## 🛠️ 技术实现

### 自动化流程

1. **用户触发** — 用户发送 `@pin <url> <描述>`
2. **抓取页面信息** — 使用 curl 抓取页面标题、描述
3. **生成截图** — 使用浏览器截图
4. **生成项目卡片** — 使用模板生成 Markdown
5. **部署到 Vercel** — 自动构建部署

### 脚本实现

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

---

## 🎨 设计规范

### 设计风格

采用 **Taste Skill (soft-skill) + GSAP Skills** 设计风格：

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

---

## 📋 项目结构

```
pinme-gallery/
├── docs/
│   ├── design-plan.md          # 设计方案
│   ├── implementation-plan.md  # 实现计划
│   └── usage-plan.md           # 使用规划
├── scripts/
│   └── pin.sh                  # @pin 触发脚本
├── src/
│   ├── components/
│   │   ├── Header.astro        # Header 组件
│   │   ├── Hero.astro          # Hero 组件
│   │   ├── ProjectCard.astro   # 项目卡片组件
│   │   └── Footer.astro        # Footer 组件
│   ├── data/
│   │   └── projects.json       # 项目数据
│   ├── layouts/
│   │   └── Layout.astro        # 布局组件
│   ├── pages/
│   │   └── index.astro         # 首页
│   └── scripts/
│       └── animations.js       # 动画脚本
├── astro.config.mjs            # Astro 配置
├── package.json                # 项目配置
├── tsconfig.json               # TypeScript 配置
└── vercel.json                 # Vercel 配置
```

---

## 🎯 使用示例

### 示例一：添加一个新项目

**用户输入：**
```
@pin https://xxx.pinme.dev 加密聊天室
```

**系统响应：**
```
✅ 已添加项目: 加密聊天室
🔗 链接: https://xxx.pinme.dev
📁 文件: src/data/projects.json
🚀 部署: 已自动部署到 Vercel
```

### 示例二：查看项目列表

**用户输入：**
```
查看 PinMe Gallery
```

**系统响应：**
```
📁 PinMe Gallery 项目列表：

1. 加密聊天室 (2026-06-29)
   - 链接: https://xxx.pinme.dev
   - 技术栈: HTML, CSS, JavaScript
   - 分类: web

2. Flappy Bird (2026-06-28)
   - 链接: https://yyy.pinme.dev
   - 技术栈: HTML5 Canvas, JavaScript
   - 分类: game

🔗 访问: https://pinme-gallery.vercel.app
```

---

## 🎯 总结

**PinMe Gallery** 是一个展示"一时兴起用 PinMe 部署的各种页面"的站点，采用 **Taste Skill (soft-skill) + GSAP Skills** 设计风格，追求**优雅优美、艺术感强、对标顶级设计**。

**触发指令：**
- **@pin** — 将 PinMe 部署的页面推入展示站

**使用流程：**
1. 用户发送 `@pin <url> <描述>`
2. 系统自动抓取页面信息
3. 系统生成项目卡片
4. 系统自动部署到 Vercel

**设计特点：**
- ✅ Anti-Slop 设计，拒绝平庸
- ✅ 柔和对比，不刺眼
- ✅ 大量留白，呼吸感强
- ✅ 高级字体，品质感强
- ✅ 弹性动画，交互体验好
- ✅ 像走进一间安静的画廊
