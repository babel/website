.PHONY: build serve install-deps

install-deps:
	npm install
	npm dedupe

	if [ ! -d ./_sass/bootstrap ]; \
	then cp -r ./node_modules/bootstrap-sass/assets/stylesheets/bootstrap ./_sass/bootstrap; \
	fi

	@if ! which bundle >/dev/null; then \
	echo "bundler is not installed, please install it with 'gem install bundler'."; \
	exit 1; \
	fi
	bundle check || bundle install;

build: install-deps
	webpack
	bundle exec jekyll build

serve:
	bundle exec jekyll serve

publish: build
	gulp publish
