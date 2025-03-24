# Vercel AI

![ai chat](https://nav.programnotes.cn/images/ai/ai-sdk.png)
[前往体验,Groq Demo](https://nav.programnotes.cn/ai)

Vercel AI SDK 是一个 TypeScript 工具包，旨在帮助开发者使用 React、Next.js、Vue、Svelte、Node.js 等构建 AI 驱动的应用程序和代理。

## 为什么使用 AI SDK？

将大型语言模型（LLM）集成到应用程序中非常复杂，并且在很大程度上取决于您使用的特定模型提供商。 AI SDK 提供了一个统一的 API 和与框架无关的钩子，以简化此过程。

*   **[AI SDK Core](https://sdk.vercel.ai/docs/ai-sdk-core):** 用于生成文本、结构化对象、工具调用以及使用 LLM 构建代理的统一 API。
*   **[AI SDK UI](https://sdk.vercel.ai/docs/ai-sdk-ui):** 一组与框架无关的钩子，用于快速构建聊天和生成式用户界面。

## 模型提供商

AI SDK 支持多个模型提供商，包括：

*   xAI
*   OpenAI
*   Azure
*   Anthropic
*   Amazon Bedrock
*   Groq
*   Fal AI
*   DeepInfra
*   Google Generative AI
*   Google Vertex AI
*   Mistral
*   Together.ai
*   Cohere
*   Fireworks
*   DeepSeek
*   Cerebras
*   Perplexity
*   Luma AI

## 模板

Vercel 提供了包含 AI SDK 集成的模板，用于不同的用例、提供商和框架。 这些模板可用于开始构建 AI 驱动的应用程序。

### 入门套件

*   [Chatbot Starter Template](https://vercel.com/templates/next.js/nextjs-ai-chatbot)
*   [Internal Knowledge Base (RAG)](https://vercel.com/templates/next.js/ai-sdk-internal-knowledge-base)
*   [Multi-Modal Chat](https://vercel.com/templates/next.js/multi-modal-chatbot)
*   [Semantic Image Search](https://vercel.com/templates/next.js/semantic-image-search)
*   [Natural Language PostgreSQL Query](https://vercel.com/templates/next.js/natural-language-postgres)

## 资源

*   [文档](https://sdk.vercel.ai/docs)
*   [Cookbook](https://sdk.vercel.ai/cookbook)
*   [提供商](https://sdk.vercel.ai/providers)
*   [Showcase](https://sdk.vercel.ai/showcase)
*   [GitHub](https://github.com/vercel/ai)
*   [Discussions](https://github.com/vercel/ai/discussions)

## Demo

[Groq Demo,这里使用的Demo模型来自Grop](https://nav.programnotes.cn/ai),需要注意的是模型调用有区域限制,vercel的function需要部署到特定区域,如: San Francisco, USA (West) - us-west-1 - sfo1,才能调用成功,在Asia Pacific的 Hong Kong (East) - ap-east-1 - hkg1 等区域无法使用


代码开源,[前往查看](https://github.com/vercel-labs/ai-sdk-starter-groq),[demo](https://ai-sdk-starter-groq.vercel.app/)