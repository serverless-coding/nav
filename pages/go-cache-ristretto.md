# Ristretto: 高效可靠的Go 缓存库

**摘要:**
- Ristretto 是一个快速、并发的缓存库，其构建重点是性能和正确性。
- Ristretto 的性能凭借其独特的准入/驱逐策略配对而堪称一流。
- Ristretto 已为生产环境准备就绪，并被 Badger 和 Dgraph 等项目使用。

[![GitHub License](https://img.shields.io/github/license/hypermodeinc/ristretto)](https://github.com/hypermodeinc/ristretto?tab=Apache-2.0-1-ov-file#readme)
[![chat](https://img.shields.io/discord/1267579648657850441)](https://discord.hypermode.com)
[![GitHub Repo stars](https://img.shields.io/github/stars/hypermodeinc/ristretto)](https://github.com/hypermodeinc/ristretto/stargazers)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hypermodeinc/ristretto)](https://github.com/hypermodeinc/ristretto/commits/main/)
[![Go Report Card](https://img.shields.io/badge/go%20report-A%2B-brightgreen)](https://goreportcard.com/report/github.com/dgraph-io/ristretto)

Ristretto 是一个快速、并发的缓存库，其构建重点是性能和正确性。

构建 Ristretto 的动机源于在 [Dgraph][] 中需要一个无竞争的缓存。

[Dgraph]: https://github.com/hypermodeinc/dgraph

## 特性

- **高命中率** - 凭借我们独特的准入/驱逐策略配对，Ristretto 的性能堪称一流。
  - **驱逐: SampledLFU** - 与精确 LRU 相媲美，在搜索和数据库跟踪方面性能更佳。
  - **准入: TinyLFU** - 以极小的内存开销（每个计数器 12 位）提供额外性能。
- **高吞吐量** - 我们使用多种技术来管理争用，从而实现了出色的吞吐量。
- **基于成本的驱逐** - 任何被认为有价值的大型新项目都可以驱逐多个较小的项目（成本可以是任何东西）。
- **完全并发** - 您可以随心所欲地使用任意数量的 goroutine，而吞吐量几乎没有下降。
- **指标** - 可选的性能指标，用于衡量吞吐量、命中率和其他统计数据。
- **简单的 API** - 只需确定您理想的 `Config` 值，即可开始运行。

## 状态

Ristretto 已为生产环境准备就绪。请参阅[使用 Ristretto 的项目](#projects-using-ristretto)。

## 入门

### 安装

要开始使用 Ristretto，请安装 Go 1.21 或更高版本。Ristretto 需要 go 模块。在您的项目中，运行以下命令：

```sh
go get github.com/dgraph-io/ristretto/v2
```

这将获取该库。

#### 选择版本

请遵循以下规则：

- v1.x.x 是大多数具有 Ristretto 依赖项的程序中使用的第一个版本。
- v2.x.x 是支持泛型的新版本，因此其接口略有不同。此版本旨在解决使用旧版本 Ristretto 的程序的兼容性问题。如果您要开始编写新程序，建议使用此版本。

## 用法

```go
package main

import (
  "fmt"

  "github.com/dgraph-io/ristretto/v2"
)

func main() {
  cache, err := ristretto.NewCache(&ristretto.Config[string, string]{
    NumCounters: 1e7,     // 用于跟踪频率的键数 (10M)。
    MaxCost:     1 << 30, // 缓存的最大成本 (1GB)。
    BufferItems: 64,      // 每个 Get 缓冲区的键数。
  })
  if err != nil {
    panic(err)
  }
  defer cache.Close()

  // 设置一个成本为 1 的值
  cache.Set("key", "value", 1)

  // 等待值通过缓冲区
  cache.Wait()

  // 从缓存中获取值
  value, found := cache.Get("key")
  if !found {
    panic("missing value")
  }
  fmt.Println(value)

  // 从缓存中删除值
  cache.Del("key")
}
```

## 基准测试

基准测试可以在 https://github.com/hypermodeinc/dgraph-benchmarks/tree/main/cachebench/ristretto 中找到。

### 搜索命中率

此跟踪被描述为“由大型商业搜索引擎为响应各种 Web 搜索请求而发起的磁盘读取访问”。

<p align="center">
  <img src="https://raw.githubusercontent.com/hypermodeinc/ristretto/main/benchmarks/Hit%20Ratios%20-%20Search%20(ARC-S3).svg"
  alt="显示搜索工作负载命中率比较的图表">
</p>

### 数据库命中率

此跟踪被描述为“在商业站点上运行的数据库服务器，该服务器在商业数据库之上运行 ERP 应用程序”。

<p align="center">
  <img src="https://raw.githubusercontent.com/hypermodeinc/ristretto/main/benchmarks/Hit%20Ratios%20-%20Database%20(ARC-DS1).svg"
  alt="显示数据库工作负载命中率比较的图表">
</p>

### 循环命中率

此跟踪演示了循环访问模式。

<p align="center">
  <img src="https://raw.githubusercontent.com/hypermodeinc/ristretto/main/benchmarks/Hit%20Ratios%20-%20Glimpse%20(LIRS-GLI).svg"
  alt="显示循环访问模式命中率比较的图表">
</p>

### CODASYL 命中率

此跟踪被描述为“对 CODASYL 数据库在一小时内的引用”。

<p align="center">
  <img src="https://raw.githubusercontent.com/hypermodeinc/ristretto/main/benchmarks/Hit%20Ratios%20-%20CODASYL%20(ARC-OLTP).svg"
  alt="显示 CODASYL 工作负载命中率比较的图表">
</p>

### 混合工作负载的吞吐量

<p align="center">
  <img src="https://raw.githubusercontent.com/hypermodeinc/ristretto/main/benchmarks/Throughput%20-%20Mixed.svg"
  alt="显示混合工作负载吞吐量比较的图表">
</p>

### 读取工作负载的吞吐量

<p align="center">
  <img src="https://raw.githubusercontent.com/hypermodeinc/ristretto/main/benchmarks/Throughput%20-%20Read%20(Zipfian).svg"
  alt="显示读取工作负载吞吐量比较的图表">
</p>

### 写入工作负载的吞吐量

<p align="center">
  <img src="https://raw.githubusercontent.com/hypermodeinc/ristretto/main/benchmarks/Throughput%20-%20Write%20(Zipfian).svg"
  alt="显示写入工作负载吞吐量比较的图表">
</p>

## 使用 Ristretto 的项目

以下是已知使用 Ristretto 的项目列表：

- [Badger](https://github.com/hypermodeinc/badger) - Go 中的可嵌入键值数据库
- [Dgraph](https://github.com/hypermodeinc/dgraph) - 具有图形后端的水平可扩展和分布式 GraphQL 数据库

## 常见问题解答

### 您是如何实现这种性能的？您走了哪些捷径？

我们在 [Ristretto 博客文章](https://hypermode.com/blog/introducing-ristretto-high-perf-go-cache/)中详细介绍了这一点，但简而言之：我们的吞吐量性能可归因于批处理和最终一致性的结合。我们的命中率性能主要归功于出色的[准入策略](https://arxiv.org/abs/1512.00727)和 SampledLFU 驱逐策略。

至于“捷径”，Ristretto 唯一可以被解释为捷径的做法是丢弃一些 Set 调用。这意味着对新项目（保证更新）的 Set 调用不保证会进入缓存。新项目可能会在两个点被丢弃：通过 Set 缓冲区时或通过准入策略时。但是，这并不会对命中率产生太大影响，因为我们希望最受欢迎的项目会被多次设置并最终进入缓存。

### Ristretto 是分布式的吗？

不，它就像任何其他 Go 库一样，您可以将其导入到您的项目中并在单个进程中使用。
