# 🧰 IP 工具箱

<div align="center">

![IPCheck.ing Banner](https://raw.githubusercontent.com/jason5ng32/MyIP/main/public/github/gh_banner.png)

<a href="https://trendshift.io/repositories/5332" target="_blank"><img src="https://trendshift.io/api/badge/repositories/5332" alt="jason5ng32%2FMyIP | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

[![Mentioned in Awesome Self Hosted](https://awesome.re/mentioned-badge.svg)](https://github.com/awesome-selfhosted/awesome-selfhosted)

![GitHub Repo stars](https://img.shields.io/github/stars/jason5ng32/MyIP)
![GitHub forks](https://img.shields.io/github/forks/jason5ng32/myip)
![Docker Pulls](https://img.shields.io/docker/pulls/jason5ng32/myip)

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fipcheck.ing&up_message=online&label=IPCheck.ing 'IPCheck.ing')](https://ipcheck.ing)
![PWA](https://img.shields.io/badge/PWA-Supported-blue)

![CodeQL](https://github.com/jason5ng32/MyIP/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main)
![Docker Build and Push](https://github.com/jason5ng32/MyIP/actions/workflows/docker-image.yml/badge.svg?branch=main)

👉 在这里体验：[https://ipcheck.ing](https://ipcheck.ing)

你可以直接用我已经搭建好的服务，也可以自行搭建。

</div>

## 👀 主要功能

* 🛜 **看自己的 IP**：从多个 IPv4 和 IPv6 来源检测显示本机的 IP
* 🔍 **查任意 IP 信息**：可以通过小工具查询任意 IP 的信息
* 🕵️ **看 IP 信息**：显示所有 IP 的相关信息，包括国家、地区、ASN、地理位置等
* 🚦 **可用性检测**：检测一些网站的可用性：Google, Github, Youtube, 网易, 百度等
* 🚥 **WebRTC 检测**：查看使用 WebRTC 连接时使用的 IP
* 🛑 **DNS 泄露检测**：查看 DNS 出口信息，以便查看在 VPN/代理的情况下，是否存在 DNS 泄露隐私的风险
* 🚀 **网速测试**：利用边缘网络进行网速测试
* 🚏 **代理规则测试**：配合代理软件的规则设置，测试规则设置是否正常
* ⏱️ **全球延迟测试**：从分布在全球的多个服务器进行延迟测试，了解你与全球网络的连接速度
* 📡 **MTR 测试**：从分布在全球的多个服务器进行 MTR 测试，了解你与全球的连接路径
* 🔦 **DNS 解析器**：从多个渠道对域名进行 DNS 解析，获取实时的解析结果，可用于污染判断
* 🚧 **封锁测试**：检查特定的网站在部分国家是否被封锁
* 📓 **Whois 查询**：对域名或 IP 进行 whois 信息查询
* 📀 **MAC 地址查询**：查询物理地址的归属信息
* 🖥️ **浏览器指纹**：多种方式查看浏览器指纹
* 📋 **网络安全检查清单**：一共有 258 项的，全面的网络安全检查清单

## 💪 同时还支持

* 🌗 **暗黑模式**：根据系统设置自动切换暗黑/白天模式，也可以手动切换
* 📱 **简约模式**：为移动版提供的专门模式，缩短页面长度，快速查看最重要的信息
* 📲 **支持 PWA**：可以添加为手机应用以及电脑里的桌面应用，方便使用
* ⌨️ **支持快捷键**：可以随时输入 `?` 查看快捷键菜单
* 🌍 根据可用性检测结果，返回目前是否可以访问全世界网络的提示
* 🇺🇸 🇨🇳 🇫🇷 支持中文、英文、法文

## 👩🏻‍💻 高级用法

如果你在通过代理上网，可以考虑在你的代理配置里，增加下面的规则（请根据你使用的客户端进行修改），这样就可以实现同时查询真实 IP 和代理后的 IP：

```ini
# IP Testing
IP-CIDR,1.0.0.2/32,Proxy,no-resolve
IP-CIDR6,2606:4700:4700::1111/128,Proxy,no-resolve
DOMAIN,4.ipcheck.ing,DIRECT
DOMAIN,6.ipcheck.ing,DIRECT
# Rule Testing
DOMAIN,ptest-1.ipcheck.ing,Proxy1
DOMAIN,ptest-2.ipcheck.ing,Proxy2
DOMAIN,ptest-3.ipcheck.ing,Proxy3
DOMAIN,ptest-4.ipcheck.ing,Proxy4
DOMAIN,ptest-5.ipcheck.ing,Proxy5
DOMAIN,ptest-6.ipcheck.ing,Proxy6
DOMAIN,ptest-7.ipcheck.ing,Proxy7
DOMAIN,ptest-8.ipcheck.ing,Proxy8
```

## 😶‍🌫️ 额外说明

在 V2.0 发布的时候，我曾经说：这个程序的 70% 的代码不是我写的，是通过 ChatGPT 写的。大概来回 90 个回合，外加一些细微的手动修改，完成了全部代码。

当然，程序的架构和 UI 还是需要自己进行设计。

随着 V3.0 及后续的代码发布，ChatGPT 帮助我写代码的比例逐渐下降，估计现在在 40% - 50% 之间。相反，在这个过程中，我从完全不会 JavaScript 和 Vue ，与 AI 结对编程后，我现在已经能看懂大部分的 JS 代码了，并且也已经能手撸一些。

感谢 AI ，给了我这样一个失业产品经理快速学习编程的机会。