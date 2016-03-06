.PHONY: build serve

build:
	if [ ! -d ./node_modules ]; \
	then npm install; \
	fi

	if [ ! -d ./_sass/bootstrap ]; \
	then cp -r ./node_modules/bootstrap-sass/assets/stylesheets/bootstrap ./_sass/bootstrap; \
	fi

serve:
	@if ! which bundle >/dev/null; then \
	echo "bundler is not installed, please install it with 'gem install bundler'."; \
	exit 1; \
	fi

	bundle check || bundle install; \
	bundle exec jekyll serve
