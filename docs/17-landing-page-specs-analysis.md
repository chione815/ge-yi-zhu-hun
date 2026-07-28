# 17 份 Landing Page 规格书

> 为「歌以铸魂」网页优化收集的参考素材，2026-07-26 全部 17 份详细规格书整理完成。

---

## 排名总览（按适配度）

| 排名 | 来源 | 适配度 | 可借用的核心技术 |
|------|------|--------|-----------------|
| 1 | NHM 博物馆 | 5.0/5 | SandTransitionImage(沙粒溶解→墨迹渗透)、SVG letterBlock |
| 2 | Aura 邮件客户端 | 4.5/5 | noise滤镜(纸纹肌理)、shiny text(金粉流光) |
| 3 | ASME 品牌页 | 4.0/5 | BlurText(墨韵渐显)、FadingVideo(卷轴淡入) |
| 4 | 设计机构 | 3.8/5 | BlurText flex-wrap(竖排逐字着墨) |
| 5 | Drift | 3.5/5 | IntersectionObserver 滚动驱动、克制节奏 |
| 6 | Mindloop | 3.3/5 | useScroll 逐词 reveal(卷轴展读) |
| 7 | Michael Smith | 3.3/5 | GSAP parallax(山水远近)、marquee(长卷诗行) |
| 8 | Jack 3D Creator | 3.0/5 | 卡片堆叠 scale(经折翻页)、AnimatedText(逐字着墨) |
| 9 | SynapseX | 2.8/5 | ScrambleIn(残碑复原)、光标视频擦洗 |
| 10 | Viktor Oddy | 2.8/5 | 多层按钮阴影(印章叠盖)、交错入场 |
| 11 | Orbis.Nft | 2.5/5 | 纹理叠加(麻纸覆盖)、marquee |
| 12 | Axion Studio | 2.5/5 | shader 背景(Swirl/ChromaFlow/FlutedGlass) |
| 13 | Dental Clinic | 2.3/5 | MaskedCard(单图多窗口)、交错入场 |
| 14 | Halo | 2.0/5 | CSS marquee 无限滚动 |
| 15 | prmpt | 2.0/5 | 光标视频擦洗 |
| 16 | SkyElite | 1.5/5 | 基础 hover |
| 17 | CodeNest | 1.3/5 | HLS.js 视频流 |

---

## 歌以铸魂动画系统最终设计

```
全局质感动画（持续运行）
├── 宣纸纤维呼吸（Aura noise 改造）
└── 纸面色调微动（自定义 radial-gradient）

入场动画（页面加载触发一次）
├── 大字标题：雕版落字（NHM letterBlock）
├── 段落文字：墨韵渐显（ASME BlurText 改造）
└── 装饰元素：印章盖下（Viktor Oddy 阴影叠层）

滚动驱动动画（随用户滚动触发）
├── 段落显影：卷轴展开（Mindloop clip-path）
├── 图像切换：墨染渗透（NHM SandTransitionImage）
├── 画作展示：山水远近（Michael Smith parallax）
└── 长卷诗行：慢速横滚（Halo marquee 改造）

交互动画（hover/tap 触发）
├── 链接 hover：金粉浮现（Aura shiny 改造）
├── 卡片 hover：墨迹微晕（radial-gradient 扩散）
└── 按钮 hover：印章重盖（scale 微缩 + 阴影加深）

过渡动画（页面/区块间切换）
├── 大段切换：经折翻页（Jack 卡片堆叠改造）
└── 小元素切换：残碑复原（SynapseX ScrambleIn 改造）
```

---

## 已实现的功能清单

| 模块 | 技术来源 | 状态 |
|------|---------|------|
| 宣纸纤维呼吸 | Aura noise filter | ✅ CSS animation |
| 品牌 Logo 金辉呼吸 | 自定义 | ✅ CSS animation |
| 金粉流光文字 | Aura shiny text | ✅ "铸魂"品牌文字 |
| 雕版逐字着墨 | NHM letterBlock | ✅ JS 字符拆分 + CSS transition |
| 墨韵渐显段落 | ASME BlurText | ✅ CSS blur transition |
| 卷轴展读 | Mindloop clip-path | ✅ CSS clip-path reveal |
| 朱印呼吸 | Viktor Oddy 阴影 | ✅ CSS filter animation |
| 经折翻页卡片 | Jack 卡片堆叠 | ✅ CSS perspective hover |
| SVG 滤镜库 | Aura + NHM | ✅ 纸纹/墨染/金粉滤镜 |

---

# 详细规格书

---

