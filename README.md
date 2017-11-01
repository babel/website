# babel 中文文档
[![Travis CI](https://api.travis-ci.org/docschina/babeljs.io.svg?branch=cn)](https://travis-ci.org/docschina/babeljs.io/)
### 中文站点
中文站点是由 CI 自动构建并部署到 gh-pages 分支。
### 参与翻译
* babel 翻译任务认领说明 - 入口目录
* babel 校对 + 审校任务认领说明 - 入口目录

### 翻译流程 - Forking工作流
1. fork 本仓库到自己的账号下，克隆 fork 的仓库到本地
2. 从 [Issues](https://github.com/docschina/babeljs.io/issues) 中所有由 [`待翻译`](https://github.com/docschina/babeljs.io/labels/%E5%BE%85%E7%BF%BB%E8%AF%91) 标记的文章中，选择一篇自己感兴趣的进行翻译，并在评论中留下**你翻译预计完成的时间**
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

### 配置
* 安装 `ruby`，请参考 [ruby 官网](https://www.ruby-lang.org/en/documentation/installation/)。
	* 	使用 `which ruby` 或者 `ruby --version` 来确认是否安装过 `ruby`
	*  确保 `bundler` 已经安装，执行 `gem install bundler`

* 克隆当前仓库，并安装相关依赖

	```
	git clone git@github.com:docschina/babeljs.io.git
	cd babeljs.io
	make bootstrap
	```
* 最后，执行 `npm start` 即可	
