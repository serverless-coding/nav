// 基于 jsdom 的 HTML 白名单清洗（服务端使用，无新增依赖）
// 用于 markdown 渲染结果，防止 <script>、事件属性、javascript: 链接等 XSS

const ALLOWED_TAGS = new Set([
  "a", "abbr", "b", "blockquote", "br", "code", "del", "details", "div", "em",
  "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "li",
  "mark", "ol", "p", "pre", "s", "span", "strong", "sub", "summary", "sup",
  "table", "tbody", "td", "tfoot", "th", "thead", "tr", "u", "ul", "figure", "figcaption",
])

const ALLOWED_ATTRS = new Set([
  "href", "src", "alt", "title", "id", "class", "width", "height",
  "colspan", "rowspan", "align", "target", "rel", "loading", "datetime",
])

const URL_ATTRS = new Set(["href", "src"])
const SAFE_URL = /^(https?:|mailto:|tel:|\/|#|\.\/|\.\.\/)/i

export function sanitizeDocument(doc: Document): void {
  const all = Array.from(doc.body.querySelectorAll("*"))
  for (const el of all) {
    const tag = el.tagName.toLowerCase()
    if (!ALLOWED_TAGS.has(tag)) {
      // 危险标签整体移除；其他未知标签保留文本内容
      if (["script", "style", "iframe", "object", "embed", "form", "input", "button", "link", "meta", "base", "svg", "math"].includes(tag)) {
        el.remove()
      } else {
        el.replaceWith(...Array.from(el.childNodes))
      }
      continue
    }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase()
      if (!ALLOWED_ATTRS.has(name) || name.startsWith("on")) {
        el.removeAttribute(attr.name)
        continue
      }
      if (URL_ATTRS.has(name)) {
        const v = attr.value.trim().replace(/[\u0000-\u001f\s]+/g, "")
        if (v && !SAFE_URL.test(v)) el.removeAttribute(attr.name)
      }
    }
    // 外链统一安全属性
    if (tag === "a") {
      const href = el.getAttribute("href") || ""
      if (/^https?:/i.test(href) && !href.includes("programnotes.cn")) {
        el.setAttribute("target", "_blank")
        el.setAttribute("rel", "noopener noreferrer nofollow")
      }
    }
    if (tag === "img" && !el.getAttribute("loading")) {
      el.setAttribute("loading", "lazy")
    }
  }
}

export function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
