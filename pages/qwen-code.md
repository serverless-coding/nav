---
title: Qwen Code是什么？功能、安装、价格与使用指南
description: Qwen Code 是阿里通义开源（Apache-2.0）的终端编程 Agent，基于 Gemini CLI 代码分支，针对 Qwen-Coder 等模型优化，可配合通义千问开源权重模型使用。Gemini CLI 停止向个人用户服务后，它是该代码库的主要开源延续。
keywords: [Qwen Code, 通义千问编程, Qwen-Coder, 开源编程Agent, Gemini CLI替代]
updated: 2026-11-22
---
# Qwen Code

**Qwen Code 是阿里通义推出的开源终端编程 Agent**，从 Gemini CLI 分支而来，针对 Qwen 系列编程模型调优，适合使用通义千问模型的开发者。

## 主要功能

- 在终端中理解代码库、编辑文件、执行命令
- 针对 Qwen-Coder 模型优化，可搭配通义千问开源权重模型
- 支持本地模型（具体配置以官方文档为准）
- 继承 Gemini CLI 的基础能力

## 适合谁用

- 使用通义千问 / Qwen 模型的开发者
- 原 Gemini CLI 用户，希望继续使用开源版本
- 需要国内模型服务的团队

## 安装与上手

> 安装方式以 [官方仓库](https://github.com/QwenLM/qwen-code) 为准。

```bash
npm i -g @qwen-code/qwen-code@latest
qwen
```

## 价格与模型

> 以下信息核实于 2026-11-22，主要来自官方仓库说明与第三方评测汇总，价格和模型可能随时调整，以官网为准。

- 工具本身开源免费（Apache-2.0）
- 模型费用按所接入的服务计算（如阿里云百炼），具体免费额度：未核实

## 国内能否使用

工具在本地运行，接入通义千问等国内模型服务时通常可直接使用（未实测）。

## 优缺点

**优点**

- 开源，许可证宽松
- 对国内用户和 Qwen 模型友好
- Gemini CLI 关闭个人服务后的开源延续

**缺点**

- 社区规模小于 OpenCode、Codex
- 主要针对 Qwen 模型，其他模型体验未核实

## 同类替代

- [通义灵码](/page/tongyi-lingma)：阿里的 IDE 编码助手
- [OpenCode](/page/opencode)：开源多模型终端 Agent
- [Qwen](/page/qwen)：通义千问大模型介绍
- 更多工具见 [AI编程工具大全](/category/ai-coding)

## 常见问题

### Qwen Code 和通义灵码有什么区别？

Qwen Code 是终端里的开源 Agent；通义灵码是面向 IDE 的编码助手产品。

### 为什么说它是 Gemini CLI 的延续？

它从 Gemini CLI 代码分支而来。Gemini CLI 已于 2026 年 6 月停止向个人用户提供服务。

### Qwen Code 免费吗？

工具免费，模型调用按所用服务计费，免费额度未核实。

## 参考来源

- [QwenLM/qwen-code（GitHub）](https://github.com/QwenLM/qwen-code)
- [Best Open Source CLI Coding Agents in 2026（Pinggy）](https://pinggy.io/blog/best_open_source_cli_coding_agents/)
