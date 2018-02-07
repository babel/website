.PHONY: bootstrap build serve

bootstrap:
	./scripts/download-readmes.js

build: build-repl build-docusaurus copy-redirects

build-repl:
	./node_modules/.bin/webpack

build-docusaurus:
	cd website && yarn && yarn build

copy-redirects:
	cp ./_redirects ./website/build/babel

serve:
	cd website && yarn start
