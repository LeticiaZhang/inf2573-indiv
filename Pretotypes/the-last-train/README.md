# The Last Train · Pretotype

一个可运行的线下朋友角色扮演实验：3–6 人、每人一部手机，在同一个房间里用不同的私人线索讨论同一趟末班列车。英文游戏界面，中文实验说明。完整三章，无需 API key。

## 最简单的打开方式

**只想马上体验 / 给老师展示：**

1. [下载零安装演示包](https://github.com/LeticiaZhang/inf2573-indiv/raw/refs/heads/main/Pretotypes/the-last-train/downloads/The-Last-Train-Offline.zip)。
2. 解压，双击 **`Play-The-Last-Train.html`**，用浏览器打开。
3. 输入名字，点击 **Play solo with 3 bots**。

也可以[只下载这个 HTML 文件](https://github.com/LeticiaZhang/inf2573-indiv/raw/refs/heads/main/Pretotypes/the-last-train/Play-The-Last-Train.html)。不需要安装软件、运行命令、API key 或联网。文件包含全部图片与逻辑；**它是一个真人加三个 bot 的完整三章演示，不能让其他手机加入同一局，也不包含 Classic**。刷新会尽量恢复本标签页的进度；如果浏览器禁止本地文件储存，则刷新后需重新开始。

**想让朋友各用自己的手机一起玩：**

- 本机主持：下载仓库 ZIP 并解压。在本目录双击 Mac 的 **`Start-Multiplayer.command`** 或 Windows 的 **`Start-Multiplayer.cmd`**。需要先安装一次 [Node.js LTS](https://nodejs.org/)；启动器第一次会联网准备依赖，之后自动启动服务器并打开浏览器。主持电脑需保持运行，朋友连接同一 Wi-Fi 并打开屏幕提示的地址。系统若阻止打开脚本，可使用下方手动运行步骤。
- 在线链接：点击 [Deploy to Render](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2FLeticiaZhang%2Finf2573-indiv)，首次登录自己的 Render 账户并确认部署。部署成功后，把服务生成的 **`https://…onrender.com`** 地址发给朋友，他们只需点击链接，无需安装或同一 Wi-Fi。**当前已提供部署配置，还没有在你的 Render 账户中创建服务；部署按钮本身不是游戏链接。**

多人服务使用仓库根目录 `render.yaml`，默认 free 方案、mock、一个实例、关闭自动部署；确认时以账户实际可用方案为准。免费服务可能休眠，首次打开需等待唤醒；重启会清空内存房间。参考 [Render 快速部署说明](https://render.com/docs/deploy-to-render) 与 [免费服务限制](https://render.com/docs/free)。

## 多人版手动运行

需要 Node.js 18+。在本文件所在目录执行：

```sh
npm ci
npm start
```

电脑打开 `http://localhost:3000`。首页输入名字后可选择：

- **Gather your crew**：创建四字母房间；朋友连接同一 Wi-Fi，打开终端打印的 `Phones on Wi-Fi` 地址，输入名字和房间码。3–6 人到齐后开始。
- **Try with bots**：一真人加三位明确标注 BOT 的玩家。bot 公开固定线索，用 Safe / Supply、Care、Cover 的固定分工；真人仍能改变行动、投票与分支。为了便于展示，demo casting 为 12 秒、投票为 8 秒，其他规则与真人局相同。
- **Play Classic**：保留原项目玩法，地址 `/classic/`。没有传入 `mode` 的建房请求仍默认 Classic。

端口被占用时运行 `PORT=3137 npm start`。不要在手机上输入 localhost；它指的是手机自己。游戏需要持续运行的 Node 服务，不能直接用 GitHub Pages 托管。

## 体验流程

三题 casting → 推荐角色与双方换角 → 三章（读线索、面对面讨论、个人行动、团队投票、逐人揭晓、资源账单）→ 共同结局与私人愿望回顾。

每人每章选择 Supply / Care / Cover 与 Safe / Bold。Safe 保证 1 贡献；Bold 掷 d6，修正后至少 4 得到 2 贡献，失败增加 1 Alert。角色专长 +1，一次性 Focus +2。每轨道达到 Q=ceil(初始人数/2) 时触发一次收益。所有变化合并后再将资源限制在 0–6。

原始骰点由服务端生成和保存，动画和重复请求不重新掷骰。Ready 不锁行动，投票截止才锁定。缺交默认 Safe/Cover。团队平票由轮换 captain 的有效票决定，其缺交时按冻结座位最靠前的有效并列票决定；全员缺交用 Battery / Tunnel / Service。

三种结局：Clean Escape、Costly Escape、Train Stalled。个人愿望独立于共同结果；只有本人点击 Reveal my wish 才公开。

## 私人情报分配

前三位角色始终出现，因此 3、4、6 人都具有通关必需信息：

| 角色 | 专长 | 每章关键信息 / 提醒 | 私人愿望 |
| --- | --- | --- | --- |
| Runner | Supply | 电池收益和警报；隧道耗油；Launch 的代价 | 至少一次 Supply 成功 |
| Mechanic | Supply | 手摇机不加油；电池影响通风；启动燃料门槛 | 第三章 Service |
| Mediator | Care | 站台灯影响 Signal；Signal 收益；Hope/Alert 结局门槛 | 任一章 Care 达标 |
| Scout | Cover | 路线与 Alert 提醒 | 第二章 Tunnel |
| Quartermaster | Supply | 燃料余量提醒 | 结局 Fuel ≥3 |
| Chronicler | Care | 站台历史与 Hope 提醒 | 结局 Hope ≥3 |

额外角色不独占必要信息。正常房间不自动广播秘密。双方接受的换角会交换整个角色包，确认后锁定；每人最多参与一次成功交换。

## 可核算的示例局

3 人、Q=2、初始 Fuel2 / Hope2 / Alert0。`npm run simulate:heist` 用可注入时钟和骰点复现，输出所有账单。

1. Runner Bold/Supply 掷 3，专长 +1，贡献 2；另外两人 Safe/Cover。投 Battery。结果 **5 / 2 / 0**。
2. Runner 与 Mechanic Safe/Supply；Mediator Bold/Care 掷 4，专长 +1。投 Tunnel，电池旗标引发 Hope −1。结果 **5 / 2 / 0**。
3. Runner 与 Mechanic Safe/Cover；Mediator Safe/Care。投 Service。结果 **5 / 2 / 0 → Clean Escape**，三人愿望均达成。

另有全 Safe 通关测试；冒险不是通关必要条件。失败结局和 Costly 的双重条件有纯规则测试。

## 验证

```sh
npm run build:offline    # 更新源代码后重新生成独立 HTML
npm test                 # 规则和状态机测试，不实际等待计时器
npm run simulate:heist   # 3 / 4 / 6 人完整三章，逐章账单
npm run simulate         # 原 Classic 的 4 人 Socket.IO 完整一局
# 另一个终端已启动 PORT=3137 npm start 时：
node scripts/socket-smoke.js
# 其他端口：TEST_URL=http://localhost:3000 node scripts/socket-smoke.js
```

实际结果、浏览器检查范围及未验证项见 [测试记录](docs/validation.md)。线下实验观察表见 [实验指南](docs/playtest.md)。

## 实现结构

- `config/heist/content.js`：固定三章、六角色、秘密、愿望与分支文案。
- `server/heist/rules.js`：可复核的纯规则函数。
- `server/heist/engine.js`：服务器时钟、阶段、骰点、角色交换、私有视图、幂等结算。
- `server/rooms.js`：统一受控入口；隔离 Classic 与 heist 的操作。
- `public/`：无需构建的原生手机界面；`public/classic/` 保留原界面。
- `test/`、`scripts/`：确定性规则、完整局模拟和真实连接验证。

## 已知边界

- 内存房间，不接数据库；刷新/短暂断线能恢复，**服务器重启会清空房间**。重连凭据保存在同一浏览器标签页；关闭该标签后没有账号恢复流程。
- 全体真人离线暂停阶段时钟，首次重连恢复剩余时长；房主离线 30 秒后移交给在线真人。下一章开始时少于 3 人在线则等待，房主可结束为 Session ended early。
- 第一版为固定脚本，明确标注 Scripted demo。The Last Train 不调用 LLM；Classic 保留原有 mock/live/fallback 配置。
- demo 的机器人不是用户研究参与者。实际两组四人的线下讨论、参与率、复玩意愿与跨设备 Wi-Fi 稳定性，仍需真实测试；没有把模拟通过当作需求验证。
- 结尾房主可下载匿名事件 JSON：事件类型、局内 p1 等匿名编号、时间、章节和数值；不导出名字、token、秘密或愿望。该日志不录制真实对话，也不替代人工观察。
- 默认面向可信同网朋友的短时实验，未做互联网生产部署、持久化或负载测试。

## 来源

基于 `AidanBlackmore/INF2573-Group-4` 当前工作区的 Node / Express / Socket.IO 原型扩展，保留其 Classic 实现与配置。已参考上游 main 的 README、入口和依赖配置；上游也需要 Node 服务，未提供独立桌面安装包。新模式依据用户提供的 `design/02-roleplay-heist-claude-brief.md`。列车插画为本次创建的本地 SVG，不依赖外链素材或字体。AI 辅助实现与测试：OpenAI Codex。作品放入个人仓库 `inf2573-indiv/Pretotypes/the-last-train`，未修改小组仓库原有游戏代码。
