# [smithery.ai](https://smithery.ai/)

![smithery.ai](https://nav.programnotes.cn/images/mcp/mcp-smithery.ai.png)

## Introduction

Smithery is a platform to help developers find and ship language model extensions. All our listed extensions follow the Model Context Protocols (MCP) specification. Our mission is to make language models extensions accessible and accelerate the development of agentic AI. Smithery addresses this challenge by providing:
- A centralized hub for discovering MCP servers
- Hosting and distribution for MCP servers
- Standardized interfaces for tool integration and configs

Smithery 是一个帮助开发人员查找和发布语言模型扩展的平台。我们列出的所有扩展都遵循模型上下文协议 (MCP) 规范。我们的使命是使语言模型的扩展易于理解，并加速机器人的发展。Smithery 通过提供：
- 一个发现 MCP 服务器的集中中心为
- 为MCP 服务器提供托管和分发工具
- 集成和配置的标准化接口

## Model Context Protocol

The Model Context Protocol (MCP) is an open protocol that enables seamless integration between LLMs and external data sources and tools. It is a universal standard for connecting AI systems with the context they need, eliminating information silos and fragmented integrations. By providing a standard way to connect AI systems with data sources, MCP simplifies the development and maintenance of agentic applications. This makes it easier to build agents like intelligent IDEs, chat interfaces and custom AI workflows. Instead of writing custom implementations for each new data source, developers can use MCP as a single, standardized protocol. This approach not only makes systems more maintainable but also ensures better scalability as your AI applications grow and evolve.

## Deployments

Smithery Deployments allow you to host your [standard input/output (STDIO)](https://modelcontextprotocol.io/docs/concepts/transports#standard-input-output-stdio) MCP server on Smithery served over a WebSocket connection.

Benefits of hosting:

*   Smithery will show an MCP playground on your server page, allowing users to try your MCP online.
*   Users can call your server without installing dependencies or be concerned about security.
*   Smithery will rank hosted servers higher in our search results.

### [Overview](https://smithery.ai/docs/deployments#overview)

Deploying on Smithery is straightforward:

1.  [Add your server](https://smithery.ai/new) to Smithery (or claim it if it's already listed)
2.  Click Deploy on Smithery Deployments tab on your server page (_only authenticated server owners can see this tab_)

That's it! Your MCP server will be built and deployed according to your configuration.

### [Why WebSockets?](https://smithery.ai/docs/deployments#why-websockets)
----------------------------------------------------------------------

Smithery Deployments use WebSockets (WS) because WebSockets enable session affinity. This means when we scale up your MCP based on traffic, the same client will always connect to the same server. The Server-Sent-Events transport provided by Model Context Protocol is unable to easily achieve this for scalable hosting. See [this discussion](https://github.com/modelcontextprotocol/specification/discussions/102) for more details.

WebSockets transport implementations are maintained by the official MCP SDK in [Typescript](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/src/client/websocket.ts), [Python](https://github.com/modelcontextprotocol/python-sdk/blob/main/src/mcp/server/websocket.py) and [Kotlin](https://github.com/modelcontextprotocol/kotlin-sdk/blob/main/src/commonMain/kotlin/io/modelcontextprotocol/kotlin/sdk/shared/WebSocketMcpTransport.kt).

[Serverless Hosting](https://smithery.ai/docs/deployments#serverless-hosting)
-----------------------------------------------------------------------------

We serve your hosted MCP servers on Smithery over WebSockets (WS) in a serverless environment and they will timeout after 5 minutes. You will need to handle reconnection if needed. You should design your server with ephemeral storage in mind. Persistent data should be stored in an external database.

[Tool Lists](https://smithery.ai/docs/deployments#tool-lists)
-------------------------------------------------------------

Smithery can only display tool lists for servers that don't require authentication to list tools. Server developers must ensure that the list tools functionality is not dependent on any API keys or configurations that users have to provide.

As a server developer, you can implement this by supporting "lazy loading" - only authenticating using your required configuration/API keys upon tool call, rather than upon initialization.