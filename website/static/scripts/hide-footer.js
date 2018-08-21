(function() {
  document.addEventListener("DOMContentLoaded", function() {
    const pathname = window.document.location.pathname;
    const footer = document.getElementById("footer");
    if (pathname.indexOf("/repl") != -1) {
      footer.setAttribute("class", "nav-footer hide-footer");
    } else {
      footer.setAttribute("class", "nav-footer");
    }
  });
})();
