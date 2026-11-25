# 三体 · 黑暗森林 —《最后一次看见太阳》

Remotion（React 代码驱动）制作的 120 秒电影感短片：1920×1080、30 FPS、3600 帧、五幕十五镜。
分镜与旁白见 [STORYBOARD.md](STORYBOARD.md)。核心意象：片头与片尾同一段摄影机横移，
第一次有纵深，第二次太阳系已失去深度。

## 背景图（ChatGPT 生图 + 代码动效）

`public/img/` 里的 6 张图由 ChatGPT 生成，已接入对应镜头，代码动效叠加其上：

| 镜头 | 图片 | 用法 |
| --- | --- | --- |
| 01 墓前 | `shot01-graveside.png` | 背景，随横移平移；代码墓碑/地面已移除（与照片冲突） |
| 02 河谷灯火 | `shot02-valley-lights.png` | 背景，随推镜缩放；代码灯光只落在河谷聚居带 |
| 08 眼睛 | `shot08-eye.png` | 背景，推镜以瞳孔为中心；迟到的光落入瞳孔（帧坐标约 1129, 492） |
| 12 艇舱 | `shot12-cabin.png` | 背景，压暗后衬托二维展开图解 |
| 14 搬画 | `shot14-carrying-starry-night.png` | 背景，缓慢推近画芯漩涡 |
| 15 舷窗 | `shot15-porthole.png` | 背景，作为同一幅画整体移动；前景视差由窗上划痕承担 |

其余 9 镜为纯代码画面（星图、光粒打击、二维展开等）。

## 渲染：用 GitHub Actions（不要在本地渲全片）

本地云电脑内存只有约 360–660MB 可用，全片 3600 帧本地渲不动。
渲染走 `.github/workflows/render.yml`：

1. 把本仓库 push 到 GitHub（main 分支）。
2. 打开仓库 → **Actions** → **Render Dark Forest film** → **Run workflow**
   （push 到 main 也会自动触发一次）。
3. 运行结束后，在该次运行页面的 **Artifacts** 里下载 `dark-forest-film`
  （即 `out/dark-forest-last-sun.mp4`）。

本地只做静帧检查：`npx remotion still src/index.ts DarkForestLastSun --frame=<帧号> qa/<名>.png`，
关键帧：100（镜 01）、330（镜 02）、1755（镜 08）、2700（镜 12）、3285（镜 14）、3510（镜 15）。
