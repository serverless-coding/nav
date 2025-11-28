# TrendRadar

[项目地址](https://github.com/sansan0/TrendRadar)

## 📁 项目名称：TrendRadar

### 🚀 一句话总结
一个可聚合全网热点、按关键词精准筛选，并实时推送到多渠道的个性化资讯监控助手。

### 📝 项目简介 (What)
TrendRadar 是一个轻量级、易于部署的热点资讯聚合工具。它能监控知乎、微博、抖音等超过11个主流平台的热榜，根据用户自定义的关键词（支持必须、排除、分组等高级语法）进行精准筛选，并将结果通过企业微信、飞书、钉钉、Telegram、邮件等多种渠道实时推送。项目还提供个性化热点排序算法和基于AI的深度数据分析功能，帮助用户从海量信息中高效获取自己真正关心的内容。

### 🎯 解决的痛点 (Pain Points)
- **信息过载与无效刷屏**: 每天被动接收大量无关新闻，难以找到重点，浪费大量时间。
- **跨平台信息获取低效**: 需要在多个APP之间频繁切换，手动查找关心的热点，费时费力。
- **关键信息遗漏风险**: 投资者、媒体人等职业需要及时捕捉特定领域动态，人工监控容易错失良机。
- **被动接受算法推荐**: 无法掌控自己的信息流，被平台算法主导，想看的内容可能看不到。

### 💎 核心优势与特性 (Why)
- **零门槛部署**: 支持通过 GitHub 一键 Fork 部署，无需服务器或编程知识，对新手极其友好。
- **强大的推送系统**: 支持企业微信、个人微信、飞书、钉钉、Telegram、邮件、Bark、Slack 等9种主流渠道，确保消息及时送达。
- **高度可定制的筛选**: 提供普通词、必须词(+), 过滤词(!), 数量限制(@) 等多种关键词语法，并支持词组化管理，实现精准内容过滤。
- **智能推送策略**: 内置“当日汇总”、“当前榜单”、“增量监控”三种模式，满足从每日报告到实时监控的不同需求，有效避免信息重复打扰。
- **AI 智能分析**: 基于MCP协议，可通过自然语言对话的方式，对已抓取的新闻数据进行趋势分析、情感洞察等深度挖掘。
- **个性化热点算法**: 用户可自定义排名、出现频次等权重，打造属于自己的热搜榜，摆脱平台算法束缚。
- **多端适配**: 支持生成 GitHub Pages 网页报告，并对移动端友好适配。

### 🛠 如何使用 (How)
项目提供了多种部署方式，其中 Docker 部署方式简洁高效，适合在本地或服务器上运行。

```bash
# 1. 创建配置目录并下载配置文件
mkdir -p config output
wget https://raw.githubusercontent.com/sansan0/TrendRadar/master/config/config.yaml -P config/
wget https://raw.githubusercontent.com/sansan0/TrendRadar/master/config/frequency_words.txt -P config/

# 2. 运行 Docker 容器 (以企业微信为例)
docker run -d --name trend-radar \
  -v ./config:/app/config:ro \
  -v ./output:/app/output \
  -e WEWORK_WEBHOOK_URL="你的企业微信webhook地址" \
  -e CRON_SCHEDULE="*/30 * * * *" \
  wantcat/trendradar:latest
```