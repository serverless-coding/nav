---
title: Claude Code是什么？功能、安装、价格与使用指南
description: Claude Code 是 Anthropic 官方的终端编程 Agent，擅长多文件重构和长任务，支持 Skills、Subagents、Hooks 与 MCP。只能使用 Claude 模型，可用 Claude Pro/Max 订阅或按量付费 API。
keywords: [Claude Code, Anthropic, AI编程Agent, 终端编程助手, Claude Code安装, Claude Code价格]
updated: 2026-11-22
---
# Claude Code

**Claude Code 是 Anthropic 推出的终端编程 Agent**，在项目目录里运行，能读写代码、执行命令、维护任务计划，适合复杂的多文件改动和长时间任务。

## 主要功能

- 在终端中理解整个代码库，进行多文件编辑、重构和调试
- 执行破坏性命令前会请求确认
- 扩展能力：Skills（按需加载的操作手册）、Subagents（子 Agent）、Hooks（工具调用钩子）、自定义斜杠命令
- 支持 [MCP](/page/mcp) 接入外部工具和数据源
- 后台 Agent、定时任务，以及跨会话的自动记忆

## 适合谁用

- 已经订阅 Claude Pro / Max 的开发者
- 需要 AI 完成跨文件重构、迁移、修复测试等较大任务的个人和团队
- 习惯在终端工作、希望 Agent 直接操作 shell 和 Git 的用户

## 安装与上手

> 安装方式以 [官方文档](https://docs.anthropic.com/en/docs/claude-code/overview) 为准。

```bash
# macOS / Linux 官方安装脚本
curl -fsSL https://claude.ai/install.sh | bash

# 进入项目目录后启动
claude
```

也可以通过 Homebrew 或 WinGet 安装。首次运行需要登录 Claude 账号或配置 API Key。

## 价格与模型

> 以下信息核实于 2026-11-22，主要来自官方仓库说明与第三方评测汇总，价格和模型可能随时调整，以官网为准。

- 只支持 Claude 系列模型，没有内置本地模型模式（可以指向兼容 Anthropic 接口的网关）
- 两种付费方式：按量调用 Anthropic API，或使用 Claude Pro / Max 订阅中包含的额度
- 订阅价格据第三方整理为 Pro $20/月、Max $100 或 $200/月，未从官网直接核实，请查看 [claude.com/pricing](https://claude.com/pricing)
- 当前默认模型与 API 单价：未核实

## 国内能否使用

未核实。Claude 官方服务对部分地区有限制，在中国大陆通常无法直接注册和付费，需要自行评估网络与合规要求。

## 优缺点

**优点**

- 处理复杂、多文件任务的能力在同类中口碑较好
- 扩展生态丰富：Skills、Subagents、Hooks、MCP
- 默认对危险命令做确认，相对稳妥

**缺点**

- 只能用 Claude 模型，不支持本地模型
- 重度使用时 API 费用增长较快
- 闭源，账号和地区限制较多

## 同类替代

- [OpenAI Codex](/page/codex)：OpenAI 开源的终端 Agent，默认沙箱执行
- [OpenCode](/page/opencode)：开源、不绑定模型厂商
- [DeepSeek Harness](/page/deepseek-harness)：DeepSeek 开源的插件化 Agent 框架
- [Cursor](/page/cursor)：AI 代码编辑器，也提供 CLI
- 更多工具见 [AI编程工具大全](/category/ai-coding)

## 常见问题

### Claude Code 免费吗？

工具本身可以免费安装，但使用需要 Claude 订阅额度或 API 费用。

### Claude Code 能用其他模型吗？

官方只支持 Claude 模型。如果需要切换不同厂商或本地模型，可以考虑 OpenCode、DeepSeek Harness 等开源工具。

### Claude Code 和 Cursor 怎么选？

Claude Code 在终端运行，适合长任务和自动化；Cursor 是图形化编辑器，适合日常边写边改。两者也可以搭配使用。

### Claude Code 支持 MCP 吗？

支持，可以接入数据库、浏览器、GitHub 等 MCP 服务器，详见 [MCP 介绍](/page/mcp)。

## 参考来源

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude 定价](https://claude.com/pricing)
- [Top 5 CLI coding agents in 2026（Pinggy）](https://pinggy.io/blog/top_cli_based_ai_coding_agents/)
