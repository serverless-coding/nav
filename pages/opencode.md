---
title: OpenCode是什么？功能、安装、价格与使用指南
description: OpenCode 是开源（MIT）的终端编程 Agent，不绑定模型厂商，支持多家云端模型与 Ollama 本地模型，内置只读的 plan 和可写的 build 两种 Agent，集成 LSP 与 MCP。工具免费，只需支付模型费用。
keywords: [OpenCode, 开源编程Agent, 终端编程助手, Claude Code替代, 本地模型]
updated: 2026-11-22
---
# OpenCode

**OpenCode 是开源、不绑定模型厂商的终端编程 Agent**，常被视为 Claude Code 的开源替代，适合想自由切换模型或使用本地模型的开发者。

## 主要功能

- 终端界面（TUI），内置两种 Agent：plan（只读，不改文件）和 build（可写）
- 支持多家模型服务及兼容 OpenAI 接口的服务，包括 Ollama 本地模型
- 会话中可切换模型，上下文保留
- 集成 LSP，支持 [MCP](/page/mcp)，提供 SDK 便于脚本化

## 适合谁用

- 不想被单一模型厂商绑定的开发者
- 有数据合规要求、需要使用本地模型的团队
- 希望使用开源、可审计工具的用户

## 安装与上手

> 安装方式以 [官网](https://opencode.ai) 为准。

```bash
curl -fsSL https://opencode.ai/install | bash
# 或
npm i -g opencode-ai

opencode
```

## 价格与模型

> 以下信息核实于 2026-11-22，主要来自官方仓库说明与第三方评测汇总，价格和模型可能随时调整，以官网为准。

- 工具本身开源免费（MIT），只需支付所接入模型的 API 费用
- 支持 Anthropic、OpenAI、Google、OpenRouter 等以及本地模型
- 据第三方报道，Claude Pro/Max 订阅登录已被移除，但仍可用 Claude API Key；ChatGPT 订阅可直接使用

## 国内能否使用

工具本身在本地运行，可接入国内模型服务或本地模型使用（未实测）。

## 优缺点

**优点**

- 社区活跃，迭代快
- 真正多模型，支持本地模型
- plan / build 分离，降低误改风险

**缺点**

- 项目迭代快，问题和变更较多
- 需要自己为任务挑选合适模型
- 插件生态小于 Claude Code

## 同类替代

- [Claude Code](/page/claude-code)：Anthropic 官方 Agent
- [DeepSeek Harness](/page/deepseek-harness)：插件化程度更高的开源框架
- [Cline](/page/cline)：可在 IDE、CLI 和 SDK 中使用
- 更多工具见 [AI编程工具大全](/category/ai-coding)

## 常见问题

### OpenCode 免费吗？

工具免费开源，费用来自你接入的模型 API；使用本地模型则不产生 API 费用。

### OpenCode 的 GitHub 仓库在哪里？

据第三方报道，项目已从 sst/opencode 迁移到 anomalyco/opencode，旧链接可能失效，以官网为准。

### OpenCode 能用 Claude 吗？

可以使用 Claude API Key 接入。

## 参考来源

- [OpenCode 官网](https://opencode.ai)
- [Best Open Source CLI Coding Agents in 2026（Pinggy）](https://pinggy.io/blog/best_open_source_cli_coding_agents/)
- [Top 5 CLI coding agents in 2026（Pinggy）](https://pinggy.io/blog/top_cli_based_ai_coding_agents/)