## 1. NHM 博物馆（5.0/5）★ 最适配

### 项目配置
- **技术栈**: React 19 + Vite 6 + Tailwind CSS 4 + Motion (Framer Motion) + Lucide React + TypeScript
- **字体**: Inter (300-600) + JetBrains Mono (400-500)
- **全局样式**: 背景 #fcfcfc，文字 #111，#1a1a1a，#0a0a0a（暗色区域），严格单色黑白灰
- **自定义 CSS**: `.text-mega { font-size: 21vw; line-height: 0.75; letter-spacing: -0.04em; }`

### SandTransitionImage 组件（★ 核心借用的技术）
- **效果**: 沙粒溶解/粒子消散的图像切换过渡
- **实现**: 使用 `usePresence()` 感知 AnimatePresence 状态，requestAnimationFrame 循环 900ms
- **缓动**: 进入 = 四次缓出 `(1 - Math.pow(1-t, 4))`，退出 = 三次方 `(Math.pow(t, 3))`
- **SVG 滤镜链**:
  1. `feTurbulence`: fractalNoise, baseFrequency 1.8, numOctaves 4
  2. `feDisplacementMap`: scale 最大 150（基于进度）
  3. `feOffset`: dy 最大 -80（进入）或 120（退出），dx ±30
  4. `feGaussianBlur`: 最大 6px
  5. `feColorMatrix`: opacity 淡出 `(1 - progress * 1.2)`
- **歌以铸魂转化 — 墨染渗透**:
  - baseFrequency 降为 0.5，模拟墨迹在宣纸纤维上的不规则渗透
  - displacementMap scale 降为 0→120，墨迹缓慢扩散而非飞散
  - feOffset 仅向下渗透，去掉水平偏移
  - feGaussianBlur 降为 0→4px，墨迹边界保持锐利
  - feColorMatrix 过渡中间态呈现墨蓝色
- **应用**: 卷轴翻页、画作/书法切换、印章盖下的朱砂渗透

### letterBlock 动画
- 每个字母从 `y: 120, opacity: 0` 滑入到 `y: 0, opacity: 1`
- `cubic-bezier(0.16, 1, 0.3, 1)`，duration 1.2s
- NHM logo 由多个 polygon 组成，每个 polygon 独立动画

### 其他技术要点
- **Hero 视频延迟加载**: 2800ms 后才显示背景视频
- **章节自动轮播**: 每 3500ms 切换 activeChapter
- **按钮悬停效果**: 滑动背景面板 `-translate-x-[101%]` → `translate-x-0`，duration 700ms
- **自定义 SVG 图标**: 叶子/植物形状的 Explore 按钮图标
- **资源**: Cloudinary 托管所有媒体（5 张章节图 + 1 张翼龙图 + 1 个背景视频）

---

## 2. Aura 邮件客户端（4.5/5）

### 项目配置
- **技术栈**: React 18 + TypeScript + Vite + Tailwind CSS + motion/react + lucide-react + @supabase/supabase-js
- **字体**: Inter (400-900)，Google Fonts 导入
- **全局样式**: 背景 #0c0c0c，文字白色，selection bg-brand/30，brand color #3D81E3

### SVG Noise 滤镜（★ 核心借用的技术）
**根级滤镜** (用于 shiny headline):
```
feTurbulence: fractalNoise, baseFrequency 0.9, numOctaves 2
→ feColorMatrix: alpha 0.35
→ feComposite: operator="in"
→ feBlend: mode="multiply"
```
**定价区滤镜** (用于 watermark):
```
feTurbulence: fractalNoise, baseFrequency 0.5, numOctaves 2
→ feComponentTransfer: feFuncA slope 0.075
→ feComposite: operator="in"
→ feBlend: mode="overlay"
```

### Shiny Gradient Text（★ 核心借用的技术）
- **gradientStyle**: `linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)`
- `backgroundSize: 200% auto`，`background-clip: text`，`filter: url(#c3-noise)`
- **动画**: `@keyframes shiny { 0%: background-position: -200% center; 100%: 200% center; }`，6s linear infinite
- **歌以铸魂转化**: 古金色系渐变 #C4A35A→#8B6914→#E8D5A3，15s 慢速流动，仅用于标题中 1-2 个关键词

### Liquid-Glass 效果
```css
.liquid-glass {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
}
.liquid-glass::before {
  /* 1.4px 渐变边框 via mask-composite: exclude */
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
}
```

