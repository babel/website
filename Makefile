.PHONY: clone build

build:
	if [ ! -d ./_babel ]; \
	then git clone git@github.com:babel/babel.git _babel; \
	fi

	cd _babel; \
	git pull; \
	npm install; \
	make build

	if [ ! -f ./scripts/babel.js ]; \
	then touch ./scripts/babel.js; \
	fi

	rm -f ./_includes/version.html
	touch ./_includes/version.html
	node -e "console.log(require('./_babel/package.json').version)" > ./_includes/version.html

	cat ./_babel/dist/babel.min.js ./_babel/dist/polyfill.min.js > ./scripts/babel.js;

	if [ ! -d ./node_modules ]; \
	then npm install; \
	fi

	if [ ! -d ./_sass/bootstrap ]; \
	then cp -r ./node_modules/bootstrap-sass/assets/stylesheets/bootstrap ./_sass/bootstrap; \
	fi
