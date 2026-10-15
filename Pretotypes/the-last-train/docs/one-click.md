# 为什么有两个入口？

原项目与本 pretotype 使用 Express / Socket.IO 将每个人的私人视图和行动同步到一个共享房间。AidanBlackmore/INF2573-Group-4 的 main README 同样要求安装 Node 并运行 npm start，服务器打印本机和 Wi-Fi 地址。检查的上游提交为 d51ab4237518767bc9d064c45c4c0463b030174c；没有直接复用未经存在验证的部署地址。

“把 public/index.html 双击打开”无法替代服务器。为了让展示更方便，这次将相同规则、场景、页面与 SVG 合并为一个独立 HTML，提供一真人加三 bot 的本地演示。这种文件可以通过邮件或 ZIP 分发，也适合放到静态网页托管；它不承担跨手机房间同步。

“给朋友发一个链接就能一起玩”则需要一次服务器部署。仓库根目录 render.yaml 指向 Pretotypes/the-last-train，使用 Node、npm ci --omit=dev、npm start 和 /healthz，默认 mock、free、单实例。Deploy to Render 按钮会引导仓库使用者在自己的账户审核并创建服务；没有在仓库中放任何 token 或 API key。

单实例是因为房间在内存中。不要直接横向扩容成多个副本，否则不同客户端可能进入不同的内存房间。服务器重启、免费服务休眠后可能需要开新局。

本地双击启动器负责检查 Node、按锁文件安装依赖、选择可用端口、启动服务器、打开浏览器。它不捆绑 Node 运行时，所以第一次仍需要安装 Node；这与无需安装的 HTML 演示版不同。

参考：
- [上游 README](https://github.com/AidanBlackmore/INF2573-Group-4/blob/main/README.md)
- [Render Node Express](https://render.com/docs/deploy-node-express-app)
- [Render WebSockets](https://render.com/docs/websocket)
- [Render Blueprint](https://render.com/docs/blueprint-spec)
- [Render 部署按钮](https://render.com/docs/deploy-to-render)
