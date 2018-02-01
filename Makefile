.PHONY: bootstrap build serve

bootstrap:
	./scripts/download-readmes.js

build: build-repl build-docusaurus

build-repl:
	./node_modules/.bin/webpack

build-docusaurus:
	cd website && yarn && yarn build

serve:
	cd website && yarn start
