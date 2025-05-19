# Codex

核心内容:
- Codex CLI 是一个在终端中运行的编码助手，可以理解和执行您的存储库。
- 它支持多种模型，包括 OpenAI、Azure、OpenRouter 等，并且可以通过配置文件进行灵活配置。
- Codex CLI 提供了不同的权限模式，可以在安全可靠的环境中自动运行，并具有详细的日志记录和调试功能。

**[OpenAI Codex CLI](https://github.com/openai/codex)是轻量级的编码助手，可在您的终端中运行**

![Codex 演示 GIF，使用：codex "explain this codebase to me"](https://ai.programnotes.cn/img/ai/codex.gif)

## 快速入门

全局安装：

```shell
npm install -g @openai/codex
```

接下来，将 OpenAI API 密钥设置为环境变量：

```shell
export OPENAI_API_KEY="your-api-key-here"
```

> **注意：** 此命令仅为当前终端会话设置密钥。您可以将 `export` 行添加到 shell 的配置文件（例如 `~/.zshrc`），但我们建议为会话设置。**提示：** 您还可以将 API 密钥放入项目根目录下的 `.env` 文件中：
>
> ```env
> OPENAI_API_KEY=your-api-key-here
> ```
>
> CLI 将自动从 `.env` 加载变量（通过 `dotenv/config`）。

### 使用其他模型

> Codex 还允许您使用支持 OpenAI Chat Completions API 的其他提供商。您可以在配置文件中设置提供商，或使用 `--provider` 标志。`--provider` 的可能选项包括：
>
> - openai（默认）
> - openrouter
> - azure
> - gemini
> - ollama
> - mistral
> - deepseek
> - xai
> - groq
> - arceeai
> - 任何其他与 OpenAI API 兼容的提供商
>
> 如果您使用除 OpenAI 之外的提供商，您需要在配置文件或环境变量中设置提供商的 API 密钥，如下所示：
>
> ```shell
> export <provider>_API_KEY="your-api-key-here"
> ```
>
> 如果您使用上面未列出的提供商，您还必须设置提供商的基本 URL：
>
> ```shell
> export <provider>_BASE_URL="https://your-provider-api-base-url"
> ```

### 以交互方式运行

```shell
codex
```

或者，使用提示作为输入运行（可以选择以 `Full Auto` 模式运行）：

```shell
codex "explain this codebase to me"
```

```shell
codex --approval-mode full-auto "create the fanciest todo-list app"
```

就是这样 - Codex 将搭建一个文件，在沙盒中运行它，安装任何缺少的依赖项，并向您展示实时结果。批准更改后，它们将被提交到您的工作目录。

---

## 为什么选择 Codex？

Codex CLI 专为已经**生活在终端中**的开发人员而构建，他们希望获得 ChatGPT 级别的推理能力**以及**实际运行代码、操作文件和迭代的能力 - 所有这些都在版本控制之下。简而言之，它是一种_聊天驱动的开发_，可以理解和执行您的存储库。

- **零设置** - 提供您的 OpenAI API 密钥即可使用！
- **完全自动批准，同时安全可靠**，通过禁用网络和目录沙盒运行
- **多模式** - 传入屏幕截图或图表以实现功能 ✨

并且它是**完全开源的**，因此您可以查看并贡献其开发方式！

---

## 安全模型 & 权限

Codex 允许您通过 `--approval-mode` 标志（或交互式引导提示）来决定代理接收的_自主权_和自动批准策略：

| 模式                   | 代理在不询问的情况下可以做什么                                             | 仍然需要批准                                                            |
| ---------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Suggest** <br>(默认) | <li>读取存储库中的任何文件                                                 | <li>**所有** 文件写入/补丁<li> **任何** 任意 shell 命令（除了读取文件） |
| **Auto Edit**          | <li>读取 **并** 将补丁写入文件                                             | <li>**所有** shell 命令                                                 |
| **Full Auto**          | <li>读取/写入文件 <li> 执行 shell 命令（禁用网络，写入限制为您的工作目录） | -                                                                       |

在 **Full Auto** 中，每个命令都以**禁用网络**运行，并限制在当前工作目录（加上临时文件）中，以实现深度防御。如果您在目录_未_被 Git 跟踪的情况下以 **auto-edit** 或 **full-auto** 启动，Codex 还会显示警告/确认，因此您始终有一个安全网。

即将推出：一旦我们确信有额外的保障措施，您就可以将特定的命令列入白名单以自动执行，并启用网络。

### 平台沙盒细节

Codex 使用的强化机制取决于您的操作系统：

- **macOS 12+** - 命令使用 **Apple Seatbelt** (`sandbox-exec`) 包装。

  - 除了少量可写根目录（`$PWD`、`$TMPDIR`、`~/.codex` 等）外，所有内容都放置在只读监狱中。
  - 默认情况下，出站网络被_完全阻止_ - 即使子进程尝试 `curl` 某个地方，也会失败。

- **Linux** - 默认情况下没有沙盒。
  我们建议使用 Docker 进行沙盒处理，其中 Codex 在**最小容器镜像**中启动自身，并将您的存储库以相同路径_读/写_挂载。自定义 `iptables`/`ipset` 防火墙脚本拒绝除 OpenAI API 之外的所有出口。这使您无需主机上的 root 即可进行确定性、可重现的运行。您可以使用 [`run_in_container.sh`](./codex-cli/scripts/run_in_container.sh) 脚本来设置沙盒。

---

## 系统要求

| 要求              | 详细信息                                                         |
| ----------------- | ---------------------------------------------------------------- |
| 操作系统          | macOS 12+，Ubuntu 20.04+/Debian 10+，或 Windows 11 **通过 WSL2** |
| Node.js           | **22 或更高版本**（推荐使用 LTS）                                |
| Git（可选，推荐） | 2.23+，用于内置的 PR 助手                                        |
| 内存              | 最小 4-GB（推荐 8-GB）                                           |

> 切勿运行 `sudo npm install -g`；请改为修复 npm 权限。

---

## CLI 参考

| 命令                                 | 目的                   | 示例                                 |
| ------------------------------------ | ---------------------- | ------------------------------------ |
| `codex`                              | 交互式 REPL            | `codex`                              |
| `codex "..."`                        | 交互式 REPL 的初始提示 | `codex "fix lint errors"`            |
| `codex -q "..."`                     | 非交互式“安静模式”     | `codex -q --json "explain utils.ts"` |
| `codex completion <bash\|zsh\|fish>` | 打印 shell 补全脚本    | `codex completion bash`              |

主要标志：`--model/-m`、`--approval-mode/-a`、`--quiet/-q` 和 `--notify`。

---

## 内存 & 项目文档

您可以使用 `AGENTS.md` 文件为 Codex 提供额外的指令和指导。Codex 在以下位置查找 `AGENTS.md` 文件，并自上而下合并它们：

1. `~/.codex/AGENTS.md` - 个人全局指导
2. 存储库根目录下的 `AGENTS.md` - 共享项目笔记
3. 当前工作目录中的 `AGENTS.md` - 子文件夹/功能特定信息

使用 `--no-project-doc` 或环境变量 `CODEX_DISABLE_PROJECT_DOC=1` 禁用这些文件的加载。

---

## 非交互式 / CI 模式

在管道中以无头模式运行 Codex。GitHub Action 步骤示例：

```yaml
- name: Update changelog via Codex
  run: |
    npm install -g @openai/codex
    export OPENAI_API_KEY="${{ secrets.OPENAI_KEY }}"
    codex -a auto-edit --quiet "update CHANGELOG for next release"
```

设置 `CODEX_QUIET_MODE=1` 以消除交互式 UI 噪音。

## 追踪 / 详细日志

设置环境变量 `DEBUG=true` 会打印完整的 API 请求和响应详细信息：

```shell
DEBUG=true codex
```

---

## 使用示例

以下是一些您可以复制粘贴的小示例。将引号中的文本替换为您自己的任务。请参阅 [提示指南](https://github.com/openai/codex/blob/main/codex-cli/examples/prompting_guide.md) 了解更多提示和使用模式。

| ✨   | 你输入的内容                                                                    | 发生的事情                                           |
| --- | ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 1   | `codex "Refactor the Dashboard component to React Hooks"`                       | Codex 重写类组件，运行 `npm test`，并显示差异。      |
| 2   | `codex "Generate SQL migrations for adding a users table"`                      | 推断您的 ORM，创建迁移文件，并在沙盒 DB 中运行它们。 |
| 3   | `codex "Write unit tests for utils/date.ts"`                                    | 生成测试，执行它们，并迭代直到它们通过。             |
| 4   | `codex "Bulk-rename *.jpeg -> *.jpg with git mv"`                               | 安全地重命名文件并更新导入/用法。                    |
| 5   | `codex "Explain what this regex does: ^(?=.*[A-Z]).{8,}$"`                      | 输出逐步的人工解释。                                 |
| 6   | `codex "Carefully review this repo, and propose 3 high impact well-scoped PRs"` | 建议当前代码库中具有影响力的 PR。                    |
| 7   | `codex "Look for vulnerabilities and create a security review report"`          | 查找并解释安全漏洞。                                 |

---

## 安装

<details open>
<summary><strong>从 npm 安装（推荐）</strong></summary>

```bash
npm install -g @openai/codex
# or
yarn global add @openai/codex
# or
bun install -g @openai/codex
# or
pnpm add -g @openai/codex
```

</details>

<details>
<summary><strong>从源代码构建</strong></summary>

```bash
# 克隆存储库并导航到 CLI 包
git clone https://github.com/openai/codex.git
cd codex/codex-cli

# 启用 corepack
corepack enable

# 安装依赖项并构建
pnpm install
pnpm build

# 仅限 Linux：下载预构建的沙盒二进制文件（需要 gh 和 zstd）。
./scripts/install_native_deps.sh

# 获取用法和选项
node ./dist/cli.js --help

# 直接运行本地构建的 CLI
node ./dist/cli.js

# 或者为了方便起见，全局链接该命令
pnpm link
```

</details>

---

## 配置指南

Codex 配置文件可以放置在 `~/.codex/` 目录中，支持 YAML 和 JSON 格式。

### 基本配置参数

| 参数                | 类型    | 默认值     | 描述                     | 可用选项                                                                  |
| ------------------- | ------- | ---------- | ------------------------ | ------------------------------------------------------------------------- |
| `model`             | string  | `o4-mini`  | 要使用的 AI 模型         | 任何支持 OpenAI API 的模型名称                                            |
| `approvalMode`      | string  | `suggest`  | AI 助手的权限模式        | `suggest`（仅建议）<br>`auto-edit`（自动编辑）<br>`full-auto`（完全自动） |
| `fullAutoErrorMode` | string  | `ask-user` | 完全自动模式下的错误处理 | `ask-user`（提示用户输入）<br>`ignore-and-continue`（忽略并继续）         |
| `notify`            | boolean | `true`     | 启用桌面通知             | `true`/`false`                                                            |

### 自定义 AI 提供商配置

在 `providers` 对象中，您可以配置多个 AI 服务提供商。每个提供商都需要以下参数：

| 参数      | 类型   | 描述                          | 示例                          |
| --------- | ------ | ----------------------------- | ----------------------------- |
| `name`    | string | 提供商的显示名称              | `"OpenAI"`                    |
| `baseURL` | string | API 服务 URL                  | `"https://api.openai.com/v1"` |
| `envKey`  | string | 环境变量名称（用于 API 密钥） | `"OPENAI_API_KEY"`            |

### 历史记录配置

在 `history` 对象中，您可以配置对话历史记录设置：

| 参数                | 类型    | 描述                             | 示例值 |
| ------------------- | ------- | -------------------------------- | ------ |
| `maxSize`           | number  | 要保存的最大历史记录条目数       | `1000` |
| `saveHistory`       | boolean | 是否保存历史记录                 | `true` |
| `sensitivePatterns` | array   | 要在历史记录中过滤的敏感信息模式 | `[]`   |

### 配置示例

1. YAML 格式（另存为 `~/.codex/config.yaml`）：

```yaml
model: o4-mini
approvalMode: suggest
fullAutoErrorMode: ask-user
notify: true
```

2. JSON 格式（另存为 `~/.codex/config.json`）：

```json
{
  "model": "o4-mini",
  "approvalMode": "suggest",
  "fullAutoErrorMode": "ask-user",
  "notify": true
}
```

### 完整配置示例

以下是包含多个自定义提供商的 `config.json` 的完整示例：

```json
{
  "model": "o4-mini",
  "provider": "openai",
  "providers": {
    "openai": {
      "name": "OpenAI",
      "baseURL": "https://api.openai.com/v1",
      "envKey": "OPENAI_API_KEY"
    },
    "azure": {
      "name": "AzureOpenAI",
      "baseURL": "https://YOUR_PROJECT_NAME.openai.azure.com/openai",
      "envKey": "AZURE_OPENAI_API_KEY"
    },
    "openrouter": {
      "name": "OpenRouter",
      "baseURL": "https://openrouter.ai/api/v1",
      "envKey": "OPENROUTER_API_KEY"
    },
    "gemini": {
      "name": "Gemini",
      "baseURL": "https://generativelanguage.googleapis.com/v1beta/openai",
      "envKey": "GEMINI_API_KEY"
    },
    "ollama": {
      "name": "Ollama",
      "baseURL": "http://localhost:11434/v1",
      "envKey": "OLLAMA_API_KEY"
    },
    "mistral": {
      "name": "Mistral",
      "baseURL": "https://api.mistral.ai/v1",
      "envKey": "MISTRAL_API_KEY"
    },
    "deepseek": {
      "name": "DeepSeek",
      "baseURL": "https://api.deepseek.com",
      "envKey": "DEEPSEEK_API_KEY"
    },
    "xai": {
      "name": "xAI",
      "baseURL": "https://api.x.ai/v1",
      "envKey": "XAI_API_KEY"
    },
    "groq": {
      "name": "Groq",
      "baseURL": "https://api.groq.com/openai/v1",
      "envKey": "GROQ_API_KEY"
    },
    "arceeai": {
      "name": "ArceeAI",
      "baseURL": "https://conductor.arcee.ai/v1",
      "envKey": "ARCEEAI_API_KEY"
    }
  },
  "history": {
    "maxSize": 1000,
    "saveHistory": true,
    "sensitivePatterns": []
  }
}
```

### 自定义指令

您可以创建一个 `~/.codex/AGENTS.md` 文件来为代理定义自定义指导：

```markdown
- 始终用表情符号回复
- 仅在明确要求时才使用 git 命令
```

### 环境变量设置

对于每个 AI 提供商，您需要在环境变量中设置相应的 API 密钥。例如：

```bash
# OpenAI
export OPENAI_API_KEY="your-api-key-here"

# Azure OpenAI
export AZURE_OPENAI_API_KEY="your-azure-api-key-here"
export AZURE_OPENAI_API_VERSION="2025-03-01-preview" (可选)

# OpenRouter
export OPENROUTER_API_KEY="your-openrouter-key-here"

# 类似地，适用于其他提供商
```

---

## 常见问题解答

<details>
<summary>OpenAI 在 2021 年发布了一个名为 Codex 的模型 - 这两者有关联吗？</summary>

2021 年，OpenAI 发布了 Codex，这是一个旨在从自然语言提示生成代码的 AI 系统。最初的 Codex 模型已于 2023 年 3 月弃用，并且与 CLI 工具分开。

</details>

<details>
<summary>支持哪些模型？</summary>

任何可通过 [Responses API](https://platform.openai.com/docs/api-reference/responses) 获得的模型。默认值为 `o4-mini`，但传递 `--model gpt-4.1` 或在您的配置文件中设置 `model: gpt-4.1` 以覆盖。

</details>
<details>
<summary>为什么 <code>o3</code> 或 <code>o4-mini</code> 对我不起作用？</summary>

您的 [API 帐户可能需要经过验证](https://help.openai.com/en/articles/10910291-api-organization-verification)，才能开始流式传输响应并从 API 中查看思维链摘要。如果您仍然遇到问题，请告诉我们！

</details>

<details>
<summary>如何阻止 Codex 编辑我的文件？</summary>

Codex 在沙盒中运行模型生成的命令。如果建议的命令或文件更改看起来不正确，您可以简单地键入 **n** 来拒绝该命令或向模型提供反馈。

</details>
<details>
<summary>它可以在 Windows 上运行吗？</summary>

不能直接运行。它需要 [适用于 Linux 的 Windows 子系统 (WSL2)](https://learn.microsoft.com/en-us/windows/wsl/install) - Codex 已在 macOS 和 Linux 上使用 Node 22 进行了测试。

</details>

---

## 零数据保留 (ZDR) 用法

Codex CLI **确实**支持启用了 [零数据保留 (ZDR)](https://platform.openai.com/docs/guides/your-data#zero-data-retention) 的 OpenAI 组织。如果您的 OpenAI 组织已启用零数据保留，但您仍然遇到如下错误：

```
OpenAI rejected the request. Error details: Status: 400, Code: unsupported_parameter, Type: invalid_request_error, Message: 400 Previous response cannot be used for this organization due to Zero Data Retention.
```

您可能需要使用以下命令升级到更新的版本：`npm i -g @openai/codex@latest`

---

## Codex 开源基金

我们很高兴推出一项 **100 万美元的计划**，以支持使用 Codex CLI 和其他 OpenAI 模型的开源项目。

- 资助金额最高为 **25,000 美元** API 积分。
- 应用程序将**滚动审查**。

**感兴趣？[在此处申请](https://openai.com/form/codex-open-source-fund/)。**

---

## 贡献

该项目正在积极开发中，代码可能会发生相当大的变化。一旦完成，我们将更新此消息！

更广泛地说，我们欢迎贡献 - 无论您是打开您的第一个 pull request，还是您是经验丰富的维护人员。同时，我们关心可靠性和长期可维护性，因此合并代码的门槛有意**很高**。以下指南阐明了“高质量”在实践中的含义，并应使整个过程透明且友好。

### 开发工作流程

- 从 `main` 创建一个_主题分支_ - 例如 `feat/interactive-prompt`。
- 保持您的更改集中。多个不相关的修复应作为单独的 PR 打开。
- 在开发期间使用 `pnpm test:watch` 以获得超快的反馈。
- 我们使用 **Vitest** 进行单元测试，使用 **ESLint** + **Prettier** 进行样式，使用 **TypeScript** 进行类型检查。
- 在推送之前，运行完整的测试/类型/lint 套件：

### 带有 Husky 的 Git 钩子

该项目使用 [Husky](https://typicode.github.io/husky/) 来强制执行代码质量检查：

- **Pre-commit 钩子**：在提交之前自动运行 lint-staged 以格式化和 lint 文件
- **Pre-push 钩子**：在推送到远程之前运行测试和类型检查

这些钩子有助于保持代码质量并防止推送具有失败测试的代码。有关更多详细信息，请参阅 [HUSKY.md](./codex-cli/HUSKY.md)。

```bash
pnpm test && pnpm run lint && pnpm run typecheck
```

- 如果您**尚未**签署贡献者许可协议 (CLA)，请添加包含以下确切文本的 PR 评论

  ```text
  I have read the CLA Document and I hereby sign the CLA
  ```

  CLA-Assistant 机器人将在所有作者都签名后将 PR 状态变为绿色。

```bash
# 观察模式（测试在更改时重新运行）
pnpm test:watch

# 在不发出文件的情况下进行类型检查
pnpm typecheck

# 自动修复 lint + prettier 问题
pnpm lint:fix
pnpm format:fix
```

### 调试

要使用可视化调试器调试 CLI，请在 `codex-cli` 文件夹中执行以下操作：

- 运行 `pnpm run build` 以构建 CLI，这将在 `dist` 文件夹中的 `cli.js` 旁边生成 `cli.js.map`。
- 使用 `node --inspect-brk ./dist/cli.js` 运行 CLI。然后，程序会等到连接调试器后再继续。选项：
  - 在 VS Code 中，从命令面板中选择**Debug: Attach to Node Process**，然后在下拉列表中选择调试端口 `9229` 的选项（可能是第一个选项）
  - 在 Chrome 中转到 <chrome://inspect>，找到 **localhost:9229**，然后单击**trace**

### 编写高影响力的代码更改

1. **从 issue 开始。** 打开一个新的 issue 或在现有的讨论中发表评论，以便我们在编写代码之前就解决方案达成一致。
2. **添加或更新测试。** 每个新功能或错误修复都应该附带测试覆盖，该测试覆盖在您的更改之前失败并在之后通过。不需要 100% 覆盖，但目标是进行有意义的断言。
3. **记录行为。** 如果您的更改会影响面向用户的行为，请更新 README、内联帮助 (`codex --help`) 或相关示例项目。
4. **保持提交原子性。** 每次提交都应该编译并且测试应该通过。这使得审查和潜在的回滚更容易。

### 打开一个 Pull Request

- 填写 PR 模板（或包括类似信息）- **什么？为什么？怎么做？**
- 在本地运行**所有**检查 (`npm test && npm run lint && npm run typecheck`)。本可以在本地捕获的 CI 失败会减慢该过程。
- 确保您的分支与 `main` 保持最新，并且您已解决合并冲突。
- 仅当您认为 PR 处于可合并状态时，才将其标记为**准备好审查**。

### 审查流程

1. 一位维护人员将被分配为主要审查员。
2. 我们可能会要求进行更改 - 请不要对此感到不快。我们重视工作，我们只是也重视一致性和长期可维护性。
3. 当达成共识认为 PR 符合标准时，维护人员将 squash-and-merge。

### 社区价值观

- **友善和包容。** 尊重他人；我们遵循 [贡献者盟约](https://www.contributor-covenant.org/)。
- **假设良好的意图。** 书面沟通很难 - 倾向于慷慨。
- **教学与学习。** 如果您发现任何令人困惑的事情，请打开一个 issue 或 PR 进行改进。

### 获取帮助

如果您在设置项目时遇到问题，想要获得关于想法的反馈，或者只是想说 _hi_ - 请打开一个讨论或跳到相关的 issue 中。我们很乐意提供帮助。

我们可以一起使 Codex CLI 成为一个令人难以置信的工具。**祝你黑客愉快！** :rocket:

### 贡献者许可协议 (CLA)

所有贡献者**必须**接受 CLA。该过程很简单：

1. 打开您的 pull request。
2. 粘贴以下评论（如果您之前已签名，请回复 `recheck`）：

   ```text
   I have read the CLA Document and I hereby sign the CLA
   ```

3. CLA-Assistant 机器人会在存储库中记录您的签名并将状态检查标记为已通过。

不需要特殊的 Git 命令、电子邮件附件或提交脚注。

#### 快速修复

| 场景         | 命令                                             |
| ------------ | ------------------------------------------------ |
| 修改上次提交 | `git commit --amend -s --no-edit && git push -f` |

**DCO 检查**会阻止合并，直到 PR 中的每次提交都带有脚注（通过 squash 这只是一个）。

### 发布 `codex`

要发布 CLI 的新版本，您首先需要暂存 npm 包。`codex-cli/scripts/` 中的一个辅助脚本可以完成所有繁重的工作。在 `codex-cli` 文件夹中运行：

```bash
# 经典、JS 实现，包括用于 Linux 沙盒的小型原生二进制文件。
pnpm stage-release

# （可选）指定在运行之间重用的临时目录。
RELEASE_DIR=$(mktemp -d)
pnpm stage-release --tmp "$RELEASE_DIR"

# “胖”包，另外捆绑了用于 Linux 的原生 Rust CLI 二进制文件。最终用户可以通过设置 CODEX_RUST=1 在运行时选择加入。
pnpm stage-release --native
```

转到暂存发布版本的文件夹，并验证它是否按预期工作。如果是，请从临时文件夹中运行以下命令：

```
cd "$RELEASE_DIR"
npm publish
```

### 替代构建选项

#### Nix flake 开发

先决条件：启用了 flakes 的 Nix >= 2.4（`experimental-features = nix-command flakes` 在 `~/.config/nix/nix.conf` 中）。

进入 Nix 开发 shell：

```bash
# 根据要使用的实现，使用以下任一命令
nix develop .#codex-cli # 用于进入 codex-cli 特定 shell
nix develop .#codex-rs # 用于进入 codex-rs 特定 shell
```

此 shell 包含 Node.js，安装依赖项，构建 CLI，并提供 `codex` 命令别名。

直接构建并运行 CLI：

```bash
# 根据要使用的实现，使用以下任一命令
nix build .#codex-cli # 用于构建 codex-cli
nix build .#codex-rs # 用于构建 codex-rs
./result/bin/codex --help
```

通过 flake 应用程序运行 CLI：

```bash
# 根据要使用的实现，使用以下任一命令
nix run .#codex-cli # 用于运行 codex-cli
nix run .#codex-rs # 用于运行 codex-rs
```

将 direnv 与 flakes 一起使用

如果您已安装 direnv，则可以使用以下 `.envrc` 在您 `cd` 进入项目目录时自动进入 Nix shell：

```bash
cd codex-rs
echo "use flake ../flake.nix#codex-cli" >> .envrc && direnv allow
cd codex-cli
echo "use flake ../flake.nix#codex-rs" >> .envrc && direnv allow
```

## 参考

- [Codex,中文文档](https://ai.programnotes.cn/p/openai-codex-cli%E7%BB%88%E7%AB%AF%E4%B8%AD%E7%9A%84%E8%BD%BB%E9%87%8F%E7%BA%A7%E7%BC%96%E7%A0%81%E5%8A%A9%E6%89%8B/)