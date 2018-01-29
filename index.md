---
layout: default
custom_js:
- index.js
third_party_js:
- //unpkg.com/babel-standalone@6/babel.min.js
- //cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js
---

<div class="hero">
  <div class="hero__content">
    <h1>Babel is a JavaScript compiler.</h1>
    <p>Use next generation JavaScript, today.</p>

    <div class="hero-repl" hidden>
      <div class="hero-repl__editor">
        <div class="hero-repl__pane hero-repl__pane--left">
          <h3>Put in next-gen JavaScript</h3>
          <div id="hero-repl-in" class="hero-repl__code"></div>
        </div>

        <div class="hero-repl__pane hero-repl__pane--right">
          <h3>Get browser-compatible JavaScript out</h3>
          <div id="hero-repl-out" class="hero-repl__code"></div>
          <div class="hero-repl__error"></div>
        </div>
      </div>
      <div class="hero-repl__footer">
        <a href="http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=latest%2Creact%2Cstage-2&experimental=false&loose=false&spec=false&code=%5B1%2C2%2C3%5D.map(n%20%3D%3E%20n%20%2B%201)%3B&playground=true">
          Check out our REPL to experiment more with Babel!
        </a>
      </div>
    </div>

    {% assign latest_post = site.posts.first %}

    <div class="hero-actions">
      <div class="hero-actions-blog">
        <a href="{{ latest_post.url }}">
          <span class="hero-actions-blog__label">Latest From Our Blog:</span>
          <span class="hero-actions-blog__post">{{ latest_post.title }}</span>
        </a>
      </div>
    </div>
  </div>
</div>
