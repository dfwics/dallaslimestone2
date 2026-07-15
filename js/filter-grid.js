/* filter-grid.js
   Shared component powering both /materials/ and /services/. Reads a JSON
   file of items, renders a category chip row + responsive card grid, and
   filters client-side with no page reload. Clicking a card scrolls to a
   matching in-page detail section rather than opening a new URL (see
   build brief §4.1).
*/
(function () {
  "use strict";

  function iconMarkup(icon) {
    return '<i class="ti ' + icon + '" aria-hidden="true"></i>';
  }

  function buildChip(label, value, isActive) {
    var chip = document.createElement("li");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = label;
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    btn.dataset.filter = value;
    chip.appendChild(btn);
    return chip;
  }

  function buildCard(item) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.category = item.category;
    card.setAttribute("aria-label", item.title + " \u2014 jump to details");

    card.innerHTML =
      '<span class="card-icon">' + iconMarkup(item.icon) + '</span>' +
      '<h3>' + item.title + '</h3>' +
      '<p>' + item.summary + '</p>';

    card.addEventListener("click", function () {
      var target = document.getElementById(item.id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });

    return card;
  }

  function init(container) {
    var src = container.dataset.source;
    var labels = {};
    try {
      labels = JSON.parse(container.dataset.categoryLabels || "{}");
    } catch (e) { /* fall back to raw category strings */ }

    var chipRow = document.createElement("ul");
    chipRow.className = "chip-row";
    chipRow.setAttribute("role", "list");

    var grid = document.createElement("div");
    grid.className = "card-grid";

    container.appendChild(chipRow);
    container.appendChild(grid);

    fetch(src)
      .then(function (res) { return res.json(); })
      .then(function (items) {
        // Build chip list: "All" plus one per category, in first-seen order.
        var seen = [];
        items.forEach(function (item) {
          if (seen.indexOf(item.category) === -1) seen.push(item.category);
        });

        chipRow.appendChild(buildChip("All", "all", true));
        seen.forEach(function (cat) {
          chipRow.appendChild(buildChip(labels[cat] || cat, cat, false));
        });

        items.forEach(function (item) {
          grid.appendChild(buildCard(item));
        });

        chipRow.addEventListener("click", function (e) {
          var btn = e.target.closest(".chip");
          if (!btn) return;

          chipRow.querySelectorAll(".chip").forEach(function (c) {
            c.setAttribute("aria-pressed", "false");
          });
          btn.setAttribute("aria-pressed", "true");

          var filter = btn.dataset.filter;
          grid.querySelectorAll(".card").forEach(function (card) {
            var show = filter === "all" || card.dataset.category === filter;
            card.style.display = show ? "" : "none";
          });
        });
      })
      .catch(function (err) {
        grid.innerHTML = '<p class="muted">Unable to load items right now.</p>';
        console.error(err);
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".filter-grid").forEach(init);
  });
})();
