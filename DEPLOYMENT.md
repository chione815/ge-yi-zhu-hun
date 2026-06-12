# 部署说明

本网站是纯静态项目，不需要后端服务。部署时只需要发布 `D:\1renwu\6_12_900\1` 目录内的全部文件。

## 本地预览

```powershell
cd D:\1renwu\6_12_900\1
python -m http.server 8000 --bind 127.0.0.1
```

访问：

```text
http://127.0.0.1:8000/
```

## GitHub Pages

适用场景：展示网站源码、生成长期可访问的网址。

步骤：

1. 新建 GitHub 仓库。
2. 将 `1` 目录内的所有文件放到仓库根目录。
3. 提交并推送到 `main` 分支。
4. 进入仓库 `Settings` → `Pages`。
5. Source 选择 `Deploy from a branch`。
6. Branch 选择 `main`，目录选择 `/root`。
7. 保存后等待部署完成。

访问地址通常为：

```text
https://用户名.github.io/仓库名/
```

注意：本项目视频文件较大。如果 GitHub 提示单文件过大，需要先压缩视频，或将视频放到稳定的视频/对象存储服务，再把 `index.html` 中的 `<source>` 路径改为对应公开地址。

## Netlify

适用场景：快速拖拽部署静态网站。

步骤：

1. 登录 Netlify。
2. 选择 `Add new site`。
3. 选择从 Git 仓库导入，或直接拖拽 `1` 目录。
4. Build command 留空。
5. Publish directory 使用项目根目录。
6. 部署完成后，Netlify 会生成一个公开访问地址。

如果使用 Git 仓库导入，确保仓库根目录就是 `index.html` 所在目录。

## Vercel

适用场景：通过 Git 仓库持续部署静态网站。

步骤：

1. 登录 Vercel。
2. 新建项目并导入仓库。
3. Framework Preset 选择 `Other`。
4. Build Command 留空。
5. Output Directory 留空或填写 `.`。
6. 部署完成后，Vercel 会生成一个公开访问地址。

## 视频文件处理建议

当前网站已直接嵌入 5 个 MP4 文件，适合本地演示。如果要公网部署，建议根据平台限制和访问速度做以下处理：

- 使用视频压缩工具将单个 MP4 文件压缩到更小体积。
- 保持文件名不变，替换 `assets/videos/lesson-1.mp4` 至 `lesson-5.mp4`。
- 若改用外部视频地址，更新 `index.html` 中 5 个 `<source src="...">`。
- 压缩后重新运行本地预览，确认视频可播放。

## 发布前检查

部署前建议重新检查：

```powershell
cd D:\1renwu\6_12_900\1
python -m http.server 8000 --bind 127.0.0.1
```

打开 `http://127.0.0.1:8000/` 后检查导航、视频、图片和文档链接是否正常。
