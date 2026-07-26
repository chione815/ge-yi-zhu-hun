# 17 份 Landing Page 规格书分析

> 为「歌以铸魂」网页优化收集的参考素材，2026-07-26 分析完成。

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

## TOP 8 动画技术详解

### 1. NHM — SandTransitionImage（5.0/5）★ 最适配

**原始效果**：图像切换时画面像沙子被吹散溶解，900ms 完成。

**技术链**：
```
feTurbulence(fractalNoise)
  → feDisplacementMap(scale 0→150)
    → feOffset(dy 向上偏移)
      → feGaussianBlur(最大6px)
        → feColorMatrix(alpha 淡出)
```

**歌以铸魂转化 — 墨染渗透**：
- baseFrequency 降为 0.5，模拟墨迹在宣纸纤维上的不规则渗透
- displacementMap scale 降为 0→120，墨迹缓慢扩散而非飞散
- feOffset 去掉水平偏移，仅向下渗透
- feGaussianBlur 降为 0→4px，墨迹边界保持锐利
- feColorMatrix 过渡中间态呈现墨蓝色

**应用**：卷轴翻页、画作/书法切换、印章盖下的朱砂渗透。

---

### 2. Aura — Noise 滤镜 + 光泽动画（4.5/5）

**效果 A**：feTurbulence + feColorMatrix + multiply 混合 → 微妙颗粒感叠加。
**效果 B**：background-position 水平移动 6s 循环 → 文字内部光泽从左到右流动。

**歌以铸魂转化**：
- **纸纹呼吸**：baseFrequency 0.3，opacity 0.03↔0.06，8s 循环
- **金粉流光**：古金色系渐变，#C4A35A→#8B6914→#E8D5A3，15s 慢速流动，仅用于标题中 1-2 个关键词

---

### 3. ASME — BlurText + FadingVideo（4.0/5）

**效果 A**：逐词从 blur(10px) + y:50 → blur(0) + y:0，stagger 100ms。
**效果 B**：RAF 控制 opacity 实现 500ms 平滑淡入淡出循环。

**歌以铸魂转化 — 墨韵渐显**：
- 去掉位移，仅保留模糊变化：blur(8px)→0
- opacity 从 0.3→1（初始淡墨灰，非全透明）
- stagger 延至 150ms（纸墨交融的从容感）
- 渐入时间从 500ms 拉长到 1200ms

---

### 4. 设计机构 — BlurText 逐词模糊（3.8/5）

**原始效果**：display: flex; flexWrap: wrap 实现逐词换行模糊动画。

**歌以铸魂转化 — 竖排逐字着墨**：
- 文字方向改为竖排（writing-mode: vertical-rl）
- stagger 延至 200ms（竖排阅读节奏更慢）
- 从上到下依次"着墨"，模拟雕版印刷刷子从上方刷过

---

### 5. Drift — IntersectionObserver 滚动驱动（3.5/5）

**原始效果**：IntersectionObserver 驱动的 scroll 动画，克制节奏。

**借鉴价值**：设计节奏感——动画不是越快越好，古意需要缓慢从容的节奏。delay 和 duration 的参考标杆。

---

### 6. Mindloop — useScroll 逐词 reveal（3.3/5）

**原始效果**：Framer Motion useScroll + useTransform，将每个词的 opacity 从 0.15 映射到 1。

**歌以铸魂转化 — 卷轴展读**：
- 改为逐句/逐段而非逐词
- 加入 clip-path: inset(0 100% 0 0) → inset(0 0 0 0)，从右向左揭开
- 配合微弱 sepia 色偏过渡

---

### 7. Michael Smith — GSAP Parallax + Marquee（3.3/5）

**原始效果 A**：ScrollTrigger 三层视差（背景/中景/前景不同速度）。
**原始效果 B**：xPercent: -50 无限循环跑马灯。

**歌以铸魂转化 — 山水远近**：
- 远山层（最慢，opacity 0.3）→ 淡墨渲染
- 近树层（中等）→ 浓墨勾勒
- 文字层（最快）→ 焦墨题字
- marquee 改为经典诗词慢速横滚（60s 完成一圈）

---

### 8. Jack — 卡片堆叠 + AnimatedText（3.0/5）

**原始效果 A**：3 张卡片 sticky 堆叠，逐层 scale 缩小（1→0.97→0.94）。
**原始效果 B**：每个字符根据 scroll offset 从 opacity 0.2→1。

**歌以铸魂转化 — 经折装翻页**：
- 不用 scale，改用 rotateY + transformOrigin
- 奇数页左侧为轴翻转，偶数页右侧为轴
- perspective 1200px，折缝处加古铜色阴影线

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
