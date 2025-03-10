# SiliconFlow/硅基流动

[前往注册,送2000万 Tokens](https://cloud.siliconflow.cn/i/eluTiiYw)


## 集合顶尖大模型的一站式云服务平台

致力于为开发者提供更快、更全面、体验更丝滑的模型 API，助力开发者和企业聚焦产品创新，无须担心产品大规模推广所带来的高昂算力成本。覆盖语言模型,视觉语言模型,视频生成模型,生图模型,文本转语音模型,推理模型等一系列顶尖大模型.

### 提供开箱即用的大模型 API，按量收费，助力应用开发轻松实现。
- 已上架包括 Qwen2.5-72B、DeepSeek-V2.5、Qwen2、InternLM2.5-20B-Chat、BCE、BGE、SenseVoice-Small、DeepSeek-Coder-V2、SD3 Medium、GLM-4-9B-Chat、InstantID 在内的多种开源大语言模型、图片生成模型、代码生成模型、向量与重排序模型以及多模态大模型，覆盖语言、语音、图片、视频等多场景。
- 其中，Qwen2.5（7B）等多个大模型 API 免费使用，让开发者与产品经理无需担心研发阶段和大规模推广所带来的算力成本，实现“Token 自由”。
- 25 年 1 月，SiliconCloud 平台上线基于华为云昇腾云服务的 DeepSeek-V3、DeepSeek-R1 推理服务。通过双方联合创新，在硅基流动自研推理加速引擎加持下，平台上的 DeepSeek 模型可获得持平全球高端 GPU 部署模型的效果。　

提供高效能大模型推理加速服务，提升 GenAI 应用的用户体验。
提供模型微调与部署的托管服务，用户可直接托管经过微调的大语言模型，在支撑业务迭代的同时，无需关注底层资源、服务质量，有效降低维护成本。

## 功能特性

### JSON 模式

1. 使用场景

目前，硅基流动的大模型 API 平台 SiliconCloud 默认生成**非结构化文本**，但在某些应用场景中，您可能希望模型以**结构化**的形式输出内容，但用提示词的方式直接告诉大模型却无法获得正确的结构化输出。

作为一种标准化、轻量级的数据交换格式，JSON 模式是支持大模型 API 进行结构化输出的重要功能。当您调用大模型的 API 进行请求时，模型返回的结果以 JSON 格式呈现，易于人类阅读和编写，同时也易于机器解析和生成。

现在，SiiconCloud 平台上除了 DeepSeek 的 R1 系列和 Vl3 模型外，其他主要语言模型均已支持 JSON 模式，能让模型输出 JSON 格式的字符串，以确保模型以预期的结构输出，便于后续对输出内容进行逻辑解析。

比如，您现在可以通过 SiliconCloud API 对以下案例尝试结构化输出：

*   从公司相关报道中构建新闻数据库，包括新闻标题、链接等。
*   从商品购买评价中提取出情感分析结构，包括情感极性（正面、负面、中性）、情感强度、情感关键词等。
*   从商品购买历史中提取出产品列表，包括产品信息、推荐理由、价格、促销信息等。

2. 使用方式
-----------------------------------------------------------------------------------------------------------------

在请求中添加

```json
response_format={"type": "json_object"}
```

1. 支持模型列表
--------------------------------------------------------------------------------------------------------------------------------

目前线上，除了 DeepSeek 的 R1 系列和 V3 模型外， 其他的大语言类模型都支持上述参数。

注意：支持的模型情况可能会发生变化，请查阅本文档了解最新支持的模型列表。

你的应用必须检测并处理可能导致模型输出不完整JSON对象的边缘案例。

请合理设置max_tokens，防止JSON字符串被中断。

1. 使用示例
-----------------------------------------------------------------------------------------------------------------

下面是在 openai 中使用的例子：

```python
import json
from openai import OpenAI

client = OpenAI(
    api_key="您的 APIKEY", # 从https://cloud.siliconflow.cn/account/ak获取
    base_url="https://api.siliconflow.cn/v1"
)

response = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V2.5",
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
            {"role": "user", "content": "? 2020 年世界奥运会乒乓球男子和女子单打冠军分别是谁? "
             "Please respond in the format {\"男子冠军\": ..., \"女子冠军\": ...}"}
        ],
        response_format={"type": "json_object"}
    )

print(response.choices[0].message.content)
```

模型将输出：

```json
{"男子冠军": "马龙", "女子冠军": "陈梦"}
```

### 前缀续写

1. 使用场景
--------------------------------------------------------------------------------------------------------------

前缀续写中，用户提供希望输出的前缀信息，来让模型基于用户提供的前缀信息来补全其余的内容。 基于上述能力，模型能有更好的指令遵循能力，满足用户一些特定场景的指定格式的问题。

1. 使用方式
--------------------------------------------------------------------------------------------------------------

在请求中添加

```json
extra_body={"prefix":"希望的前缀内容"}
```

1. 支持模型列表
--------------------------------------------------------------------------------------------------------------------------------

目前[大语言类模型](https://cloud.siliconflow.cn/models?types=chat)支持上述参数。

### FIM 补全

1. 使用场景
-----------------------------------------------------------------------------------------------------------

FIM (Fill In the Middle) 补全中，用户提供希望输入的前后内容，模型来补全中间的内容，典型用于代码补全、文本中间内容补全等场景中。

1. 使用方式
-----------------------------------------------------------------------------------------------------------


2.1 在 chat/completions 接口中使用

```json
{
    "model": "model info",
    "messages": "prompt message",
    "params": "params",
    "extra_body": {"prefix":"前缀内容", "suffix":"后缀内容"}
}
```

2.2 在 completions 接口中使用

```json
{
    "model": "model info",
    "prompt": "前缀内容",
    "suffix": "后缀内容"
}
```

1. 支持模型列表
-------------------------------------------------------------------------------------------------------------------------------

*   Deepseek 系列：

    *   deepseek-ai/DeepSeek-V2.5
    *   deepseek-ai/DeepSeek-V3
*   Qwen系列：

    *   Qwen/Qwen2.5-Coder-7B-Instruct
    *   Qwen/Qwen2.5-Coder-32B-Instruct

注意：支持的模型列表可能会发生变化，请查阅[本文档](https://docs.siliconflow.cn/features/fim)了解最新支持的模型列表。

1. 使用示例
-----------------------------------------------------------------------------------------------------------

4.1 基于 OpenAI 的 chat.completions 接口使用FIM补全：

```python
client = OpenAI(
    api_key="您的 APIKEY", # 从https://cloud.siliconflow.cn/account/ak获取
    base_url="https://api.siliconflow.cn/v1"
)

messages = [
    {"role": "user", "content": "Please write quick sort code"},
]

response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V2.5",
    messages=messages,
    extra_body={
            "prefix": f"""
def quick_sort(arr):
    # 基本情况，如果数组长度小于等于 1，则返回数组
    if len(arr) <= 1:
        return arr
    else:
""",
            "suffix": f"""
# 测试 quick_sort 函数
arr = [3, 6, 8, 10, 1, 2, 1]
sorted_arr = quick_sort(arr)
print("Sorted array:", sorted_arr)
"""
    },
    stream=True,
    max_tokens=4096
)

for chunk in response:
    print(chunk.choices[0].delta.content, end='')
```

4.2 基于 OpenAI 的 completions 接口使用 FIM 补全：

```python
client = OpenAI(
    api_key="您的 APIKEY", # 从https://cloud.siliconflow.cn/account/ak获取
    base_url="https://api.siliconflow.cn/v1"
)

response = client.completions.create(
    model="deepseek-ai/DeepSeek-V2.5",
    prompt=f"""
def quick_sort(arr):
    # 基本情况，如果数组长度小于等于 1，则返回数组
    if len(arr) <= 1:
        return arr
    else:
""",
    suffix=f"""
# 测试 quick_sort 函数
arr = [3, 6, 8, 10, 1, 2, 1]
sorted_arr = quick_sort(arr)
print("Sorted array:", sorted_arr)
""",
    stream=True,
    max_tokens=4096
)

for chunk in response:
    print(chunk.choices[0].text, end='')
```

### Function Calling

1\. 使用场景
------------------------------------------------------------------------------------------------------------------------

Function Calling 功能让模型能够调用外部工具，来增强自身能力。 该能力可以通过外部工具，通过大模型作为大脑调用外部工具（如搜索外部知识、查阅行程、或者某些特定领域工具），有效解决模型的幻觉、知识时效性等问题。

2\. 使用方式
------------------------------------------------------------------------------------------------------------------------

2.1 通过 REST API 添加 tools 请求参数

在请求体中添加

```shell
"tools": [
    {
        'type': 'function',
        'function': {
            'name': '对应到实际执行的函数名称',
            'description': '此处是函数相关描述',
            'parameters': {
                '_comments': '此处是函数参数相关描述'
            },
        }
    },
    {
        '_comments': '其他函数相关说明'
    }
]
```

比如完整的 payload 信息：

```shell
payload = {
    "model": "deepseek-ai/DeepSeek-V2.5",
    "messages": [
        {
            "role": "user",
            "content": "中国大模型行业2025年将会迎来哪些机遇和挑战"
        }
    ],
    "tools": [
    {
        'type': 'function',
        'function': {
            'name': '对应到实际执行的函数名称',
            'description': '此处是函数相关描述',
            'parameters': {
                '_comments': '此处是函数参数相关描述'
            },
        }
    },
    {
        '_comments': '其他函数相关说明'
    }
    ]
    '_comments': '其他函数列表'
}
```

2.2 通过 OpenAI 库请求

该功能和openai兼容，在使用 OpenAI 的库时，对应的请求参数中添加`tools=[对应的 tools]` 比如：

```python
response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V2.5",
    messages = messages,
    tools=[
        {
            'type': 'function',
            'function': {
                'name': '对应到实际执行的函数名称',
                'description': '此处是函数相关描述',
                'parameters': {
                    // 此处是函数参数相关描述
                },
            }
        },
        {
            // 其他函数相关说明
        }
    ]
    // chat.completions 其他参数
)
```

3\. 支持模型列表
--------------------------------------------------------------------------------------------------------------------------------

目前支持的模型列表有：

*   Deepseek 系列：

    *   deepseek-ai/DeepSeek-V2.5
*   书生系列：

    *   internlm/internlm2\_5-20b-chat
    *   internlm/internlm2\_5-7b-chat
    *   Pro/internlm/internlm2\_5-7b-chat
*   Qwen系列：

    *   Qwen/Qwen2.5-72B-Instruct
    *   Qwen/Qwen2.5-32B-Instruct
    *   Qwen/Qwen2.5-14B-Instruct
    *   Qwen/Qwen2.5-7B-Instruct
    *   Pro/Qwen/Qwen2.5-7B-Instruct
*   GLM 系列：

    *   THUDM/glm-4-9b-chat
    *   Pro/THUDM/glm-4-9b-chat

注意：支持的模型列表在不断调整中，请查阅[本文档](https://docs.siliconflow.cn/features/function_calling)了解最新支持的模型列表。

4\. 使用示例
------------------------------------------------------------------------------------------------------------------------

###

4.1. 示例 1：通过function calling 来扩展大语言模型的数值计算能力

本代码输入 4 个函数，分别是数值的加、减、比较大小、字符串中重复字母计数四个函数 来演示通过function calling来解决大语言模型在tokens 预测不擅长的领域的执行问题。

```python

from openai import OpenAI

client = OpenAI(
    api_key="您的 APIKEY", # 从https://cloud.siliconflow.cn/account/ak获取
    base_url="https://api.siliconflow.cn/v1"
)

def add(a: float, b: float):
    return a + b

def mul(a: float, b: float):
    return a * b

def compare(a: float, b: float):
    if a > b:
        return f'{a} is greater than {b}'
    elif a < b:
        return f'{b} is greater than {a}'
    else:
        return f'{a} is equal to {b}'

def count_letter_in_string(a: str, b: str):
    string = a.lower()
    letter = b.lower()

    count = string.count(letter)
    return(f"The letter '{letter}' appears {count} times in the string.")


tools = [
{
    'type': 'function',
    'function': {
        'name': 'add',
        'description': 'Compute the sum of two numbers',
        'parameters': {
            'type': 'object',
            'properties': {
                'a': {
                    'type': 'int',
                    'description': 'A number',
                },
                'b': {
                    'type': 'int',
                    'description': 'A number',
                },
            },
            'required': ['a', 'b'],
        },
    }
},
{
    'type': 'function',
    'function': {
        'name': 'mul',
        'description': 'Calculate the product of two numbers',
        'parameters': {
            'type': 'object',
            'properties': {
                'a': {
                    'type': 'int',
                    'description': 'A number',
                },
                'b': {
                    'type': 'int',
                    'description': 'A number',
                },
            },
            'required': ['a', 'b'],
        },
    }
},
{
    'type': 'function',
    'function': {
        'name': 'count_letter_in_string',
        'description': 'Count letter number in a string',
        'parameters': {
            'type': 'object',
            'properties': {
                'a': {
                    'type': 'str',
                    'description': 'source string',
                },
                'b': {
                    'type': 'str',
                    'description': 'letter',
                },
            },
            'required': ['a', 'b'],
        },
    }
},
{
    'type': 'function',
    'function': {
        'name': 'compare',
        'description': 'Compare two number, which one is bigger',
        'parameters': {
            'type': 'object',
            'properties': {
                'a': {
                    'type': 'float',
                    'description': 'A number',
                },
                'b': {
                    'type': 'float',
                    'description': 'A number',
                },
            },
            'required': ['a', 'b'],
        },
    }
}
]

def function_call_playground(prompt):
    messages = [{'role': 'user', 'content': prompt}]
    response = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V2.5",
        messages = messages,
        temperature=0.01,
        top_p=0.95,
        stream=False,
        tools=tools)

    # print(response)
    func1_name = response.choices[0].message.tool_calls[0].function.name
    func1_args = response.choices[0].message.tool_calls[0].function.arguments
    func1_out = eval(f'{func1_name}(**{func1_args})')
    # print(func1_out)

    messages.append(response.choices[0].message)
    messages.append({
        'role': 'tool',
        'content': f'{func1_out}',
        'tool_call_id': response.choices[0].message.tool_calls[0].id
    })
    # print(messages)
    response = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V2.5",
        messages=messages,
        temperature=0.01,
        top_p=0.95,
        stream=False,
        tools=tools)
    return response.choices[0].message.content

prompts = [
    "用中文回答：strawberry中有多少个r?",
    "用中文回答：9.11和9.9，哪个小?"
]

for prompt in prompts:
    print(function_call_playground(prompt))
```

模型将输出：

```shell
strawberry中有3个r。
9.11 比 9.9 小。
```

4.2. 示例 2：通过function calling 来扩展大语言模型对外部环境的理解

本代码输入 1 个函数，通过外部 API 来查询外部信息

```python
import requests
from openai import OpenAI

client = OpenAI(
    api_key="您的 APIKEY", # 从https://cloud.siliconflow.cn/account/ak获取
    base_url="https://api.siliconflow.cn/v1"
)

# 使用 WeatherAPI 的天气查询函数
def get_weather(city: str):
    # 使用 WeatherAPI 的 API 来获取天气信息
    api_key = "您的WeatherAPI APIKEY"  # 替换为你自己的 WeatherAPI APIKEY
    base_url = "http://api.weatherapi.com/v1/current.json"
    params = {
        'key': api_key,
        'q': city,
        'aqi': 'no'  # 不需要空气质量数据
    }

    # 调用天气 API
    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        weather = data['current']['condition']['text']
        temperature = data['current']['temp_c']
        return f"The weather in {city} is {weather} with a temperature of {temperature}°C."
    else:
        return f"Could not retrieve weather information for {city}."

# 定义 OpenAI 的 function calling tools
tools = [
    {
        'type': 'function',
        'function': {
            'name': 'get_weather',
            'description': 'Get the current weather for a given city.',
            'parameters': {
                'type': 'object',
                'properties': {
                    'city': {
                        'type': 'string',
                        'description': 'The name of the city to query weather for.',
                    },
                },
                'required': ['city'],
            },
        }
    }
]

# 发送请求并处理 function calling
def function_call_playground(prompt):
    messages = [{'role': 'user', 'content': prompt}]

    # 发送请求到 OpenAI API
    response = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V2.5",
        messages=messages,
        temperature=0.01,
        top_p=0.95,
        stream=False,
        tools=tools
    )

    # 处理 API 返回的工具调用请求
    func1_name = response.choices[0].message.tool_calls[0].function.name
    func1_args = response.choices[0].message.tool_calls[0].function.arguments
    func1_out = eval(f'{func1_name}(**{func1_args})')

    # 将结果添加到对话中并返回
    messages.append(response.choices[0].message)
    messages.append({
        'role': 'tool',
        'content': f'{func1_out}',
        'tool_call_id': response.choices[0].message.tool_calls[0].id
    })

    # 返回模型响应
    response = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V2.5",
        messages=messages,
        temperature=0.01,
        top_p=0.95,
        stream=False,
        tools=tools
    )

    return response.choices[0].message.content

# 示例使用
prompt = "how is the weather today in beijing?"
print(function_call_playground(prompt))
```

模型将输出：

```shell
The weather in Beijing today is sunny with a temperature of 21.4°C.
```

## 注册奖励

SiliconCloud 奖励持续进行，2000 万 Tokens 送不停！
1. 邀请好友赚 2000 万 Tokens：每成功邀请一位新用户通过手机号码注册，您将获得 2000 万 Tokens；
2. 注册即送 2000 万 Tokens：受邀好友作为新用户完成 SiliconCloud 账号注册，立刻获得 2000万 Tokens。

### 特别说明

平台 2000 万 Tokens 特指 Qwen2.5-14B-Instruct 模型单价下的数量，实际到账为 14 元平台配额；
奖励 Tokens 对应的平台配额资金仅限于 SiliconCloud 平台使用，不可提现；
为了确保活动公平，严禁奖励转卖、刷单等违规行为，平台将对违反规则的账户取消奖励资格并追究相关责任；
在法律允许范围内，本活动的最终解释权归硅基流动所有。
