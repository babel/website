.PHONY: clone build

build:
	if [ ! -d ./_6to5 ]; \
	then git clone git@github.com:6to5/6to5.git _6to5; \
	fi

	cd _6to5; \
	git pull; \
	npm install; \
	make build

	if [ ! -f ./scripts/6to5.js ]; \
	then touch ./scripts/6to5.js; \
	fi

	rm -f ./_includes/version.html
	touch ./_includes/version.html
	node -e "console.log(require('./_6to5/package.json').version)" > ./_includes/version.html

	cat ./_6to5/dist/6to5.min.js ./_6to5/dist/polyfill.min.js > ./scripts/6to5.js;

	if [ ! -d ./node_modules]; \
	then npm install; \
	fi

	if [ ! -d ./_sass/bootstrap ]; \
	then cp -r ./node_modules/bootstrap-sass/assets/stylesheets/bootstrap ./_sass/bootstrap; \
	fi
