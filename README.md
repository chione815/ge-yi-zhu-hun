# 歌以铸魂项目展示网站

本目录是“歌以铸魂：“中国风”流行音乐对青少年家国情怀的建构机制与效果研究”的静态展示网站工程。当前版本在原 GitHub Pages 静态网站基础上完成二次修改，保留原有国风、水墨、粗黑边框、书法标题和单页联动结构。

## 网站入口

- 入口文件：`index.html`
- 本地预览地址：`http://127.0.0.1:8000/`

## 本地运行

```powershell
cd D:\1renwu\6_12_900\1
python -m http.server 8000 --bind 127.0.0.1
```

浏览器访问：

```text
http://127.0.0.1:8000/
```

## 页面模块

- 首页：使用新版主视觉图展示项目主题，并保留项目介绍、核心数据、理论框架。
- 研究成果：展示三项成果，并保留问卷与访谈、代表曲目热度、评论编码与问题分析三个研究支撑模块。
- 微课堂：5 个项目微课视频，均使用页面内嵌视频播放器。
- 团队介绍：项目负责人、成员分工、指导教师与项目信息。

## 二次修改内容

- 首页红框主视觉已替换为 `assets/images/home-hero.jpg`。
- 研究成果一展示《“中国风”流行音乐对青少年家国情怀的建构机制与现实困境》的题目、中文摘要和录用通知。
- 研究成果二展示《数字音乐平台热门国风歌曲的家国叙事研究》的题目、中文摘要，并通过“查看荣誉证书”按钮打开证书图片。
- 研究成果三展示“教具名称：一种音乐教具”、专利简介和 6 张说明书附图。
- 项目类型文字已统一为“国家级创新训练项目”。

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
│  │  ├─ home-hero.jpg
│  │  ├─ honor-certificate.jpg
│  │  ├─ patent-2.jpg
│  │  ├─ patent-3.jpg
│  │  ├─ patent-4.jpg
│  │  ├─ patent-5.jpg
│  │  ├─ patent-6.jpg
│  │  ├─ patent-7.jpg
│  │  └─ lesson-*-poster.jpg
│  ├─ videos
│  │  └─ lesson-1.mp4 至 lesson-5.mp4
│  ├─ pdf
│  │  ├─ design.pdf
│  │  ├─ paper-acceptance.pdf
│  │  └─ lyric-comment-analysis.pdf
│  ├─ docs
│  │  ├─ paper-construction-mechanism.docx
│  │  ├─ paper-guofeng-narrative.docx
│  │  ├─ survey-interview-report.docx
│  │  └─ interview-conclusion.docx
│  └─ data
│     ├─ song-popularity.xlsx
│     └─ comment-coding.xlsx
├─ DEPLOYMENT.md
├─ SELF_CHECK.md
└─ README.md
```

## 交互说明

- 顶部导航可跳转到首页、研究成果、微课堂、团队介绍。
- 研究成果中的按钮可打开录用通知、荣誉证书、数据表和分析材料。
- 专利图片可点击打开大图。
- 5 个视频均可直接播放，播放任意一个视频时会暂停其他视频。
- 移动端导航折叠为菜单按钮。
- 页面滚动时导航会自动高亮当前模块。
- 右下角返回顶部按钮在滚动后显示。
