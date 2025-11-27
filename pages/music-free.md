# MusicFree

**持安卓、PC的音乐播放器，开源、免费、无广告、可定制化的全网听歌神器**

代码开源,github上已收到21.6K star

MusicFree是由大佬猫头猫开发的一款免费、开源的本地音乐播放器，同时支持Android、Windows、MacOS、Linux这几个客户端，很强大！MusicFree安装后就是一个纯粹的本地音乐播放器，但可以通过配置「插件」地址实现定制化的个人音乐软件，无论是榜单、试听、下载都完全不在话下，同时还支持QQ音乐、网易云音乐、酷我音乐等歌单导入功能。

MusicFree属于空壳类的软件，通过配置源地址实现观影和听歌自由！

另外，iOS的小程序下架了，所以暂时无法使用。

## UI

![free-1](https://nav.programnotes.cn/images/music/free-1.png)

## 下载

- [飞书](https://r0rvr854dd1.feishu.cn/drive/folder/IrVEfD67KlWZGkdqwjecLHFNnBb)
- [github](https://github.com/maotoumao/MusicFree/releases)

## 开源代码

- [github](https://github.com/maotoumao/MusicFree)

## MusicFree插件地址/音源配置接口
综合接口（包括多个插件地址）
https://fastly.jsdelivr.net/gh/Huibq/keep-alive/Music_Free/myPlugins.json

综合接口二
https://gitee.com/maotoumao/MusicFreePlugins/raw/master/plugins.json

综合接口三
https://musicfreepluginshub.2020818.xyz/plugins.json

综合接口四
https://gitlab.com/acoolbook/musicfree/-/raw/main/music.json


## 官方简介

一个插件化、定制化、无广告的免费音乐播放器，目前只支持 Android 和 Harmony OS。

桌面版来啦：https://github.com/maotoumao/MusicFreeDesktop

如果需要了解后续进展可以关注公众号↓；如果有问题可以在 issue 区或者公众号直接留言反馈。

### 项目使用约定：
本项目基于 AGPL 3.0 协议开源，使用此项目时请遵守开源协议。
除此外，希望你在使用代码时已经了解以下额外说明：

打包、二次分发 请保留代码出处：https://github.com/maotoumao/MusicFree
请不要用于商业用途，合法合规使用代码；
如果开源协议变更，将在此 Github 仓库更新，不另行通知。

### 特性
插件化：本软件仅仅是一个播放器，本身并不集成任何平台的任何音源，所有的搜索、播放、歌单导入等功能全部基于插件。这也就意味着，只要可以在互联网上搜索到的音源，只要有对应的插件，你都可以使用本软件进行搜索、播放等功能。关于插件的详细说明请看插件一节。

插件支持的功能：搜索（音乐、专辑、作者）、播放、查看专辑、查看作者详细信息、导入单曲、导入歌单、获取歌词等。

定制化、无广告：本软件提供了浅色、深色模式；支持自定义背景；本软件基于 AGPL 协议开源，一个 star 做交易 将会保持免费。

隐私：所有的数据都存储在本地，本软件不会收集你的任何个人信息。

歌词关联：你可以把两首歌的歌词关联起来，比如将歌曲 A 的歌词关联到歌曲 B，关联后 A、B 两首歌都将显示歌曲 B 的歌词。你也可以关联多首歌的歌词，如 A->B->C，这样 A、B、C 三首歌都将显示 C 的歌词。

## 插件简介
插件本质上是一个满足插件协议的 commonjs 模块。插件中定义了搜索（音乐、专辑、作者）、播放、查看专辑、作者详细信息、导入歌单、获取歌词等基本函数，插件的开发者只需要关心输入输出逻辑，至于分页、缓存等全都交给 MusicFree 控制即可。本软件通过插件来完成播放器的所有功能，这样解耦的设计也可以使得本软件可以专注于做一个功能完善的播放器，我直呼小而美。

插件开发文档可以参考 这里: https://musicfree.catcat.work/plugin/introduction.html

需要注意的是：

如果你是使用第三方下载的插件，那么请自行鉴别插件的安全性（基本上看下没有奇怪的网络请求什么的就好了；自己写的最安全，不要安装来路不明的东西），防止恶意代码破坏。因为第三方恶意插件导致的可能的损失与本软件无关。

插件使用过程中可能会产生某些和本软件无关的版权数据，插件、以及插件产生的任何数据与本软件无关，请使用者自行斟酌，及时删除数据，本软件不提倡也不会提供任何破解行为，你可以搭建自己的离线音乐仓库使用。