### 其他技术要点
- **全屏固定背景视频**: CloudFront mp4，pointer-events-none，z-0
- **macOS 菜单栏模拟**: h-10 bg-black/40 backdrop-blur-md，Apple logo + 菜单项
- **收件箱 Mockup**: 3栏布局（侧边栏/消息列表/阅读器），含 AI 摘要卡片
- **定价区**: 自定义 CSS 类（非 Tailwind），9rem 水印文字 + 3 列卡片 + 年付切换
- **AppleButton**: 白底圆角药丸，Apple logo + ChevronRight 位移
- **LogoMark**: 4 象限抽象曲线 SVG

---

## 3. ASME 品牌页（4.0/5）

### 项目配置
- **技术栈**: React + TypeScript + Vite + Tailwind CSS + framer-motion + lucide-react
- **字体**: Instrument Serif (italic + regular)，Google Fonts 导入
- **全局样式**: 背景纯黑 #000

### FadingVideo 组件（★ 核心借用的技术）
- 使用 requestAnimationFrame 控制 opacity 淡入淡出
- `loadeddata` → 淡入 500ms
- `timeupdate` → 剩余 ≤0.55s 时淡出 550ms
- `ended` → 重置 currentTime 回 0，重新播放并淡入
- 支持单视频循环或多视频数组轮播

### BlurText 组件（★ 核心借用的技术）
- 逐词分割（按空格），每个词独立 motion.span
- IntersectionObserver (threshold 0.1) 触发
- 每个词: `filter: blur(10px)→0, opacity: 0→1, y: 50→0`
- Duration 0.7s/词，stagger 100ms
- display: flex + flexWrap: wrap
- **歌以铸魂转化 — 墨韵渐显**: blur(8px)→0，opacity 0.3→1（初始淡墨灰），stagger 150ms，渐入 1200ms

### Liquid Glass 变体
- `.liquid-glass`: blur(4px)，subtle 边框
- `.liquid-glass-strong`: blur(50px)，更强阴影

### 其他技术要点
- **Hero**: 全屏视频背景 + 居中内容，h1 "Know it then *all*"（Instrument Serif italic）
- **About**: 大标题 "Pioneering *ideas* for minds that *create, build, and inspire*"
- **Featured Video**: 圆角视频 + liquid-glass 叠加卡片
- **Philosophy**: "Innovation *x* Vision" 双栏布局（视频 + 文字）
- **Services**: 两卡片网格，每卡片含视频 + 标签 + 描述，group-hover:scale-105
- **图标**: 全部自定义 SVG（ArrowUpRight, Play, Clock, Globe, Image, Movie, Lightbulb）

---

## 4. 设计机构（3.8/5）

### 项目配置
- **技术栈**: React + Vite + TypeScript + Tailwind CSS + Framer Motion
- **字体**: Instrument Serif (italic, font-heading) + Barlow (300-600, font-body)
- **全局样式**: 背景纯黑 #000，文字白色

### BlurText flex-wrap 实现
- 同 ASME 的 BlurText 组件
- `display: flex; flexWrap: wrap; justifyContent: center`
- **歌以铸魂转化 — 竖排逐字着墨**: writing-mode: vertical-rl，stagger 200ms，从上到下模拟雕版印刷

### 其他技术要点
- **仅 2 个 section**: Hero + Capabilities
- **Hero**: FadingVideo 背景 + BlurText 标题 "Crafted Digital Experiences Built to Outlast Trends"
- **统计卡片**: "6 Weeks" + "140+" 品牌，liquid-glass 容器
- **信任栏**: 5 个品牌名（Aeon, Vela, Apex, Orbit, Zeno）font-heading italic
- **Capabilities**: 3 列卡片（Design/Engineering/Growth），每卡含图标 + 标签 + 描述

---

## 5. Drift（3.5/5）

### 借鉴价值
- **IntersectionObserver 驱动 scroll 动画**
- **克制节奏**: duration ≥ 800ms，stagger 120-200ms
- 设计节奏感——动画不是越快越好，古意需要缓慢从容的节奏
- delay 和 duration 的参考标杆

---

## 6. Mindloop（3.3/5）

### 项目配置
- **技术栈**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + hls.js
- **字体**: Inter (sans) + Instrument Serif (serif, italic accent)
- **全局样式**: 纯黑 #000 背景，白色前景，HSL CSS 变量，无彩色

### useScroll 逐词 Reveal（★ 核心借用的技术）
- 使用 framer-motion `useScroll` + `useTransform`
- 每个词的 opacity 从 0.15 映射到 1
- 基于滚动进度动态计算
- **歌以铸魂转化 — 卷轴展读**: 逐句/逐段而非逐词，clip-path: inset(0 100% 0 0) → inset(0 0 0 0)，配合微弱 sepia 色偏

