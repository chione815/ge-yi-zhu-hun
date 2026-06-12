# 歌以铸魂项目展示网站

本目录是“歌以铸魂：“中国风”流行音乐对青少年家国情怀的建构机制与效果研究”的静态展示网站，可用于项目汇报、PPT、商业计划书和本地演示。

## 网站入口

- 入口文件：`index.html`
- 本地预览地址：`http://127.0.0.1:8000/`

## 本地运行

在当前目录运行：

```powershell
cd D:\1renwu\6_12_900\1
python -m http.server 8000 --bind 127.0.0.1
```

浏览器访问：

```text
http://127.0.0.1:8000/
```

也可以直接双击 `index.html` 打开，但推荐使用本地服务预览，视频和资源加载更稳定。

## 页面模块

- 首页：项目主视觉、项目介绍、核心数据展示、理论框架展示。
- 研究成果：论文成果、问卷与访谈、代表曲目热度、评论编码与问题分析。
- 微课堂：5 个项目微课视频，均使用页面内嵌视频播放器。
- 团队介绍：项目负责人、成员分工、指导教师与项目信息。

## 项目结构

```text
1
├─ index.html
├─ css
│  └─ style.css
├─ js
│  └─ main.js
├─ assets
│  ├─ images
│  │  ├─ logo.png
│  │  ├─ lesson-1-poster.jpg
│  │  ├─ lesson-2-poster.jpg
│  │  ├─ lesson-3-poster.jpg
│  │  ├─ lesson-4-poster.jpg
│  │  ├─ lesson-5-poster.jpg
│  │  ├─ render-check-desktop.png
│  │  └─ render-check-mobile.png
│  ├─ videos
│  │  ├─ lesson-1.mp4
│  │  ├─ lesson-2.mp4
│  │  ├─ lesson-3.mp4
│  │  ├─ lesson-4.mp4
│  │  └─ lesson-5.mp4
│  ├─ pdf
│  │  ├─ design.pdf
│  │  ├─ paper-acceptance.pdf
│  │  ├─ project-application.pdf
│  │  └─ lyric-comment-analysis.pdf
│  ├─ docs
│  │  ├─ paper.docx
│  │  ├─ survey-interview-report.docx
│  │  └─ interview-conclusion.docx
│  └─ data
│     ├─ song-popularity.xlsx
│     └─ comment-coding.xlsx
├─ DEPLOYMENT.md
├─ SELF_CHECK.md
└─ README.md
```

## 已接入素材

- 项目 logo：由根目录 `1.png` 复制为 `assets/images/logo.png`。
- 微课视频：由根目录 `1.mp4` 至 `5.mp4` 复制为 `assets/videos/lesson-1.mp4` 至 `lesson-5.mp4`。
- 设计依据：`歌以铸魂_202606041056_23806.pdf` 复制为 `assets/pdf/design.pdf`。
- 成果材料：项目申报书、论文录用通知、歌词评论分析汇总、问卷访谈报告、访谈结论、论文文档、歌曲热度表、评论编码表。

## 交互说明

- 顶部导航可跳转到四个主模块。
- 首页按钮可跳转到“研究成果”和“微课堂”。
- 5 个视频均可直接播放，播放任意一个视频时会暂停其他视频。
- 移动端导航折叠为菜单按钮。
- 页面滚动时导航会自动高亮当前模块。
- 右下角返回顶部按钮在滚动后显示。
