---
title: OpenAI Codex是什么？功能、安装、价格与使用指南
description: OpenAI Codex 是 OpenAI 开源的终端编程 Agent（Apache-2.0），默认在沙箱中执行命令，可用 ChatGPT 订阅额度或 API，也能通过 --oss 连接本地模型，并可把任务交给云端继续运行。
keywords: [OpenAI Codex, Codex CLI, AI编程Agent, 终端编程助手, Codex安装, 开源编程Agent]
updated: 2026-11-22
---
# OpenAI Codex

**OpenAI Codex（Codex CLI）是 OpenAI 开源的终端编程 Agent**，主打默认沙箱执行，适合放心地让 Agent 在真实仓库里自动运行。

## 主要功能

- 在终端中阅读、修改代码并执行命令
- 默认在沙箱环境中执行 shell 命令，未经批准不会影响沙箱外的系统
- 支持子 Agent 和 [MCP](/page/mcp)
- 可把本地任务交给 ChatGPT 的 Codex Cloud 继续运行
- `--oss` 参数可连接本地 Ollama 模型

## 适合谁用

- 已有 ChatGPT 订阅的开发者
- 希望 Agent 无人值守运行、重视安全隔离的团队
- 想要开源、可审计工具的用户

## 安装与上手

> 安装方式以 [官方仓库](https://github.com/openai/codex) 为准。

```bash
npm i -g @openai/codex
# 或 macOS
brew install --cask codex

# 在项目目录中启动
codex
```

## 价格与模型

> 以下信息核实于 2026-11-22，主要来自官方仓库说明与第三方评测汇总，价格和模型可能随时调整，以官网为准。

- 工具本身开源免费（Apache-2.0）
- 使用 OpenAI API 按量计费，或使用 ChatGPT Plus / Pro / Business 等订阅中包含的额度
- 针对 OpenAI 模型优化，也可通过配置接入兼容 OpenAI 接口的其他服务和本地模型
- 当前默认模型与具体价格：未核实，请查看 OpenAI 官网

## 国内能否使用

未核实。OpenAI 服务在中国大陆无法直接使用；如果改接国内兼容 OpenAI 接口的模型服务或本地模型，工具本身可以运行，但体验与官方模型不同。

## 优缺点

**优点**

- 真正开源，可阅读和修改
- 默认沙箱执行，适合自动化运行
- 与 ChatGPT 订阅和云端任务打通

**缺点**

- 主要针对 OpenAI 模型调优，其他模型是次要路径
- 插件和技能生态比 Claude Code 少
- 沙箱会带来少量性能开销

## 同类替代

- [Claude Code](/page/claude-code)：Anthropic 官方终端 Agent
- [OpenCode](/page/opencode)：开源、不绑定模型厂商
- [GitHub Copilot](/page/github-copilot)：也提供 Copilot CLI
- 更多工具见 [AI编程工具大全](/category/ai-coding)

## 常见问题

### Codex 是开源的吗？

是的，Codex CLI 以 Apache-2.0 许可证在 GitHub 开源，仓库为 openai/codex。

### Codex 能用本地模型吗？

可以，使用 `--oss` 参数可连接本地 Ollama 模型，也可以在配置文件中接入兼容 OpenAI 接口的服务。

### 本站已有的 Codex 文章和这篇有什么区别？

本站早前的 [Codex 文章](/page/codex) 基于旧版 CLI，部分参数已过时，本篇为更新版。

## 参考来源

- [openai/codex（GitHub）](https://github.com/openai/codex)
- [Top 5 CLI coding agents in 2026（Pinggy）](https://pinggy.io/blog/top_cli_based_ai_coding_agents/)
- [Best Open Source CLI Coding Agents in 2026（Pinggy）](https://pinggy.io/blog/best_open_source_cli_coding_agents/)
