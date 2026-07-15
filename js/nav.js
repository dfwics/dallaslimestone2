/* nav.js
   Loads the shared header/footer partials into every page so markup is
   never hand-duplicated (see build brief §2), then wires up the mobile
   menu toggle and marks the current page's nav link.
*/
(function () {
  "use strict";

  function markCurrentNav(root) {
    var page = document.body.getAttribute("data-page");
    if (!page) return;
    root.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav") === page) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function wireMobileMenu(header) {
    var toggle = header.querySelector(".hamburger");
    var panel = header.querySelector("#mobile-nav");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close the mobile menu on navigation or resize back to desktop.
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) {
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function loadPartial(selector, url) {
    var target = document.querySelector(selector);
    if (!target) return Promise.resolve(null);
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load " + url);
        return res.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        return target;
      })
      .catch(function (err) {
        console.error(err);
        return null;
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadPartial("#site-header", "/partials/header.html").then(function (header) {
      if (!header) return;
      markCurrentNav(header);
      wireMobileMenu(header);
    });

    loadPartial("#site-footer", "/partials/footer.html").then(function (footer) {
      if (!footer) return;
      var yearEl = footer.querySelector("[data-year]");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
  });
})();
