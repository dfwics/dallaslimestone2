/* gallery.js
   Lightbox for the project gallery grid. Click a thumbnail to enlarge,
   navigate with arrow keys or swipe, close on Escape or an outside click.
*/
(function () {
  "use strict";

  function init(grid) {
    var items = Array.prototype.slice.call(grid.querySelectorAll(".gallery-item"));
    if (!items.length) return;

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Project photo viewer");
    lightbox.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button>' +
      '<button type="button" class="lightbox-prev" aria-label="Previous photo">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>' +
      '</button>' +
      '<button type="button" class="lightbox-next" aria-label="Next photo">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>' +
      '</button>' +
      '<figure class="lightbox-figure">' +
        '<div class="img-placeholder img-placeholder--tall" data-role="lightbox-image"></div>' +
        '<figcaption class="lightbox-caption" data-role="lightbox-caption"></figcaption>' +
      '</figure>';
    document.body.appendChild(lightbox);

    var imgSlot = lightbox.querySelector('[data-role="lightbox-image"]');
    var captionSlot = lightbox.querySelector('[data-role="lightbox-caption"]');
    var currentIndex = 0;
    var lastFocused = null;

    function render(index) {
      currentIndex = (index + items.length) % items.length;
      var item = items[currentIndex];
      var expected = item.dataset.expected || "";
      var caption = item.dataset.caption || "";
      imgSlot.innerHTML = '<span>' + expected + '</span>';
      captionSlot.textContent = caption;
    }

    function open(index) {
      lastFocused = document.activeElement;
      render(index);
      lightbox.classList.add("is-open");
      lightbox.querySelector(".lightbox-close").focus();
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    items.forEach(function (item, index) {
      item.addEventListener("click", function () { open(index); });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function () { render(currentIndex - 1); });
    lightbox.querySelector(".lightbox-next").addEventListener("click", function () { render(currentIndex + 1); });

    // Close on click outside the figure.
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") render(currentIndex - 1);
      if (e.key === "ArrowRight") render(currentIndex + 1);
    });

    // Basic swipe support.
    var touchStartX = null;
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) render(currentIndex + (dx < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".gallery-grid").forEach(init);
  });
})();
