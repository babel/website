# babel 中文文档
[![Travis CI](https://api.travis-ci.org/docschina/babeljs.io.svg?branch=cn)](https://travis-ci.org/docschina/babeljs.io/)
### 中文站点
中文站点是由 CI 自动构建并部署到 gh-pages 分支。
### 参与翻译
* babel 翻译任务认领说明 - 入口目录
* babel 校对 + 审校任务认领说明 - 入口目录

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
