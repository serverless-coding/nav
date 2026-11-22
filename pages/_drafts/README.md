# AI聊天详情页草稿（第二批，2026-11-22）

本目录不会上线（getAllPageSlugs 只读 pages/ 根目录）。审核后把 md 移到 `pages/`，并在 `data/links.json` 对应卡片加 `page` 字段。

## 草稿对照表

| 草稿文件 | links.json title（分类） | 建议 page 值 | 其他分类中的同名卡片（发布时一并加） | 未核实项 |
|---|---|---|---|---|
| doubao.md | 豆包（AI聊天） | doubao.md | 最热：豆包 | 免费额度；桌面端；专业版价格来自媒体报道，非官网直采 |
| kimi.md | Kimi Chat（AI聊天） | kimi.md | AI搜索：Kimi搜索（同一网址，可考虑共用） | 免费额度；桌面端 |
| chatglm.md | 智谱清言（AI聊天） | chatglm.md | 最热：智谱清言 | C 端会员价格；免费额度；清言当前默认模型 |
| wenxin-yiyan.md | 文心一言（AI聊天） | wenxin-yiyan.md | — | 2025 年免费后是否新增付费档；当前模型版本 |
| hailuo-ai.md | 海螺AI（AI聊天） | hailuo-ai.md | — | 国内站价格；对话功能是否仍保留（产品已转向视频） |
| xinghuo.md | 讯飞星火大模型（AI聊天） | xinghuo.md | 最热：讯飞星火大模型 | 会员档位；免费额度；C 端默认模型 |
| yuewen.md | 跃问（AI聊天） | yuewen.md | — | 价格；yuewen.cn 是否跳转到阶跃AI |
| zhida.md | 知乎直答（AI聊天） | zhida.md | — | 付费档位与额度；除 DeepSeek-R1 外的模型 |
| nami-ai.md | 纳米AI（AI聊天） | nami-ai.md | — | 会员价格；支持的模型列表 |
| baixiaoying.md | 百小应（AI聊天） | baixiaoying.md | — | 价格、App、功能，整体资料少，建议人工复核或暂缓发布 |

## 跳过的工具

- **通义千问**：pages/ 已有 `qwen.md`，且“最热”分类的通义千问卡片已用它。建议直接给 AI聊天分类的通义千问卡片加 `"page": "qwen.md"`，不另写。
- **腾讯元宝**：已有 `yuanbao.md`，卡片已挂载。
- **万知**：本批名额已满，未写。

## 发布前需注意

- 所有官网首页均抓取失败（反爬或需 JS），价格和功能主要来自官方帮助页（Kimi）、官方公告转载（文心一言）、应用商店和第三方媒体，可信度低于上一批。
- links.json 卡片描述建议同步更新：纳米AI 原描述“AI招聘助手”疑似有误；海螺AI 现以视频生成为主；Kimi 网址 kimi.moonshot.cn 可更新为 www.kimi.com。
- 草稿之间互相引用 /page/doubao、/page/kimi 等，需整批发布后才有效。