### Liquid Glass
- 同 Aura 的 liquid-glass 效果，用于社交图标按钮、CTA 按钮

### 其他技术要点
- **Hero**: 全屏 mp4 视频背景 + 头像行 + "Get Inspired with Us"（"Inspired" serif italic）
- **邮件订阅**: liquid-glass 圆角输入框 + "SUBSCRIBE" 按钮
- **平台卡片**: ChatGPT / Perplexity / Google AI 图标
- **Mission**: 800x800 视频 + useScroll 逐词 reveal 段落
- **Solution**: 4 列特性网格（Curated Feed / Writer Tools / Community / Distribution）
- **CTA**: HLS 视频背景 (hls.js) + "Start Your Journey"
- **Navbar**: 同心圆 logo + 链接（• 分隔）+ 社交图标

---

## 7. Michael Smith（3.3/5）

### 项目配置
- **技术栈**: React + Vite + Tailwind CSS + TypeScript + GSAP + Framer Motion + hls.js + react-router-dom
- **字体**: Inter (300-700, font-body) + Instrument Serif (italic, font-display)
- **全局样式**: HSL 变量，bg #0a0a0a，强制暗色主题

### GSAP Parallax（★ 核心借用的技术）
- **三层视差**: ScrollTrigger pin + 不同速度层
- **歌以铸魂转化 — 山水远近**:
  - 远山层（最慢，opacity 0.3）→ 淡墨渲染
  - 近树层（中等）→ 浓墨勾勒
  - 文字层（最快）→ 焦墨题字

### GSAP Marquee（★ 核心借用的技术）
- `xPercent: -50`，duration 40s，ease "none"，repeat -1
- "BUILDING THE FUTURE • " 重复 10 次
- **歌以铸魂转化**: 经典诗词慢速横滚，60s 完成一圈

### 其他技术要点
- **Loading Screen**: RAF 计数器 000→100，2700ms，旋转词 ["Design", "Create", "Inspire"]
- **Hero**: HLS 视频背景，GSAP 入场时间线（name-reveal + blur-in）
- **Navbar**: 浮动药丸，accent gradient logo 环，hover 时 accent gradient border
- **Selected Works**: Bento Grid（12 列），4 张项目卡片，halftone 叠加层
- **Journal**: 水平药丸条目
- **Explorations**: 300vh 视差画廊，GSAP ScrollTrigger pin + 双列偏移
- **Stats**: 20+ 年 / 95+ 项目 / 200% 满意度
- **Contact**: HLS 视频背景（垂直翻转）+ GSAP marquee

---

## 8. Jack 3D Creator（3.0/5）

### 项目配置
- **技术栈**: React + TypeScript + Tailwind CSS + Framer Motion + Lucide React
- **字体**: Kanit (300-900)，Google Fonts
- **全局样式**: 背景 #0C0C0C，overflowX: clip

### 卡片堆叠 Scale 效应（★ 核心借用的技术）
- 3 张 sticky 卡片，每张 `top: ${index * 28}px`，h-[85vh] 容器
- `targetScale = 1 - (totalCards - 1 - index) * 0.03`
- framer-motion `useScroll` + `useTransform`
- **歌以铸魂转化 — 经折装翻页**: rotateY + transformOrigin（奇数页左轴、偶数页右轴），perspective 1200px，折缝古铜色阴影线

### AnimatedText（★ 核心借用的技术）
- 逐字符 scroll-driven opacity 动画
- 每个字符从 opacity 0.2 → 1，基于 scroll offset
- invisible placeholder + absolute 定位 animated span

### 其他技术要点
- **Magnet 组件**: 鼠标跟随磁吸效果，padding 150，strength 3，translate3d
- **Hero**: "Hi, i'm jack" 渐变文字 (.hero-heading)，居中人物图 + Magnet
- **Marquee**: 21 张 motionsites.ai GIF，双行反向滚动（Row 1 右移，Row 2 左移），基于 scroll 位置
- **About**: 4 个角落装饰性 3D 图片 + AnimatedText 段落 + "About me" 渐变标题
- **Services**: 白底，5 项服务（01-05），编号 + 名称 + 描述
- **Projects**: 3 张卡片（Nextlevel Studio / Aura Brand Identity / Solaris Digital），每卡含 CloudFront 图片
- **ContactButton**: 渐变背景 pill + 多层 box-shadow + 白色 outline offset

---

## 9. SynapseX（2.8/5）

