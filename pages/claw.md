# Claw免费云服务

关键词: 云服务商,免费额度,Serverless platforms,网站托管,支持部署:Alist,dify,chatgpt-next-web,FastGPT,LibreChat,LobeChat,ChatNio等众多热门应用

Claw是近年才出线的云服务商，提供的服务线路基本上与阿里云相同，但性价比更高，可以看作是阿里云还没承认的私生仔，有点类似于小米旗下的红米子品牌，换个牌子可以放下身段、法务、规则等等限制，扯远了，今天主要介绍一下如何撸刚出的免费容器，最高可用配置可达4H8G

以下是部署案例

## 申请Claw永久免费容器并部署Alist网盘

### 申请

目前推出新用户首月免费5美元的额度，如果你是Github，且注册时间大于180天，那么每个月都能得到5美元的额度，如果在不超额情况下，可以实现永久免费使用

![Image 3: image-20250416165023528](https://nav.programnotes.cn/images/claw/image-20250416165023528.png)

打开首页，[https://run.claw.cloud](https://console.run.claw.cloud/signin?link=AXZL401YXZUJ)

使用GitHub方式登录

![Image 4: image-20250416165241710](https://nav.programnotes.cn/images/claw/image-20250416165241710.png)

授权登录

![Image 5: image-20250416165324885](https://nav.programnotes.cn/images/claw/image-20250416165324885.png)

选择地区，并创建容器空间名，点“Start Deploying” 开始部署

### 安装alist

登录到后台的控制面板后

![Image 6: image-20250416165706989](https://nav.programnotes.cn/images/claw/image-20250416165706989.png)

直接点App Store

![Image 7: image-20250416165731598](https://nav.programnotes.cn/images/claw/image-20250416165731598.png)

很显眼的位置就看到了Alist应用

![Image 8: image-20250416165829874](https://nav.programnotes.cn/images/claw/image-20250416165829874.png)

选择用户名，设置密码，留意到上面的价钱，0.04美元/天，一个月按足31天计，也只要 1.24美元，5美元赠金完全够扣的

点旁边的“Deploy App”

![Image 9: image-20250416170205320](https://nav.programnotes.cn/images/claw/image-20250416170205320.png)

就这样完成了Alist\_App的部署

点“Details”

![Image 10: image-20250416172000209](https://nav.programnotes.cn/images/claw/image-20250416172000209.png)

1.  管理网络，自定义域名就是在这里设置，后面会讲到
2.  公网地址，可以直接访问，自定义域名时Cname的地址
3.  SSH命令管理

### 设置密码

当我访问地址，打算输入上面设置的用户名和密码时，提示我“Password is incorrect” 密码不正确

![Image 11: image-20250416170858001](https://nav.programnotes.cn/images/claw/image-20250416170858001.png)

这就有点尴尬了，我肯定没输入错误的，且我还截图了，再一一对比了，这时候可以删除重装，也可以通过SSH命令修改密码

![Image 12: image-20250416171628455](https://nav.programnotes.cn/images/claw/image-20250416171628455.png)

打开“Details”详情页面拉到最下，上上中的标记3处，打开SSH命令管理，输入：`./alist admin set yourpassword`

这一点设置密码

### 绑定域名

打开“Details”详情页面里的Manage Network——Custom Domain

![Image 13: image-20250416172639011](https://nav.programnotes.cn/images/claw/image-20250416172639011.png)

这里我绑定cloudflare域名示例

以下步骤要到域名管理平台操作

![Image 14: image-20250416173350668](https://nav.programnotes.cn/images/claw/image-20250416173350668.png)

新建cname子域名alist,填写Claw平台提示的地址到Target那里，关了小云朵，保存，再回到claw那里"Confirm"，就完成自定义域名绑定了

最后，在Claw的"Details"详情页面的右上角点“Update”完成更新设置

### 自定义域名失败

有个Bug,如果不是创建容器的时候就直接自定义域名，很大机会更新后，cname会变，造成解析失败

![Image 15: image-20250416210155378](https://nav.programnotes.cn/images/claw/image-20250416210155378.png)

可以通过“Add Port”的方式重新添加一个，并直接自定义域名，接着删除以前的，最后update，就能解决自主义域名更新会变的问题。

### 总结

如果你有180天以上的github账号，每个月有5美元的赠金，好好利用，部署点轻量的应用，永久免费还是不错的，而且不需要绑定信用卡，也不用担心乱扣费问题。

### 参考

- [Claw部署简易图床easyimage详细图文教程](https://mailberry.com.cn/2025/04/claw-deploy-easyimage/)
- [Alist开启搜索功能](https://mailberry.com.cn/2025/03/alist-search/)
- [解决Alist上传文件时，提示Request failed with status code 413的问题](https://mailberry.com.cn/2023/02/alist-request-failed-with-status-code-413/)
- [Alist首页和管理页都是空白的解决过程](https://mailberry.com.cn/2022/08/alist-403-blank-issuse/)
