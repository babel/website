# babel 中文文档
[![Travis CI](https://api.travis-ci.org/docschina/babeljs.io.svg?branch=cn)](https://travis-ci.org/docschina/babeljs.io/)
### 中文站点
中文站点是由 CI 自动构建并部署到 gh-pages 分支。
### 参与翻译
* [关于翻译/校对 - 任务认领](https://github.com/docschina/babeljs.io/issues/1)

### 关于需要翻译文件的目录结构

以下是翻译人员需要了解的目录结构

```
.
├── _data/                        // _data      目录: 放置所有静态 yml 文件
├── _posts/                       // _posts     目录: 放置所有博客 md 文件
├── _includes/                    // _includes  目录: 需要导入文件目录
│   ├── readmes/                  // readmes    目录: 放置所有 工具/Plugins 的 README.md 文件 
│   └── tools/                    // tools      目录: 所有工具的安装及使用说明
├── docs/ 					    
│   ├── usage/                    // usage      目录: 使用指南
│   ├── core-packages/            // core-packages 目录: 核心包文档
│   └── plugins/                  // plugins    目录: 所有插件说明
├── ...                       
│   └── ...
```

### 翻译流程 - Forking工作流
1. fork 本仓库到自己的账号下，克隆 fork 的仓库到本地
2. 从 [Projects](https://github.com/docschina/babeljs.io/projects/1) 中所有由 [`待翻译`](https://github.com/docschina/babeljs.io/projects/1?card_filter_query=label%3A%E5%BE%85%E7%BF%BB%E8%AF%91) 标记的文章中，选择一篇自己感兴趣的进行翻译，并在评论中留下**你翻译预计完成的时间**
3. 翻译完毕，提交到 fork 的仓库中。<br>
	**注意: 提交前需要与上游代码进行合并。**<br>
	合并步骤如下:
	* 添加上游 git 地址: `git remote add upstream https://github.com/docschina/babeljs.io`
	* 更新上游仓库: `git remote update upstream`
	* merge 到自己本地仓库: `git merge upstream/cn`
	* 确认无问题后，提交到 fork 仓库: `git push`
4. 提交 `pull request` 到本仓库<br>
**注意: 以上所有操作都在 `cn` 分支下完成。**
![](http://oypz34fc0.bkt.clouddn.com/image/png/babel%E7%BF%BB%E8%AF%91%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

### 配置本地运行
1. 克隆仓库

	```
	git clone git@github.com:{Your Github Name}/babeljs.io.git
	cd babeljs.io
	```
2. 使用 gem 安装 bundler 
	
	```
	sudo gem install bundler
	```

3. 安装相关依赖

	```
	make bootstrap
	```
4. 最后，执行 `npm start` 即可，项目会运行在 `http://loaclhost:4000` 上。	
