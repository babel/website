.PHONY: bootstrap build serve

bootstrap:
	rm docs/z_*.md && ./scripts/download-readmes.js

build: build-repl build-docusaurus

build-repl:
	./node_modules/.bin/webpack

build-docusaurus:
	cd website && yarn && yarn build && mv ./build/babel ../_site

serve:
	cd website && yarn start
