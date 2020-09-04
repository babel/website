```make
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)

lib: $(LIB)
lib/%.js: src/%.js babel.config.json
  mkdir -p $(@D)
  babel $< -o $@
```

```sh
make
```