### 项目配置
- **技术栈**: React + TypeScript + Vite + Tailwind CSS + Framer Motion + lucide-react
- **字体**: Space Mono (monospace, 所有文本) + Anton SC (背景水印)
- **全局样式**: 纯黑 #000，白色文字，overflow-x: hidden

### ScrambleIn / ScrambleText（★ 核心借用的技术）
**ScrambleIn** (入场揭示):
- 字符集: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><`
- interval 25ms，每帧揭示 0.5 个字符
- 未揭示字符显示随机字符（最多领先 3 个）
- **歌以铸魂转化 — 残碑复原**: 字符从随机乱码逐渐归位为正确文字，模拟碑文修复过程

**ScrambleText** (hover 驱动):
- Hover 时所有字符随机化，然后从左到右揭示（4 帧/字符）

### 光标视频擦洗（★ 核心借用的技术）
- Hero 视频不自动播放，通过鼠标水平移动 scrubbing
- sensitivity 0.8
- `seeked` 事件链式 seek，避免掉帧
- Dead zone 处理

### 其他技术要点
- **3D 文本效果**: Section 2 使用 `rotateX(24deg)` + `translateZ(15px)` + useScroll spring
- **背景水印**: "TRANSCENDENCE" Anton SC，clamp(120px, 30vw, 521px)，opacity 0.10
- **Navbar**: 扩展菜单药丸（48px→290px spring 动画），ScrambleText hover
- **Metrics**: 2.4ms / 99.7% / 140B，视频背景
- **Architecture**: 3 层卡片（Capture / Process / Interface）
- **SynapseXLogo**: 4 重旋转对称抽象 SVG

---

## 10. Viktor Oddy（2.8/5）

### 项目配置
- **技术栈**: React + TypeScript + Vite + Tailwind CSS + lucide-react
- **字体**: PP Neue Montreal (body, Webflow CDN) + PP Mondwest (serif accent, 本地 woff2)
- **全局样式**: 白色背景

### 多层按钮阴影（★ 核心借用的技术）
**Primary button shadow**:
```
0_1px_2px_0_rgba(5,26,36,0.1),
0_4px_4px_0_rgba(5,26,36,0.09),
0_9px_6px_0_rgba(5,26,36,0.05),
0_17px_7px_0_rgba(5,26,36,0.01),
0_26px_7px_0_rgba(5,26,36,0),
inset_0_2px_8px_0_rgba(255,255,255,0.5)
```
- **歌以铸魂转化 — 印章盖下**: 多层阴影模拟印章多次盖印的深浅不一，scale 微缩 + 阴影加深

### 交错入场动画
- 自定义 `useInViewAnimation` hook (IntersectionObserver, threshold 0.1, once)
- CSS `@keyframes fadeInUp`: opacity 0 + translateY(30px) → opacity 1 + translateY(0)
- 每个元素 staggered `animationDelay` (0.1s, 0.2s, 0.3s...)

### 其他技术要点
- **Marquee**: 8 张 motionsites.ai GIF 无限滚动，30s (desktop) / 10s (mobile)
- **证言轮播**: 3s 自动播放，hover 暂停，prev/next 按钮，tripled 数组无限循环
- **项目展示**: 3 个项目垂直堆叠，IntersectionObserver 独立触发
- **Partner Section**: 鼠标悬停时 GIF 缩略图跟随光标出现（随机旋转 -10°~+10°，1000ms 淡出）
- **固定底部导航**: Floating pill，多层阴影，"V" logo + CTA 按钮
- **色彩**: #051A24 (primary dark), #0D212C (secondary), #F6FCFF (light text)

---

## 11. Orbis.Nft（2.5/5）

### 项目配置
- **技术栈**: React + TypeScript + Vite + Tailwind CSS + lucide-react
- **字体**: Anton (headings, font-grotesk) + Condiment (cursive accent, font-condiment) + System monospace (body)
- **全局样式**: 背景 #010828（深海军蓝），文字 #EFF4FF（奶油白），强调色 #6FFF00（霓虹绿）

### 纹理叠加（★ 核心借用的技术）
- 全屏固定纹理覆盖层: `/texture.png`，z-50，pointer-events-none
- `mix-blend-mode: lighten`，opacity 0.6，background-size: cover
- **歌以铸魂转化 — 麻纸覆盖**: 宣纸纹理 PNG，mix-blend-mode: multiply，opacity 0.15-0.25

### Marquee
- 同 Halo 的 CSS marquee 无限滚动

### Liquid Glass
- 用于导航栏、社交图标、NFT 卡片、卡片叠加层
- 同 Aura 的 liquid-glass 实现

### 其他技术要点
- **Hero**: 全屏视频背景 + Anton 大标题 "Beyond earth and (its) familiar boundaries" + Condiment cursive "Nft collection" neon green overlay
- **About**: 视频背景 + "Hello! I'm orbis" + 装饰性半透明重复段落
- **NFT Grid**: 3 列，每卡含方形视频 (pb-[100%]) + RARITY SCORE 叠加条 + 紫色渐变箭头按钮
- **CTA**: 视频背景（非 object-cover，原生比例）+ "JOIN US. REVEAL WHAT'S HIDDEN..." + 社交图标竖排容器

---

## 12. Axion Studio（2.5/5）

### 项目配置
- **技术栈**: React 18 + TypeScript + Vite + Tailwind CSS 3.4 + shaders npm + lucide-react
- **字体**: 系统默认（无自定义字体）
- **全局样式**: 背景 #EFEFEF (hero) / white (about) / #F5F5F5 (case studies)
- **最大内容宽度**: 1440px

### Shader 背景（★ 核心借用的技术）
使用 `shaders/react` 包，4 层 shader 叠加:
- **Swirl**: colorA #ffffff, colorB #f0f0f0, detail 1.7
- **ChromaFlow**: baseColor #ffffff, 四向颜色 #ff5f03, momentum 13, radius 3.5
- **FlutedGlass**: aberration 0.61, angle 31, frequency 8, highlight 0.12, refraction 4
- **FilmGrain**: strength 0.05
- 全屏绝对定位，z-10，pointer-events-none

### 其他技术要点
- **Navbar**: 白色药丸导航，Live London 时钟（每秒更新），文本滚动 hover 动画
- **Mobile Menu**: 底部弹出面板，cubic-bezier(0.32,0.72,0,1) 滑动
- **Hero**: Shader 背景 + "We craft digital experiences / for brands ready to dominate / their category online."
- **About**: 两图布局（小图 + 大图），桌面端 3 列 grid
- **Case Studies**: Narrativ + Luminar 两张卡片，hover 展开按钮（白色/深色圆变药丸）
- **按钮**: 橙色 #F26522，文本滚动 hover 动画（translateY -50%），ArrowRight 旋转 -45°
- **Partner Badge**: 复杂 SVG 星爆/罗盘图标

---

## 13. Dental Clinic（2.3/5）

### 项目配置
- **技术栈**: React + Vite + TypeScript + Tailwind CSS，无外部 UI/图标库
- **字体**: Open Sauce One (Webfont CDN)
- **全局样式**: 单文件 App.tsx

### MaskedCard（★ 核心借用的技术）
- **核心概念**: 单张图片通过多个卡片窗口展示，每个卡片显示图片的不同区域
- **useMaskPositions hook**: ResizeObserver 监听 section 容器，计算每张卡片相对 section 的 offset {x, y, sw, sh}
- **useImageWidth hook**: 加载 Image() 对象，计算 `renderWidth = img.naturalWidth * (sectionHeight / img.naturalHeight)`
- **MaskedCard 组件**: 
  - 计算 `overflow = imageWidth > position.sw ? imageWidth - position.sw : 0`
  - `focalOffset = overflow * focalX`
  - inline style: `backgroundImage/Size/Position/Repeat` 实现窗口效果
- **focalX**: Section 1 mobile 0.7/desktop 0.8，Section 2 mobile 0.65/desktop 0.8
- **歌以铸魂转化**: 可用于长卷画作的多个局部特写展示

### useStaggeredReveal hook
- IntersectionObserver (threshold 0.15)，once
- `getAnimStyle(index)`: opacity/translateY transition，stagger 120ms，cubic-bezier(0.16,1,0.3,1)

### 其他技术要点
- **Splash Screen**: 白色全屏，左下角计数器 0→100 (2000ms)，淡出 700ms
- **Navbar**: 白色/80 毛玻璃，双行 logo "Dental" "Health" + "quality healthcare"
- **Hamburger**: 3 条线 → X 变换，cubic-bezier(0.76,0,0.24,1)，全屏滑出面板
- **Section 1 (Hero)**: 3 条 Feature Bar + 1 张大 Hero Card，共享 HERO_IMAGE
- **Section 2 (Smile Gallery)**: 4 张卡片网格（2×2），共享 SECTION2_IMAGE，含服务子卡片
- **Section 3 (Implant Dentistry)**: 双栏布局（文字 + 图片 + 咨询卡 | 大图 + 叠加卡）

---

## 14. Halo（2.0/5）

### 项目配置
- **技术栈**: React + TypeScript + Vite + Tailwind CSS + lucide-react
- **字体**: TT Norms Pro (@font-face, woff2, 400 + 600)
- **全局样式**: 背景 #F5F5F5，max-w-[88rem]

### CSS Marquee 无限滚动（★ 核心借用的技术）
- 注入 scoped `<style>`，`@keyframes marquee { 0%: translateX(0); 100%: translateX(-50%); }`
- `.marquee-track { display: flex; width: max-content; animation: marquee 22s linear infinite; }`
- 品牌列表渲染两次实现无缝循环
- **Hero marquee**: 22s，品牌名（Stripe, Coinbase, Uniswap, Aave, Compound, MakerDAO, Chainlink），各具独特字体风格
- **Backers marquee**: 30s，`.backers-track`，投资方名（Fundamental Labs, KUCOIN, NGC, NxGen, Matter Labs, DEXTools, NGRAVE, Polychain）
- **歌以铸魂转化**: 经典诗词慢速横滚，60-80s 完成一圈

### 其他技术要点
- **LogoIcon**: 自定义 SVG，"halo" 双联锁圆角方形，currentColor
- **Navbar**: absolute 透明，左 LogoIcon + "Halo"，中 5 链接，右 "Open Wallet" 黑药丸
- **Hero**: 视频背景 `calc(100vh - 96px)`，h1 "Your Wealth Works"（-0.04em letterSpacing），"Join us" 药丸按钮 + 白色圆形箭头
- **Info Section**: "Meet USD Halo." + 4 列卡片网格（Savings that bloom / Always fluid / Fully automated）
- **Use Cases**: 双栏（文字 + 视频），"Commerce" 叠加内容 + "Know more" 链接
- **字体强调**: 每个品牌使用不同 font-family/weight/letterSpacing/style 营造多样性

---

## 15. prmpt（2.0/5）

### 项目配置
- **技术栈**: React 19 + TypeScript + Vite 6 + Tailwind CSS v4 + GSAP 3.15 + Motion 12 + hls.js
- **字体**: Inter Tight (weight 500)
- **全局样式**: 白色背景，user-select: none

### 光标视频擦洗（★ 核心借用的技术）
- Desktop: 两个视频（左/右），不自动播放，通过 cursor X 位置 scrubbing
- Dead zone: `Math.max(30, width * 0.05)` 像素
- 左侧显示右视频，右侧显示左视频
- 关键优化: `if (!video.seeking)` 才更新 currentTime，避免抖动
- Mobile: 视频交替自动播放（ended 事件切换）
- **歌以铸魂转化**: 可用于卷轴的"触控展开"交互

### 其他技术要点
- **Custom Cursor**: 固定跟随鼠标，mix-blend-mode: exclusion，48x48 SVG 圆形 + 日本装饰文字
- **所有 UI 覆盖层**: mix-blend-mode: exclusion + pointer-events-none
- **Logo**: 固定左上，"prmpt" 字标 SVG + 圈 R 标记
- **Product Info**: 固定右下，ARCHIVE COLLECTION "PROMPT" + $97,33，scroll 驱动符号随机化
- **Gallery**: 黑色面板从下方滑入 (GSAP ScrollTrigger scrub)，散落图片网格
- **图片缩放**: RAF 每帧计算，基于卡片垂直位置 scale(0-1)，左半 right bottom origin，右半 left bottom
- **滚动阶段**: Phase 1 (面板滑入) → Phase 2 (图片滚动) → Outro (白色叠加 + "view" 按钮)
- **间距高度**: 动态计算 `vh + maxScroll + 2*vh`

---

## 16. SkyElite（1.5/5）

### 项目配置
- **技术栈**: React + TypeScript + Tailwind CSS + Lucide React
- **字体**: Inter (400-700)，Google Fonts
- **全局样式**: 背景 gray-50，min-h-screen

### 技术要点
- **Hero**: 全屏视频背景 (object-cover, 100vh)，autoplay/muted/loop/playsInline
- **Navbar**: "SkyElite" 品牌 + 桌面菜单 (Start, Story, Rates, Benefits, FAQ) + 移动端 Hamburger (Menu/X)
- **标题**: "Premium." / "Accessible." 双行重叠 (-mt-12)，不同灰色调 (gray-500 / #202A36)
- **CTA**: "Discover" (gray-300 pill) + "Book Now" (#202A36 pill)，hover 过渡
- **移动菜单**: 白色/95 毛玻璃下拉，backdrop-blur，圆角阴影

---

## 17. CodeNest（1.3/5）

### 项目配置
- **技术栈**: React + TypeScript + Tailwind CSS + hls.js + lucide-react
- **字体**: Inter + Plus Jakarta Sans + Instrument Serif (italic)
- **全局样式**: 暗色主题

### HLS.js 视频流（★ 核心借用的技术）
- HLS 源: `https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8`
- `enableWorker: false` 确保沙箱环境稳定
- 视频 60% opacity + 暗色渐变叠加（左→右 + 下→上）

### 其他技术要点
- **Grid Lines**: 3 条垂直细线 (white/10)，25%/50%/75% 位置
- **Central Glow**: 水平 SVG ellipse，cyan/dark green，25px Gaussian blur
- **Liquid Glass Card**: 200x200px 浮动卡片，translate-y-[-50px]，同 Aura 的 liquid-glass + ::before 渐变边框
- **Hero Content**: "LAUNCH YOUR CODING CAREER." Inter Extra Bold，最后句号绿色 #5ed29c
- **Navbar**: Sticky，白色极简 logo，PROJECTS/BLOG/ABOUT/RESUME 链接
- **Mobile Menu**: 全屏暗色叠加

---

## 各规格书技术要点速查

### Dental Clinic（2.3/5）
- MaskedCard：单张图片通过多个卡片窗口展示，computed background-position
- 交错入场动画

### Aura（4.5/5）
- SVG noise 滤镜：feTurbulence + feColorMatrix + feComposite + feBlend
- Liquid-glass 效果：rgba(255,255,255,0.01) + backdrop-filter blur + ::before mask-composite
- Shiny gradient text：backgroundSize 200%，animate background-position，background-clip: text

### Drift（3.5/5）
- IntersectionObserver 驱动 scroll 动画
- 克制节奏：duration ≥ 800ms，stagger 120-200ms

### ASME（4.0/5）
- BlurText 组件：word-by-word staggered blur-in
- FadingVideo：RAF-based video opacity crossfade

### Orbis.Nft（2.5/5）
- 全页纹理叠加：fixed z-50 texture image with mix-blend-mode
- marquee 横滚

### Mindloop（3.3/5）
- useScroll + useTransform 逐词 reveal
- HLS.js 视频流

### Michael Smith（3.3/5）
- GSAP ScrollTrigger 三层视差
- GSAP xPercent marquee
- HLS.js 视频

### NHM（5.0/5）★ 最优
- SandTransitionImage：SVG filter chain for particle/dissolve transitions
- SVG letter animation：y:120→0 letterBlock variant，cubic-bezier(0.16,1,0.3,1)

### Jack（3.0/5）
- 卡片堆叠 scale 效应：useScroll + useTransform for sticky scaled cards
- AnimatedText：scroll offset 映射 opacity

### SynapseX（2.8/5）
- ScrambleIn/ScrambleText：字符随机化揭示
- 光标视频擦洗：horizontal mouse position → video currentTime

### Viktor Oddy（2.8/5）
- 多层按钮阴影：0_1px_2px_0 + 0_4px_4px_0 + 0_9px_6px_0 + 0_17px_7px_0 + 0_26px_7px_0 + inset_0_2px_8px_0
- 鼠标轨迹 GIF + 交错入场

### Axion Studio（2.5/5）
- shaders 包：Swirl、ChromaFlow、FlutedGlass、FilmGrain 组件
- 自定义字体 via @font-face

### Halo（2.0/5）
- CSS marquee 无限滚动

### prmpt（2.0/5）
- 光标视频擦洗：video.currentTime mapped to cursor X position

### SkyElite（1.5/5）
- 基础 hover 效果

### CodeNest（1.3/5）
- HLS.js 视频流
- 基本静态布局

### 设计机构（3.8/5）
- BlurText：word-by-word blur-in using Framer Motion

---

## 设计约束

来自 [[geyi-zhuhun-design-persona]]：

- 配色 ≤5 色：宣纸 #F6E4CF、墨黑、朱砂红、铜绿、古金
- 字体：宋体/楷体/雕版字，不用现代圆体
- 拒绝：Material 阴影、胶囊按钮、紫调、网格线背景、4px 粗黑描边
- 追求：古籍版式、卷轴隐喻、竖排交错、阴文朱印、纸纤维纹理、墨水晕开/印章盖下/卷轴展开
- 动画原则：节奏慢（≥800ms）、不规则（微随机延迟）、有物质感（墨/纸/金石）、不炫技
