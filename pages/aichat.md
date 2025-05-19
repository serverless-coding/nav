# AIChat：一体化 LLM CLI 工具

AIChat 是一款一体化 LLM CLI 工具，具有 Shell 助手、CMD 和 REPL 模式、RAG、AI 工具和代理等功能。

## 安装

### 包管理器

- **Rust 开发者：** `cargo install aichat`
- **Homebrew/Linuxbrew 用户：** `brew install aichat`
- **Pacman 用户：** `pacman -S aichat`
- **Windows Scoop 用户：** `scoop install aichat`
- **Android Termux 用户：** `pkg install aichat`

### 预构建的二进制文件

从 [GitHub Releases](https://github.com/sigoden/aichat/releases) 下载适用于 macOS、Linux 和 Windows 的预构建二进制文件，解压它们，并将 `aichat` 二进制文件添加到您的 `$PATH` 中。

## 功能

### 多供应商

通过统一的界面与 20 多家领先的 LLM 供应商无缝集成。 支持的供应商包括 OpenAI、Claude、Gemini (Google AI Studio)、Ollama、Groq、Azure-OpenAI、VertexAI、Bedrock、Github Models、Mistral、Deepseek、AI21、XAI Grok、Cohere、Perplexity、Cloudflare、OpenRouter、Ernie、Qianwen、Moonshot、ZhipuAI、Lingyiwanwu、MiniMax、Deepinfra、VoyageAI、任何 OpenAI 兼容的 API 供应商。

### CMD 模式

通过 AIChat 的 CMD 模式探索强大的命令行功能。

![aichat-cmd](https://github.com/user-attachments/assets/6c58c549-1564-43cf-b772-e1c9fe91d19c)

### REPL 模式

体验交互式 Chat-REPL，它具有诸如制表符自动完成、多行输入支持、历史记录搜索、可配置的键绑定和自定义 REPL 提示符等功能。

![aichat-repl](https://github.com/user-attachments/assets/218fab08-cdae-4c3b-bcf8-39b6651f1362)

### Shell 助手

提高您的命令行效率。 用自然语言描述您的任务，让 AIChat 将它们转换为精确的 shell 命令。 AIChat 智能地适应您的操作系统和 shell 环境。

![aichat-execute](https://github.com/user-attachments/assets/0c77e901-0da2-4151-aefc-a2af96bbb004)

### 多种形式的输入

接受各种输入形式，例如 stdin、本地文件和目录以及远程 URL，从而灵活地处理数据。

| 输入     | CMD                                  | REPL                             |
| -------- | ------------------------------------ | -------------------------------- |
| CMD      | `aichat hello`                       |                                  |
| STDIN    | `cat data.txt \| aichat`             |                                  |
| 上次回复 |                                      | `.file %%`                       |
| 本地文件 | `aichat -f image.png -f data.txt`    | `.file image.png data.txt`       |
| 本地目录 | `aichat -f dir/`                     | `.file dir/`                     |
| 远程 URL | `aichat -f https://example.com`      | `.file https://example.com`      |
| 外部命令 | ```aichat -f '`git diff`'```         | ```.file `git diff` ```          |
| 组合输入 | `aichat -f dir/ -f data.txt explain` | `.file dir/ data.txt -- explain` |

### 角色

自定义角色以定制 LLM 行为，从而提高交互效率并提高生产力。

![aichat-role](https://github.com/user-attachments/assets/023df6d2-409c-40bd-ac93-4174fd72f030)

> 该角色由提示和模型配置组成。

### 会话

通过会话保持上下文感知的对话，确保交互的连续性。

![aichat-session](https://github.com/user-attachments/assets/56583566-0f43-435f-95b3-730ae55df031)

> 左侧使用会话，而右侧不使用会话。

### 宏

通过将一系列 REPL 命令组合到自定义宏中来简化重复性任务。

![aichat-macro](https://github.com/user-attachments/assets/23c2a08f-5bd7-4bf3-817c-c484aa74a651)

### RAG

将外部文档集成到您的 LLM 对话中，以获得更准确和上下文相关的响应。

![aichat-rag](https://github.com/user-attachments/assets/359f0cb8-ee37-432f-a89f-96a2ebab01f6)

### 功能调用

功能调用通过将 LLM 连接到外部工具和数据源来增强它们的功能。 这开启了无限的可能性，使 LLM 能够超越其核心功能并处理更广泛的任务。

我们创建了一个新的存储库 [https://github.com/sigoden/llm-functions](https://github.com/sigoden/llm-functions) ，以帮助您充分利用此功能。

#### AI 工具

集成外部工具以自动执行任务、检索信息并在您的工作流程中直接执行操作。

![aichat-tool](https://github.com/user-attachments/assets/7459a111-7258-4ef0-a2dd-624d0f1b4f92)

#### AI 代理（OpenAI GPT 的 CLI 版本）

AI 代理 = 指令（提示）+ 工具（功能调用）+ 文档 (RAG)。

![aichat-agent](https://github.com/user-attachments/assets/0b7e687d-e642-4e8a-b1c1-d2d9b2da2b6b)

### 本地服务器功能

AIChat 包含一个轻量级的内置 HTTP 服务器，可简化部署。

```
$ aichat --serve
Chat Completions API: http://127.0.0.1:8000/v1/chat/completions
Embeddings API:       http://127.0.0.1:8000/v1/embeddings
Rerank API:           http://127.0.0.1:8000/v1/rerank
LLM Playground:       http://127.0.0.1:8000/playground
LLM Arena:            http://127.0.0.1:8000/arena?num=2
```

#### 代理 LLM API

LLM Arena 是一个基于 Web 的平台，您可以在其中并排比较不同的 LLM。

使用 curl 测试：

```sh
curl -X POST -H "Content-Type: application/json" -d '{
  "model":"claude:claude-3-5-sonnet-20240620",
  "messages":[{"role":"user","content":"hello"}],
  "stream":true
}' http://127.0.0.1:8000/v1/chat/completions
```

#### LLM 游乐场

一个 Web 应用程序，可直接从浏览器与受支持的 LLM 进行交互。

![aichat-llm-playground](https://github.com/user-attachments/assets/aab1e124-1274-4452-b703-ef15cda55439)

#### LLM 竞技场

一个 Web 平台，用于并排比较不同的 LLM。

![aichat-llm-arena](https://github.com/user-attachments/assets/edabba53-a1ef-4817-9153-38542ffbfec6)

## 自定义主题

AIChat 支持自定义的深色和浅色主题，这些主题可以突出显示响应文本和代码块。

![aichat-themes](https://github.com/sigoden/aichat/assets/4012553/29fa8b79-031e-405d-9caa-70d24fa0acf8)

## 文档

- [Chat-REPL 指南](https://github.com/sigoden/aichat/wiki/Chat-REPL-Guide)
- [命令行指南](https://github.com/sigoden/aichat/wiki/Command-Line-Guide)
- [角色指南](https://github.com/sigoden/aichat/wiki/Role-Guide)
- [宏指南](https://github.com/sigoden/aichat/wiki/Macro-Guide)
- [RAG 指南](https://github.com/sigoden/aichat/wiki/RAG-Guide)
- [环境变量](https://github.com/sigoden/aichat/wiki/Environment-Variables)
- [配置指南](https://github.com/sigoden/aichat/wiki/Configuration-Guide)
- [自定义主题](https://github.com/sigoden/aichat/wiki/Custom-Theme)
- [自定义 REPL 提示符](https://github.com/sigoden/aichat/wiki/Custom-REPL-Prompt)
- [常见问题解答](https://github.com/sigoden/aichat/wiki/FAQ)

## 许可证

版权所有 (c) 2023-2025 aichat-developers。

AIChat 在 MIT 许可证或 Apache 许可证 2.0 的条款下提供，您可以选择其中一种。

有关许可证详细信息，请参见 LICENSE-APACHE 和 LICENSE-MIT 文件。
