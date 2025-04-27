# Claw部署简易图床easyimage详细图文教程

关键词: 云服务商,免费额度,Serverless platforms,网站托管,支持部署:Alist,dify,chatgpt-next-web,FastGPT,LibreChat,LobeChat,ChatNio等众多热门应用

Claw是近年才出线的云服务商，提供的服务线路基本上与阿里云相同，但性价比更高，可以看作是阿里云还没承认的私生仔，有点类似于小米旗下的红米子品牌，换个牌子可以放下身段、法务、规则等等限制，扯远了，今天主要介绍一下如何撸刚出的免费容器，最高可用配置可达4H8G

## 前言

前天《[申请Claw永久免费容器并部署Alist网盘](https://nav.programnotes.cn/page/claw)》，得到大家喜爱并给我带来了15个月的Hobby会员，能体会无限流量和磁盘了，就考虑部署一个图床应用，如果本文对您有帮助，想要注册的体验，可以走我邀请[注册链接](https://console.run.claw.cloud/signin?link=AXZL401YXZUJ)。

## 部署过程

### 第一步，找镜像

先找到合适的镜像，在hub.docker.com上搜索easyimage

![Image 3: image-20250418122507457](https://nav.programnotes.cn/images/md/image-20250418122507457.png)

确定镜像名,第一个ddsderek有100K+使用量，就它了

### 第二步，新建容器

"App Launchpad"——“ Create App“

![Image 4: image-20250418122834154](https://nav.programnotes.cn/images/md/image-20250418122834154.png)

应用名随意，镜像名输入`ddsderek/easyimage`

![Image 5: image-20250418122938435](https://nav.programnotes.cn/images/md/image-20250418122938435.png)

配置我选512M的，一天只比原来增加0.01美元，反正够用

### 第三步，绑定域名

打开“Details”详情页面里的Manage Network——Custom Domain

![Image 6: image-20250418123323710](https://nav.programnotes.cn/images/md/image-20250418123323710.png)

这里我绑定cloudflare域名示例

以下步骤要到域名管理平台操作

![Image 7: image-20250418124539368](https://nav.programnotes.cn/images/md/image-20250418124539368.png)

新建cname子域名t,填写Claw平台提供的地址到Target那里，关了小云朵，保存，再回到claw那里"Confirm"，就完成自定义域名绑定了

### 第四步，设置目录

这一步是为了把配置和图片目录映射出来，防止更新镜像数据丢失，方便管理。

![Image 8: image-20250418123755167](https://nav.programnotes.cn/images/md/image-20250418123755167.png)

按图示在“Advanced Configuration” ——“+Add” 添加两个目录。

1.  `/app/web/config`配置目录
2.  `/app/web/i`图片目录

最后，在Claw的"Details"详情页面的右上角点“Deploy Application” 开始部署

# 安装easyimage

![Image 9: image-20250418125106725](https://nav.programnotes.cn/images/md/image-20250418125106725.png)

在浏览器上输入自定义的域名，然后就可以按图床向导安装了

![Image 10: image-20250418125411994](https://nav.programnotes.cn/images/md/image-20250418125411994.png)

EasyImage 默认使用的还是http，需要改成https

## 检测

首次登录会弹出一个检测报告

![Image 11: image-20250418130517136](https://nav.programnotes.cn/images/md/image-20250418130517136.png)

可以看出Claw容器完全满足Easyimage需求

![Image 12: image-20250418130026646](https://nav.programnotes.cn/images/md/image-20250418130026646.png)

可以正常上传，也能正常访问

![Image 13: image-20250418130916880](https://nav.programnotes.cn/images/md/image-20250418130916880.png)

可以看到图片已保存到上面新建的目录里了。

至此，Easyimage完成部署

## 总结

部署主要是找到可用于Claw容器的镜像，并把配置和图片目录映射出来，自定义域名需要在创建镜像时就绑定，后面再更改的话有Bug,可以参考我[alist那篇文章](https://nav.programnotes.cn/page/claw)解决。