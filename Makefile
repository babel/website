.PHONY: bootstrap build serve

bootstrap:
	./scripts/download-readmes.js

build:
	cd website && yarn && yarn build && mv ./build/babel ../_site

serve:
	cd website && yarn start
