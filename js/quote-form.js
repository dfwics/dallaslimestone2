/* quote-form.js
   Client-side validation and submit handling for the Get a Quote form.
   Supports a ?type= query param so other pages (e.g. Fireplaces &
   Mantels) can deep-link in with a stone type pre-selected.
*/
(function () {
  "use strict";

  function showError(field, message) {
    field.classList.add("has-error");
    var msg = field.querySelector(".field-error");
    if (msg) msg.textContent = message;
  }

  function clearError(field) {
    field.classList.remove("has-error");
  }

  function validate(form) {
    var valid = true;

    var name = form.querySelector("#q-name");
    var nameField = name.closest(".field");
    if (!name.value.trim()) {
      showError(nameField, "Enter your name.");
      valid = false;
    } else {
      clearError(nameField);
    }

    var phone = form.querySelector("#q-phone");
    var email = form.querySelector("#q-email");
    var phoneField = phone.closest(".field");
    var emailField = email.closest(".field");
    var phoneOk = phone.value.replace(/\D/g, "").length >= 10;
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    if (!phoneOk && !emailOk) {
      showError(phoneField, "Enter a phone number or an email address.");
      showError(emailField, "Enter a phone number or an email address.");
      valid = false;
    } else {
      clearError(phoneField);
      clearError(emailField);
    }

    var stoneType = form.querySelector("#q-stone-type");
    var stoneField = stoneType.closest(".field");
    if (!stoneType.value) {
      showError(stoneField, "Choose a stone type.");
      valid = false;
    } else {
      clearError(stoneField);
    }

    return valid;
  }

  function prefillFromQuery(form) {
    var params = new URLSearchParams(window.location.search);
    var type = params.get("type");
    if (!type) return;
    var select = form.querySelector("#q-stone-type");
    if (!select) return;
    var match = Array.prototype.find.call(select.options, function (opt) {
      return opt.value.toLowerCase() === type.toLowerCase();
    });
    if (match) select.value = match.value;
  }

  function populateStoneTypes(select) {
    fetch("/data/materials.json")
      .then(function (res) { return res.json(); })
      .then(function (items) {
        items.forEach(function (item) {
          var opt = document.createElement("option");
          opt.value = item.id;
          opt.textContent = item.title;
          select.appendChild(opt);
        });
        var fireplaceOpt = document.createElement("option");
        fireplaceOpt.value = "fireplace-mantel";
        fireplaceOpt.textContent = "Fireplace / Mantel";
        select.appendChild(fireplaceOpt);

        var otherOpt = document.createElement("option");
        otherOpt.value = "other";
        otherOpt.textContent = "Other / not sure";
        select.appendChild(otherOpt);

        prefillFromQuery(select.closest("form"));
      })
      .catch(function (err) { console.error(err); });
  }

  function init(form) {
    var select = form.querySelector("#q-stone-type");
    if (select) populateStoneTypes(select);

    var status = form.querySelector(".form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) return;

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending\u2026";

      var payload = Object.fromEntries(new FormData(form).entries());

      // TODO: wire up form endpoint. Replace the URL below with the
      // client's email/CRM integration once it's provisioned.
      fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          status.textContent = "Thanks \u2014 we'll be in touch within one business day.";
          status.className = "form-status is-visible success";
          form.reset();
        })
        .catch(function () {
          status.textContent = "Something went wrong sending this. Please call (972) 555-0147 or try again.";
          status.className = "form-status is-visible error";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Request a quote";
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quote-form").forEach(init);
  });
})();
