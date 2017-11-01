.PHONY: build serve

bootstrap:
	bundle install
	npm install
	if [ ! -d ./node_modules ]; \
	then npm install; \
	fi

	if [ ! -d ./_sass/bootstrap ]; \
	then cp -r ./node_modules/bootstrap-sass/assets/stylesheets/bootstrap ./_sass/bootstrap; \
	fi
	

build:
	NODE_ENV=production ./node_modules/.bin/webpack -p
	JEKYLL_ENV=production bundle exec jekyll build

serve-jekyll:
	@if ! which bundle >/dev/null; then \
	echo "bundler is not installed, please install it with 'gem install bundler'."; \
	exit 1; \
	fi

	bundle check || bundle install; \
	bundle exec jekyll serve --incremental

serve-webpack:
	./node_modules/.bin/webpack-dev-server

serve:
	# Run both Jekyll and Webpack concurrently.
	make -j2 serve-jekyll serve-webpack
