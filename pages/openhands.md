---
title: OpenHands是什么？功能、安装、价格与使用指南
description: OpenHands（原 OpenDevin）是开源（核心 MIT）的自主编程 Agent，在沙箱中运行，能浏览网页、执行代码和编辑文件，支持无界面模式接入 CI/CD，通过 LiteLLM 支持上百家模型和本地模型。
keywords: [OpenHands, OpenDevin, 自主编程Agent, 开源编程Agent, CI/CD]
updated: 2026-11-22
---
# OpenHands

**OpenHands 是一款开源的自主编程 Agent**（前身为 OpenDevin），在沙箱里端到端完成任务，适合无人值守运行和接入 CI/CD。

## 主要功能

- 在沙箱运行时中浏览网页、执行代码、编辑文件
- 单次任务模式（如 `openhands -t "fix the failing tests"`）、无界面模式和会话恢复
- 基于 LiteLLM，支持 100 多家模型服务，包括 Ollama、llama.cpp、vLLM 等本地方案
- 1.0 版本基于新的 Software Agent SDK 重构

## 适合谁用

- 需要在 CI/CD 中自动修复测试、处理 issue 的团队
- 想研究自主 Agent 的开发者
- 需要沙箱隔离、多模型支持的用户

## 安装与上手

> 安装方式以 [官方仓库](https://github.com/OpenHands/OpenHands) 为准，需要 Python 3.12。

```bash
uvx openhands
# 或
pip install openhands
```

## 价格与模型

> 以下信息核实于 2026-11-22，主要来自官方仓库说明与第三方评测汇总，价格和模型可能随时调整，以官网为准。

- 核心代码开源（MIT），自带模型 Key 使用
- 官方云服务及价格：未核实

## 国内能否使用

工具可本地部署，接入国内模型服务或本地模型即可使用（未实测）。

## 优缺点

**优点**

- 自主程度高，适合多步骤无人值守任务
- 真正的无界面模式，方便接入流水线
- 模型选择范围广

**缺点**

- 安装要求 Python 3.12，环境要求较严格
- 本地开源模型的效果参差不齐
- 组件较多，比简单的编辑型 Agent 复杂

## 同类替代

- [OpenAI Codex](/page/codex)：默认沙箱执行的终端 Agent
- [OpenCode](/page/opencode)：开源终端 Agent
- [Cline](/page/cline)：IDE、CLI、SDK 通用 Agent
- 更多工具见 [AI编程工具大全](/category/ai-coding)

## 常见问题

### OpenHands 和 OpenDevin 是什么关系？

OpenHands 是 OpenDevin 改名后的项目。

### GitHub 仓库地址是什么？

据第三方资料，仓库已从 All-Hands-AI/OpenHands 迁移为 OpenHands/OpenHands，以 GitHub 实际跳转为准。

### 可以放进 CI 里用吗？

可以，支持无界面模式，适合在 CI/CD 中运行。

## 参考来源

- [OpenHands（GitHub）](https://github.com/OpenHands/OpenHands)
- [Best Open Source CLI Coding Agents in 2026（Pinggy）](https://pinggy.io/blog/best_open_source_cli_coding_agents/)
