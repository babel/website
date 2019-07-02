```rb
# config/application.rb
extend Sprockets::BumbleD::DSL

configure_sprockets_bumble_d do |config|
  config.babel_config_version = 1
end
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <a href="https://github.com/rmacklin/sprockets-bumble_d">rmacklin/sprockets-bumble_d repo</a>.
  </p>
</blockquote>
