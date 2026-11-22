---
title: DeepSeek Harness是什么？功能、安装、价格与使用指南
description: DeepSeek Harness（dsh）是 DeepSeek 于 2026 年 8 月开源的编程 Agent 框架（MIT），一切皆插件，以本地网页界面为主，支持多家模型和自定义服务，可调用 Claude Code、Codex 作为子 Agent。目前仍是开发者预览版。
keywords: [DeepSeek Harness, dsh, DeepSeek编程Agent, 开源编程Agent, AI编程]
updated: 2026-11-22
---
# DeepSeek Harness

**DeepSeek Harness（简称 dsh）是 DeepSeek 开源的编程 Agent 框架**，核心理念是"一切皆插件"，连 Agent 循环和界面都可以替换，适合想深度定制 Agent 的开发者。

## 主要功能

- 插件化架构：模型、工具、技能、会话、沙箱、存储、循环、调度、界面都可以替换或组合
- 默认打开本地网页界面，也支持无界面（headless）模式在终端运行
- 内置多家模型服务，可注册自定义服务接入自建模型或 Ollama、vLLM
- 读取 `AGENTS.md` 和 `CLAUDE.md`，可作为 [MCP](/page/mcp) 客户端
- 可把任务委托给 Claude Code、Codex 运行
- 只追加的会话日志，便于审计；提供 Python 与 JSON-RPC SDK

## 适合谁用

- 想定制或替换 Agent 内部逻辑的开发者和研究者
- 使用 DeepSeek 模型、希望有官方 Agent 工具的用户
- 能接受预览版不稳定的早期尝鲜者

## 安装与上手

> 安装方式以 [官方页面](https://deepseek.com/en/harness/) 和仓库说明为准。

```bash
# 启动本地网页界面（默认 http://127.0.0.1:3080）
npx @deepseek-ai/dsh web

# 无界面模式
npx @deepseek-ai/dsh --profile headless "fix the failing tests"
```

## 价格与模型

> 以下信息核实于 2026-11-22，主要来自官方仓库说明与第三方评测汇总，价格和模型可能随时调整，以官网为准。

- 工具本身开源免费（MIT）
- 默认使用 DeepSeek V4 系列模型，按 DeepSeek API 计费；也可接入其他厂商或本地模型
- DeepSeek API 单价：未核实，请查看 DeepSeek 开放平台

## 国内能否使用

工具本身在本地运行；默认的 DeepSeek 模型服务在国内可直接访问（未实测）。接入海外模型时需自行解决网络问题。

## 优缺点

**优点**

- 架构高度模块化，可替换的部分远多于同类工具
- 不绑定 DeepSeek，支持多家模型和自建服务
- 会话日志可审计，支持调用其他 Agent

**缺点**

- 开发者预览版，官方明确表示会有不兼容的更新
- 以网页界面为主，没有完整的终端全屏界面
- 发布时间短，文档和生态还不完善

## 同类替代

- [OpenCode](/page/opencode)：更成熟的开源、多模型终端 Agent
- [Claude Code](/page/claude-code)、[OpenAI Codex](/page/codex)：模型厂商官方 Agent
- [DeepSeek](/page/deepseek)：DeepSeek 对话产品与 API 介绍
- 更多工具见 [AI编程工具大全](/category/ai-coding)

## 常见问题

### DeepSeek Harness 只能用 DeepSeek 模型吗？

不是。它内置多家模型服务，也可以注册自定义服务接入本地或自建模型。

### 可以用于生产环境吗？

目前是开发者预览版，官方提示会有破坏性变更，建议固定版本并谨慎用于团队核心流程。

### 和 Claude Code 有什么关系？

它可以把任务委托给本机安装的 Claude Code 或 Codex 执行，也读取 `CLAUDE.md` 配置。

## 参考来源

- [DeepSeek Harness 官方页面](https://deepseek.com/en/harness/)
- [Best Open Source CLI Coding Agents in 2026（Pinggy）](https://pinggy.io/blog/best_open_source_cli_coding_agents/)
