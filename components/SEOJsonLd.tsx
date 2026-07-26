export default function SEOJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI导航,ProgramNotes程序导航",
    url: "https://nav.programnotes.cn",
    description: "AI工具、开发工具、程序员资源导航",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}
