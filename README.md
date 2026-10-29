# AI 工具箱

面向开发者与创作者的 AI 产品和互联网资源导航站，使用 Next.js App Router、React、TypeScript、Tailwind CSS 和 Radix UI。资源保存在 `data/links.json`，介绍文章保存在 `pages/*.md`，不依赖数据库或登录服务。

## 本地运行

项目使用 `.tool-versions` 中的 Node.js 基线及 `package.json` 声明的 pnpm 8.15.9。

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

访问 `http://localhost:3000`。正常浏览导航不需要复制历史 `.env.example`、初始化 Prisma 或配置模型 Key。旧环境示例中的数据库及 OAuth 字段不是当前启动要求。

如果本机旧版 Corepack 签名信息过期，应更新 Corepack 或使用明确版本的 pnpm，不要关闭签名验证。

## 当前聊天状态

AI 聊天暂时暂停：主导航不再显示入口，`/ai` 为不索引的暂停说明页，`POST /api/chat` 返回 HTTP 503，且不会解析请求或调用模型。聊天源码保留用于以后恢复；恢复前需要另行设计限流和额度保护。

## 搜索和静态首页

默认首页预渲染完整分类和资源链接。`q` 与 `subject` 查询参数可组合、分享，并支持浏览器前进/后退；带参数直达时，在客户端接管后筛选，因此初始 HTML 仍为完整列表。禁用 JavaScript 时仍可浏览资源，但不能执行站内筛选。

## 维护资源

- 分类及资源的 `id` 是持久标识，修改名称、描述或排序时不要重新生成已有 ID。
- 同一 URL 可以出现在不同分类；同分类不应重复。新增资源需填写标题、HTTP(S) 或站内 URL，并尽量补充可靠描述。
- `page` 指向 `pages` 下的 Markdown 文件，如 `trae.md`；资源和文章引用、本地图片会由数据检查验证。
- 缺少描述时检查会明确告警，不自动编造产品信息。
- Markdown 作为仓库维护者提供的可信内容渲染，不接受未经审查的用户 HTML 投稿。

## 验证

```sh
pnpm check:data
pnpm test
pnpm exec tsc --noEmit --incremental false
pnpm exec next lint --no-cache
pnpm build
pnpm test:production
```

`test:production` 在本地临时启动生产服务器，检查原始首页 HTML、文章 SEO/404、暂停聊天接口和 sitemap/robots 后停止服务。也可以使用 `pnpm start` 手动检查。生产构建会下载 Google Fonts，需要可访问字体服务的网络。

CI 按上述流程执行；测试不调用模型或主动提交 IndexNow。Node/Next 大版本升级尚未包含在本轮功能修复中，应单独评估支持状态和兼容性。

## Sitemap 和部署

如果已运行开发服务器，可使用 `NEXT_DIST_DIR=.next-production pnpm build` 和 `NEXT_DIST_DIR=.next-production pnpm test:production` 隔离生产产物，避免开发编译覆盖生产 manifest。

`next-sitemap` 在构建后生成 `/sitemap.xml` 和 `/sitemap-0.xml`。旧 `/server-sitemap.xml` 使用相同公开页面清单，兼容已有爬虫引用；清单包含导航实际关联的文章，而不是把磁盘上的每个 Markdown 文件自动推广到 sitemap。

没有可信内容更新时间时不输出 `lastmod`，不把构建时间当成文章更新时间。部署前确认 `config/site.ts` 的站点地址，以及 `vercel.json` 的图标代理是否适合目标环境。

## 来源

项目最初参考 [Taxonomy](https://github.com/shadcn/taxonomy)。历史模板中的数据库和鉴权方案已不代表当前实现。
