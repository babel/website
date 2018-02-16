(function() {
  function setActiveMenuItem(nav) {
    const itemsNodeList = nav.querySelectorAll("[target='_self']");
    const urlPath = window.location.pathname;
    for (const item of itemsNodeList) {
      const path = item.pathname.substr(item.pathname.lastIndexOf("/") + 1);
      if (urlPath.includes(path)) {
        item.classList.add("active");
      }
    }
  }
  const primaryNav = document.querySelector(".nav-site-internal");
  setActiveMenuItem(primaryNav);
})();
