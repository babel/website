.PHONY: clone build

build:
	if [ ! -d ./_6to5 ]; \
	then git clone git@github.com:6to5/6to5.git _6to5; \
	fi

	if [ ! -d ./_6to5/node_modules ]; \
	then cd _6to5 && npm install; \
	fi

	cd _6to5 && make build

	if [ ! -f ./scripts/6to5.js ]; \
	then touch ./scripts/6to5.js; \
	fi

	cat ./_6to5/dist/6to5.min.js ./_6to5/dist/polyfill.min.js > ./scripts/6to5.js;
