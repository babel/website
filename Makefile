LESS_COMMAND = node_modules/less/bin/lessc
UGLIFY_CMD = node_modules/uglify-js/bin/uglifyjs

.PHONY: build

build:
	# pages
	rm -rf *.html
	node bin/build-template.js

	# stylesheets
	node $(LESS_COMMAND) src/styles.less styles.css

	# scripts
	node bin/build-scripts.js >_scripts.js
	node $(UGLIFY_CMD) _scripts.js >scripts.js
	rm -rf _scripts.js
