---
title: Kiro是什么？功能、安装、价格与使用指南
description: Kiro 是亚马逊（AWS）推出的 AI 编程 IDE 和 CLI，主打规格驱动开发；Kiro CLI 是 Amazon Q Developer CLI 的继任者，支持自定义 Agent、Hooks 与 MCP，适合 AWS 相关开发。价格按 Kiro 套餐计费。
keywords: [Kiro, Kiro CLI, Amazon Q Developer, AWS AI编程, AI编程IDE]
updated: 2026-11-22
---
# Kiro

**Kiro 是亚马逊推出的 AI 编程工具**，包括 IDE 和命令行工具 Kiro CLI，强调先写规格再生成代码，对 AWS 生态的开发场景支持较好。

## 主要功能

- 规格驱动开发：先整理需求和设计，再由 Agent 实现（具体流程以官网为准）
- Kiro CLI：终端 Agent，支持自定义 Agent、Hooks 和 [MCP](/page/mcp)
- 适合 AWS CLI、CDK、Terraform、IAM 等 AWS 相关工作
- 据第三方报道，底层使用 Claude 模型

## 适合谁用

- 日常在 AWS 上开发和运维的工程师
- 原 Amazon Q Developer CLI 用户
- 希望用规格驱动方式管理 AI 开发流程的团队

## 安装与上手

> 安装方式以 [官网](https://kiro.dev) 为准。

```bash
# Kiro CLI（macOS / Linux）
curl -fsSL https://cli.kiro.dev/install | bash
```

IDE 版本请在官网下载。

## 价格与模型

> 以下信息核实于 2026-11-22，主要来自官方仓库说明与第三方评测汇总，价格和模型可能随时调整，以官网为准。

- Kiro CLI 包含在 Kiro 的标准套餐中
- 具体套餐价格、免费额度：未核实，请查看官网定价页
- 与旧版 Amazon Q Developer CLI 不同，Kiro CLI 不开源

## 国内能否使用

未核实，需要 AWS / Kiro 账号，访问与付费需自行评估。

## 优缺点

**优点**

- 与 AWS 生态结合紧密
- 规格驱动的流程适合较正式的工程项目
- 支持 MCP、Hooks 和自定义 Agent

**缺点**

- 闭源
- 对非 AWS 场景的优势不明显
- 价格和额度信息需要到官网确认

## 同类替代

- [Claude Code](/page/claude-code)：Anthropic 官方终端 Agent
- [GitHub Copilot](/page/github-copilot)：也提供 Copilot CLI
- [Cursor](/page/cursor)：AI 代码编辑器
- 更多工具见 [AI编程工具大全](/category/ai-coding)

## 常见问题

### Kiro 和 Amazon Q Developer 是什么关系？

据第三方资料，Kiro CLI 是 Amazon Q Developer CLI 的继任者，AWS 已提示 CLI 用户升级。

### Kiro 是开源的吗？

Kiro CLI 不开源；旧的 Q Developer CLI 仓库仍以开源形式保留。

### Kiro 免费吗？

是否有免费档未核实，请以官网定价为准。

## 参考来源

- [Kiro 官网](https://kiro.dev)
- [Top 5 CLI coding agents in 2026（Pinggy）](https://pinggy.io/blog/top_cli_based_ai_coding_agents/)
