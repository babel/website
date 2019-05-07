<a href="https://github.com/rails/webpacker">webpacker</a> is the new default
javascript compiler for Rails 6. It comes with built-in support for transpiling
with babel. To use it in earlier versions of Rails:

```rb
# Gemfile
gem 'webpacker'
```

```sh
bundle install
bundle exec rails webpacker:install
```
