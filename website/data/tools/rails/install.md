Rails 7+ defaults to
<a href="https://github.com/rails/importmap-rails">importmap-rails</a>
(no bundler / no Babel). To transpile with Babel, use
<a href="https://github.com/rails/jsbundling-rails">jsbundling-rails</a>
with Webpack and <a href="https://github.com/babel/babel-loader">babel-loader</a>
(Webpacker has been retired):

```rb
# Gemfile
gem "jsbundling-rails"
```

```sh title="Shell"
bundle install
./bin/rails javascript:install:webpack
npm install --save-dev @babel/core @babel/preset-env babel-loader
```

Or create a new app already configured for Webpack:

```sh title="Shell"
rails new myapp -j webpack
```
