# 草稿审核说明（第四批：编程 Agent，2026-11-22）

本目录不会上线（getAllPageSlugs 只读 pages/ 根目录）。
baixiaoying.md、kaisou-ai.md、nami-search.md 为之前暂缓的草稿，本批未改动。

| 草稿 | links.json title（AI编程） | 建议 page 值 | 可信度 | 未核实项 |
|---|---|---|---|---|
| claude-code.md | Claude Code | claude-code.md | 中 | 订阅价格（第三方）、默认模型、国内访问 |
| openai-codex.md | OpenAI Codex | openai-codex.md | 中 | 默认模型、价格、国内访问 |
| deepseek-harness.md | DeepSeek Harness | deepseek-harness.md | 中 | API 单价、国内实测 |
| opencode.md | OpenCode | opencode.md | 中 | 仓库迁移以官方为准 |
| cline.md | Cline | cline.md | 中 | 官方付费额度、非 VS Code 编辑器支持 |
| kiro.md | Kiro | kiro.md | 低 | 价格与免费额度、规格驱动具体流程、国内访问 |
| openhands.md | OpenHands | openhands.md | 中 | 云服务与价格、仓库地址 |
| qwen-code.md | Qwen Code | qwen-code.md | 中 | 免费额度、启动命令 |

信息来源：主要为第三方评测汇总（Pinggy 2026-08、2026-10）与官方仓库/官网说明；未逐一打开官网定价页核实。
本批未写 star 数和版本号。

## 与已有文章的关系
- pages/codex.md 是早期 Codex CLI 文章，参数已过时（如 --approval-mode、--provider）。建议：把 openai-codex.md 发布后，给 /page/codex 加 301 到 /page/openai-codex，或用新稿覆盖 codex.md 并让卡片 page 填 "codex.md"。

## links.json 网址修正建议
- OpenHands：https://github.com/All-Hands-AI/OpenHands → https://github.com/OpenHands/OpenHands（据第三方，仓库已迁移）
- Claude Code：https://www.anthropic.com/claude-code 可用，也可改为官方文档 https://docs.anthropic.com/en/docs/claude-code/overview（未实测哪个更稳定）
- OpenCode：opencode.ai 正确；如引用 GitHub 应为 anomalyco/opencode（原 sst/opencode）
- Gemini Code Assist（现有卡片）：Gemini CLI 已于 2026-06-18 停止向个人用户提供，建议描述注明“面向企业 / 付费 API”
