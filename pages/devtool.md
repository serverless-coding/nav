# 开发工具

## Docker

### 1ms.run/毫秒镜像

```bash
# 镜像地址
# https://docker.1ms.run
```

临时使用:

```bash
docker pull docker.1ms.run/nginx:latest
```

[帮助文档: https://www.mliev.com/docs/1ms.run](https://www.mliev.com/docs/1ms.run)

| 源站              | 替换为          | 免费通道 | 付费通道 | 备注     |
| ----------------- | --------------- | -------- | -------- | -------- |
| docker.io         | docker.1ms.run  | ✅        | ✅        |          |
| gcr.io            | gcr.1ms.run     | 限免     | ✅        |          |
| ghcr.io           | ghcr.1ms.run    | 限免     | ✅        |          |
| registry.k8s.io   | k8s.1ms.run     | 限免     | ✅        |          |
| nvcr.io           | nvcr.1ms.run    | ❌        | 适配中   | 计划支持 |
| quay.io           | quay.1ms.run    | ❌        | 适配中   | 计划支持 |
| docker.elastic.co | elastic.1ms.run | ❌        | 适配中   | 计划支持 |

*   [简介](https://www.mliev.com/docs/1ms.run/overview "简介")
*   [Docker登录毫秒镜像](https://www.mliev.com/docs/1ms.run/docker-login)

### 其他

[国内加速镜像列表](https://free-gpt.github.io/DockerHub/)

## Anaconda

## Python

### pip 镜像

[阿里云PyPI镜像](https://developer.aliyun.com/mirror/pypi?spm=a2c6h.13651102.0.0.6d071b11EMSPAu)

PyPI(Python Package Index)是Python编程语言的软件存储库。开发者可以通过PyPI查找和安装由Python社区开发和共享的软件，也可以将自己开发的库上传至PyPI。

下载地址：https://mirrors.aliyun.com/pypi/

配置:

```bash
# 找到文件 ~/.pip/pip.conf ,添加
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host=mirrors.aliyun.com

```

### uv

## Go

### 镜像

- goproxy:  https://goproxy.cn/

  ```bash
  # linux 使用
  go env -w GO111MODULE=on
  go env -w GOPROXY=https://goproxy.cn,direct

  # macos
  export GO111MODULE=on
  export GOPROXY=https://goproxy.cn
  ```
  部署 Go Module Proxy
  ```go
  // 创建main.go ,运行 go run main.go,将 GOPROXY 设置为 http://localhost:8080 或自定义域名
  package main

  import (
  	"net/http"
  	"os"

  	"github.com/goproxy/goproxy"
  )

  func main() {
  	http.ListenAndServe("localhost:8080", &goproxy.Goproxy{
  		GoBinEnv: append(
  			os.Environ(),
  			"GOPROXY=https://goproxy.cn,direct", // Use Goproxy.cn as the upstream proxy
  			"GOPRIVATE=git.example.com",         // Solve the problem of pulling private modules
  		),
  		ProxiedSUMDBs: []string{
  			"sum.golang.org https://goproxy.cn/sumdb/sum.golang.org", // Proxy the default  checksum database
  		},
  	})
  }
  ```

- https://goproxy.io/

## npm/pnpm

阿里镜像:

http://npmmirror.com

http://registry.npmmirror.com
