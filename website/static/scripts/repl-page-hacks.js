(function() {
  document.addEventListener("DOMContentLoaded", function() {
    const pathname = window.document.location.pathname;
    if (pathname.indexOf("/repl") != -1) {
      document.body.setAttribute("data-repl", "");
    }
  });
})();
