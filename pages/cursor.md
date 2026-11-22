---
title: Cursor是什么？功能、价格、使用技巧与国内使用指南
description: Cursor 是基于 VS Code 的 AI 代码编辑器，支持 Agent 自主改代码、多文件编辑、MCP 扩展和代码审查。有免费版，付费档按月订阅，第三方模型按用量另计。本文介绍功能、价格、上手技巧和同类替代。
keywords: [Cursor, AI代码编辑器, Cursor价格, Cursor国内使用, Cursor教程, Cursor MCP, AI编程]
updated: 2026-11-22
---
# Cursor

**Cursor 是一款以 AI 为核心的代码编辑器**，由 Anysphere 公司开发，在 VS Code 的基础上深度集成 Agent、对话和代码补全，适合希望让 AI 直接参与多文件改动的开发者。

![Cursor 界面](https://mcp.programnotes.cn/images/cursor-ui.webp)

## 主要功能

- **Agent 模式**：根据自然语言需求自主拆解任务、编辑多个文件、运行命令
- **对话（Chat）与代码库问答**：打开项目时自动索引代码，可针对整个代码库提问
- **智能补全（Tab）**：多行补全与改写，按 `Tab` 接受、`Esc` 拒绝
- **MCP 扩展**：支持通过[模型上下文协议（MCP）](/page/mcp)接入外部工具和数据源
- **云端 Agent、AI 代码审查（Bugbot）** 等功能（付费档）
- **兼容 VS Code**：界面、快捷键、插件和配置基本通用

## 适合谁用

- 日常使用 VS Code、希望无缝切换的开发者
- 需要 AI 完成多文件重构、功能开发的个人和团队
- 愿意为更强模型付费的重度用户

## 价格与免费额度

> 以下信息核实于 2026-11-22，以官网为准，价格可能随时调整。

- 官网定价页显示：Free $0/月（有限的 Agent 与 Chat 请求）
- Plus $8/月；Premium $30/月；Super $100/月；Ultra $200/月；Teams $30 起/人/月；Enterprise 定制
- 定价页说明：第三方模型用量不包含在月费中，需按用量单独购买
- 注意：本次核实时定价页与 Grok/xAI 套餐合并展示，部分档位权益说明 Plus 仅可用 Grok 模型，建议购买前以[官网定价页](https://cursor.com/pricing)最新说明为准

## 国内能否直接使用

官网与软件下载在国内网络环境下的可用性未核实。部分海外模型服务可能受地区限制，付费需要支持外币的银行卡。

## 上手技巧

> 快捷键和设置入口以当前版本为准，新版本可能有调整。

### 常用快捷键

| 操作 | macOS | Windows / Linux |
|---|---|---|
| 打开 AI 面板（Agent / Chat） | `⌘I` / `⌘L` | `Ctrl+I` / `Ctrl+L` |
| 选中代码后行内编辑 | `⌘K` | `Ctrl+K` |
| 打开 Cursor 设置 | `⌘⇧J` | `Ctrl+Shift+J` |

### 用 @ 精确控制上下文

在对话里输入 `@` 可以指定 AI 参考的内容，例如：

- `@文件名` / `@文件夹`：只让 AI 看指定代码
- `@Web`：联网查资料
- `@Docs`：引用框架或库的文档
- `@Git`：引用提交记录或改动

上下文给得越准，回答越准确，也更省用量。

### 用 Rules 约束 AI 的写法

在设置里配置 Rules（或在项目中添加规则文件），写明编码规范、技术栈、注释风格等，Agent 生成代码时会遵守。用 `.cursorignore` 排除不希望 AI 读取的文件，例如密钥和大体积产物。

### 常见用法

1. **重构**：在 Agent 中描述目标（如"把这个大类按单一职责拆开"），确认方案后让它执行
2. **补注释和测试**：选中函数，用行内编辑要求"添加注释"或"生成单元测试"
3. **读陌生代码**：用 Chat 询问"这个模块的调用流程是什么"，再让它画出关键路径

## 安装与系统要求

1. 从 [Cursor 官网](https://cursor.com) 下载对应系统的安装包
2. 运行安装程序，首次启动时登录或注册账号
3. 可选择一键导入 VS Code 的插件、主题和快捷键设置

支持 Windows、macOS 和 Linux，具体系统版本要求以官网下载页为准。

## 优缺点

**优点**

- VS Code 用户几乎零迁移成本
- Agent 多文件编辑能力在同类产品中较成熟
- 可选模型多，支持 MCP 扩展

**缺点**

- 付费结构较复杂，第三方模型按量计费，成本不易预估
- AI 功能依赖网络，代码需上传到云端处理，对数据敏感的项目需评估隐私设置
- AI 生成的代码不一定正确，仍需人工审查

## 同类替代

- [Trae](/page/trae)：字节跳动推出的 AI 编辑器
- [Windsurf](/page/windsurf)：同类 AI 编辑器
- [GitHub Copilot](/page/github-copilot)：插件形式，支持多种 IDE
- [通义灵码](/page/tongyi-lingma)：国内可直接使用的编码助手
- 更多工具见 [AI编程工具大全](/category/ai-coding)

## 常见问题

### Cursor 免费吗？

有免费档，但 Agent 和对话请求次数有限，重度使用需要付费。

### Cursor 和 VS Code 是什么关系？

Cursor 基于 VS Code 开源代码构建，界面和插件生态与 VS Code 基本一致，可以导入 VS Code 的设置。

### Cursor 和 GitHub Copilot 怎么选？

Cursor 是独立编辑器，AI 与编辑器结合更深；Copilot 是插件，可在 VS Code、JetBrains、Xcode 等多种 IDE 中使用。习惯 JetBrains 的用户更适合 Copilot。

### Cursor 支持 MCP 吗？

支持。可以在设置里添加 MCP 服务器，让 Agent 调用数据库、浏览器、GitHub 等外部工具，详见 [MCP 介绍](/page/mcp)。

## 参考来源

- [Cursor 定价](https://cursor.com/pricing)
- [Cursor 官网](https://cursor.com)
- [Cursor 文档](https://docs.cursor.com)
