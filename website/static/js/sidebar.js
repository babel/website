(function() {
  var headings = [];
  var current;

  Array.prototype.slice
    .call(document.querySelectorAll("article h2, article h3"))
    .forEach(function(heading) {
      var anchor = heading.querySelector("a.hash-link");
      if (!anchor) return;

      var id = anchor.getAttribute("href");
      var isSubHeading = heading.tagName.toUpperCase() !== "H2";

      var value = {
        id: id,
        text: heading.textContent,
        children: [],
      };

      if (!isSubHeading) {
        headings.push(value);
        current = value;
      } else {
        current && current.children.push(value);
      }
    });

  function renderHeadings(headings) {
    var template = "";

    headings.forEach(function(heading) {
      template += '<li><a href="' + heading.id + '">' + heading.text + "</a>";

      if (heading.children.length) {
        template += "<ul>";
        template += renderHeadings(heading.children);
        template += "</ul>";
      }

      navContent += "</li>";
    }, this);

    return template;
  }

  var navContent = renderHeadings(headings);

  var pageNav = this.document.createElement("div");
  pageNav.className = "pageNav";
  pageNav.innerHTML = "<ul>" + navContent + "</ul>";

  document.querySelector(".docMainWrapper").appendChild(pageNav);

  var elements = document.querySelectorAll(
    ".sideNavVisible .docsNavContainer, .pageNav"
  );
  Stickyfill.add(elements);
})();
