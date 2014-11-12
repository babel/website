LESS_COMMAND = node_modules/.bin/lessc

.PHONY: build

build:
	rm -rf *.html
	node scripts/build-template.js
	$(LESS_COMMAND) src/styles.less styles.css
