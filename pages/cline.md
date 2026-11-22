---
title: Cline是什么？功能、安装、价格与使用指南
description: Cline 是开源（Apache-2.0）的自主编程 Agent，最早是 VS Code 插件，现在也提供独立 CLI 和 SDK，支持多家模型和本地模型，可并行运行多个 Agent。工具免费，模型费用自付。
keywords: [Cline, VS Code AI插件, 开源编程Agent, AI编程, Cline CLI]
updated: 2026-11-22
---
# Cline

**Cline 是一款开源的自主编程 Agent**，可以作为 VS Code 插件、命令行工具或 SDK 使用，适合希望在编辑器和终端中用同一个 Agent 的开发者。

## 主要功能

- 在 IDE 中自主读写文件、执行命令，改动前可审批
- 独立 CLI 和 SDK，便于脚本化和集成
- 不绑定模型厂商，支持多家模型以及 Ollama、LM Studio 本地模型
- 并行 Agent 与任务看板，面向团队协作
- 支持 [MCP](/page/mcp)

## 适合谁用

- VS Code 用户，希望在编辑器内使用 Agent
- 想自带 API Key、自由选择模型的开发者
- 需要在 IDE 和 CI 中复用同一 Agent 的团队

## 安装与上手

> 安装方式以 [官网](https://cline.bot) 和 [GitHub 仓库](https://github.com/cline/cline) 为准。

- IDE：在 VS Code 扩展市场搜索 Cline 安装
- CLI：

```bash
npm i -g cline
```

## 价格与模型

> 以下信息核实于 2026-11-22，主要来自官方仓库说明与第三方评测汇总，价格和模型可能随时调整，以官网为准。

- 工具本身开源免费（Apache-2.0）
- 使用自己的模型 API Key 付费，或使用本地模型
- 官方是否提供账号内的付费额度：未核实

## 国内能否使用

工具在本地运行，可接入国内模型服务或本地模型（未实测）。

## 优缺点

**优点**

- 同一个 Agent 覆盖 IDE、CLI 和 SDK
- 多模型、支持本地模型
- Roo Code、Kilo Code 等多个项目基于它衍生，社区基础好

**缺点**

- 独立 CLI 推出时间较短
- 需要自备模型 Key

## 同类替代

- [OpenCode](/page/opencode)：开源终端 Agent
- [GitHub Copilot](/page/github-copilot)：IDE 插件形式的编程助手
- [Trae](/page/trae)、[Windsurf](/page/windsurf)：AI 编辑器
- 更多工具见 [AI编程工具大全](/category/ai-coding)

## 常见问题

### Cline 免费吗？

插件和 CLI 免费开源，费用来自所使用的模型 API。

### Cline 支持哪些编辑器？

以 VS Code 为主，其他编辑器支持情况未核实，以官网为准。

### Cline 能用本地模型吗？

可以，支持 Ollama 和 LM Studio。

## 参考来源

- [Cline 官网](https://cline.bot)
- [cline/cline（GitHub）](https://github.com/cline/cline)
- [Best Open Source CLI Coding Agents in 2026（Pinggy）](https://pinggy.io/blog/best_open_source_cli_coding_agents/)
