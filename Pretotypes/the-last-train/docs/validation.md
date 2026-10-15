# 实际验证记录

日期：2026-10-15。环境：macOS，本机 Node.js v24.21.0；无 API key，Classic 使用 mock。

## 已通过

- `npm test`：21 项测试通过，0 失败。
- `npm run simulate:heist`：3、4、6 人均完成全部三章，保持初始 N 和 Q，逐章输出原值、delta、终值；示例 3 人局每章精确为 Fuel5 / Hope2 / Alert0。
- `npm run simulate`：4 个真实 Socket.IO 客户端完成 Classic 三轮并抵达 recap，GM source 为 mock。
- `node scripts/socket-smoke.js`：本地运行服务器上，3 个独立客户端完成创建/加入；非房主开始、Classic 推进 heist、过期 phaseId 被拒绝；私人 casting 票未泄露；token 重连保留身份与已提交票。
- 浏览器：创建 bot 局、开始 casting、角色确认、选择 Supply/Bold/Focus、进入投票、逐人揭晓；刷新恢复原角色与已保存骰点。360px 手机视口下场景/资源/行动/揭晓可用，页面宽度与滚动宽度均为 360，没有横向溢出。

## 自动测试覆盖

穷举 1–6 骰点 × 专长有无 × Focus 有无；Safe 与非法 Safe+Focus；确定性 casting 与平票；3/4/6 人必要秘密覆盖；双方换角、邀请过期与互斥；Focus 撤回与只扣一次；Q 聚合；先合并再 clamp；chapterId 幂等；两种第二章旗标分支；团队多数、captain 平票及缺交默认；三种结局、Costly 两项条件；私人愿望公开隔离；全体离线暂停、时钟恢复、房主移交；少于 3 人等待和提前结束；Ready 后仍可编辑；10 秒读卡与 4 秒揭晓下限；全 Safe 协作通关；匿名研究日志字段限制。

## 验证边界

- 3/4/6 人完整 heist 局通过服务端状态机和可注入时钟验证；真实传输测试验证连接与权限，未用多台实体手机连续玩三章。
- 浏览器手动检查覆盖主要交互和第一章揭晓；未声称逐个点击了所有分支、所有手机型号或无障碍辅助技术。
- 未开展两组朋友的线下实验，因此没有真实参与率、复玩意愿或讨论时长结论。
- 未验证 Classic 的 live API；新模式不依赖 live API。


## 一键体验增量验证（2026-10-15）

- `npm test`：新增离线打包、浏览器运行环境三章模拟、离线刷新恢复测试，累计 **24 项通过**。
- 独立 HTML 由同一份 `content.js`、`rules.js`、`engine.js` 和界面自动生成，未维护第二套数值规则。无外部脚本、字体、图片请求；单人模式不请求 `/info`。
- Mac 启动脚本通过 Bash 语法检查；启动器通过 Node 语法与 `--check` 检查。Windows `.cmd` 未在 Windows 机器上实际双击验证。
- 自动浏览器的 URL 安全策略不允许访问 `file://`，因此未完成真实浏览器直接打开本地文件的人工点击测试。离线测试通过 Node VM 模拟浏览器运行环境；需在目标用户的浏览器实际双击验收。
- `render.yaml` 已按 Render 官方 Blueprint 文档配置；未登录 Render、未实际创建云服务，未声称已有可玩的公网地址。
- 云端加入地址已改为当前网站域名，避免把容器私网 IP 发给朋友；本地 localhost 仍显示同 Wi-Fi 地址。

- 最终服务以 PORT=0 自动分配端口成功；实际三客户端连接、过期请求拒绝、重连测试及 /healthz 检查通过。
