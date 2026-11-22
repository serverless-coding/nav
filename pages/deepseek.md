---
title: DeepSeek是什么？功能、价格与使用指南
description: DeepSeek 是深度求索推出的大模型，网页和 App 可免费对话，另有按量计费的开放 API，兼容 OpenAI/Anthropic 接口格式。
keywords: [DeepSeek, 深度求索, DeepSeek API, AI搜索, 国产大模型]
updated: 2026-11-22
---
# DeepSeek

**DeepSeek 是杭州深度求索推出的大模型品牌**，包含面向普通用户的对话产品（网页、App）和面向开发者的 API 平台，两者分开计费。

## 主要功能

- 对话产品（chat.deepseek.com）：问答、写作、编程、联网搜索、深度思考模式
- API 平台：接口兼容 OpenAI 和 Anthropic 格式，可直接接入 Claude Code、GitHub Copilot、OpenCode 等工具
- 截至 2026-11-22，官方文档列出的模型名为 `deepseek-flash`（当前由 DeepSeek-V4.1-Flash-1017 提供）和 `deepseek-v4-pro`

## 适合谁用

- 需要免费、中文能力强的对话助手的普通用户
- 需要低成本大模型 API 的开发者

## 价格与免费额度

> 核实于 2026-11-22，以官网为准。

- 对话产品：网页和 App 免费使用；是否有付费档未核实
- API：按 token 计费，官方价格页本次未能完整抓取，**具体单价未核实**；第三方资料显示存在分时段定价，请以 [官方价格页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing) 为准

## 支持平台与国内使用

网页版、iOS/Android App、API。国内可直接访问。

## 优缺点

**优点**：对话免费；API 兼容主流格式，接入成本低；中文与代码能力强。

**缺点**：高峰期可能出现繁忙提示；API 价格与模型更新较频繁，需要关注官方公告。

## 同类替代

- [Kimi](/page/kimi)、[通义千问](/page/qwen)、[智谱清言](/page/chatglm)
- [秘塔AI搜索](/page/metaso)：更侧重搜索与资料整理
- 更多见 [AI搜索工具大全](/category/ai-search)

## 常见问题

### DeepSeek 免费吗？
网页和 App 的对话功能免费；API 按用量付费。

### DeepSeek API 怎么接入现有工具？
把 base_url 设为 `https://api.deepseek.com`，填入 API Key，模型名用 `deepseek-flash` 或 `deepseek-v4-pro`。Anthropic 格式的地址是 `https://api.deepseek.com/anthropic`。

### 旧模型名还能用吗？
官方文档说明 `deepseek-v4-flash` 等旧名称仍可调用，但会由新模型提供服务并按 Flash 价格计费。

## 参考来源

- [DeepSeek API 文档](https://api-docs.deepseek.com/)
- [DeepSeek 对话](https://chat.deepseek.com)
