# AI-Web-By-Vue
A website created by vue3. And it can talk to a model with an API

# 起因
先前用cursor帮自己写了一个可以调用API来进行模型访问的功能，但是cursor写的是单个的html网页，仅千余行性能就急速下滑。观察它的代码后发现不算很复杂，所以萌生了用vue3进行重写的想法，当作一个小小的练手，熟悉一下vue3框架，不足之处较多，如若你下载了，望担待。

# 相关技术
vue3 + typescript + vite + highlight(第三方库) + marked(第三方库) + element-plus + router

<pre><code>npm i</code></pre>
<pre><code>npm install highlight.js</code></pre>
<pre><code>npm install marked</code></pre>
<pre><code>npm install vue-router@4</code></pre>
<pre><code>npm install element-plus --save</code></pre>

# 已实现功能
1. 可以通过API对模型进行调用，需要填写的内容为：API端口、API密钥、模型名称。其中模型的调用以阿里云的千问系列作为参考，大多数都是一样的模式（grok也可以调用），可进行多轮对话
2. 可以导出对话内容，导出为html文件
3. 可以从本地打开导出的文件进行显示，并且进行缓存
4. 单独的页面可以进行API的配置
5. 有内置的说明文档

# 不足
1. 有一些bug，比如新建对话有时候会使页面直接卡死，原因未知😫，所以没改
2. 对于模型返回的内容，如果含有代码，无法直接单独的复制代码
3. 界面设计上，颜色搭配不是很好（人话：不高级）
4. 一些数据在加载的时候，没有加载动画，会出现一定的不佳体验
5. 。。。。。。

# 最后
1. 这个小项目用时约三天，其中我还要上课写作业
2. 感谢ChatGPT,Claude 的协助，虽然在整体框架编码有点呆，但是还是很有用的。
3. 由于技术不足，之后或许会来改代码

---2024年11月16日
<hr>
修复了一些bug
---2024年11月17日9：51（爬起来就改。。。）
