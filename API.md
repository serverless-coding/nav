# API

## FaviconV2

获取网站logo

https://t2.gstatic.com/faviconV2

使用方式:

https://nav.programnotes.cn/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=48&url=https://yige.baidu.com

## translate

deepl 翻译

/translate

使用方式:

```bash
curl --location 'https://nav.programnotes.cn/translate' \
--header 'Content-Type: application/json' \
--data '{
    "text": "免费，无限量翻译 API",
    "source_lang": "zh",
    "target_lang": "en"
}'
```

### 原理

- [Cloudflare,workers](https://github.com/yiGmMk/deeplx-for-cloudflare)
- [vercel,functions](https://github.com/yiGmMk/deepl-proxy)