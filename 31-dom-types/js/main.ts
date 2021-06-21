import "../css/sakura.css";
import "../css/custom.css";

import { createUser } from "./utils";

const CodelyBackoffice = {
  /*******************************************************************************************************************
   * Create user form
   ******************************************************************************************************************/
  initUserForm() {
    function validateEmail() {
      const field = document.getElementById("email") as HTMLInputElement;
      const isValid = new RegExp(
        "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
      ).test(field.value);

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

      const isValid = validateEmail();

      return isValid;
    }

    document
      .getElementById("user_form")
      .addEventListener("submit", async function (ev) {
        ev.preventDefault();
        const form = ev.target as HTMLFormElement;

        if (isFormValid()) {
          const data = createUser(form);

          document.getElementById("user_form_result").innerHTML = data.success
            ? "User created"
            : "";
        }
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
});
