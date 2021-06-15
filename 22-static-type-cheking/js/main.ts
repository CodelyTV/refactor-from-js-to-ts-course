import "../css/sakura.css";
import "../css/custom.css";

import { countChars } from "./utils";

const CodelyBackoffice = {
  /*******************************************************************************************************************
   * Common forms functions
   ******************************************************************************************************************/
  async initForms() {
    /**
     * Count character in selected fields
     */
    const form_field = document.querySelector(".js-form-control") as any;

    const counter = document.querySelector(".js-count-content");
    const char_counter_container = counter.querySelector(".js-count-chars");

    char_counter_container.innerHTML = countChars(form_field.value);

    form_field.addEventListener("keyup", function () {
      char_counter_container.innerHTML = countChars(
        form_field.value
      ).toString();
    });
  },
  /*******************************************************************************************************************
   * Create user form
   ******************************************************************************************************************/
  initUserForm() {
    function validateBio() {
      const field = document.getElementById("bio") as any;
      const fieldLength = field.value.length;
      const isValid = fieldLength > 0 && field.value.length <= 15;

      if (!isValid) {
        field.classList.add("error");
      }
      return isValid;
    }

    function isFormValid() {
      const formControls = document.querySelectorAll(".js-form-control");

      formControls.forEach(function (control) {
        control.classList.remove("error");
      });

      const isValid = validateBio();

      return isValid;
    }

    document
      .getElementById("user_form")
      .addEventListener("submit", async function (ev) {
        ev.preventDefault();
        const isValid = isFormValid();

        document.getElementById(
          "user_form_result"
        ).innerHTML = `Is form valid: ${isValid}`;
      });
  },
};

/**
 * Init functions
 */
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("user_form")) {
    CodelyBackoffice.initUserForm();
  }
  if (document.querySelector("form")) {
    CodelyBackoffice.initForms();
  }
});
