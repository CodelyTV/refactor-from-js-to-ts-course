import axios from "axios";

import "../css/sakura.css";
import "../css/custom.css";

import {
  countChars,
  createUser,
  show,
  hide,
  User,
  getOneByTitle,
} from "./utils";
import { FetchResponse } from "./types";

const CodelyBackoffice = {
  /*******************************************************************************************************************
   * Common features
   ******************************************************************************************************************/
  initCommon() {
    /**
     * Show/hide an element based on a change in another field.
     */
    const trigger = document.querySelector(".js-trigger-container")!;

    trigger.addEventListener("click", function () {
      const rel = trigger.getAttribute("rel")!;
      document.getElementById(rel)!.classList.toggle("hidden");
    });
  },
  /*******************************************************************************************************************
   * Common forms functions
   ******************************************************************************************************************/
  async initForms() {
    function fetchData(select: Element) {
      const domain =
        document.domain == "localhost" ? "localhost:8080" : document.domain;
      const type = select.getAttribute("data-type");

      return axios
        .get<FetchResponse>(`http://${domain}/data/${type}.json`)
        .then((response) => response.data)
        .catch(() => {
          throw new Error(`Could not find ${type}.json`);
        });
    }

    /**
     * Count character in selected fields
     */
    const contentCounters = document.querySelectorAll(".js-count-content");

    for (let i = 0; i < contentCounters.length; ++i) {
      const counter = contentCounters[i];
      const form_field = counter.parentElement!.querySelector<HTMLInputElement>(
        ".js-form-control"
      )!;
      const char_counter_container = counter.querySelector(".js-count-chars");

      if (char_counter_container) {
        char_counter_container.innerHTML = countChars(
          form_field.value
        ).toString();

        form_field.addEventListener("keyup", function () {
          char_counter_container.innerHTML = countChars(
            form_field.value
          ).toString();
        });
      }
    }

    /**
     * Load select data
     */
    const dataLoaders = document.querySelectorAll(".js-load-data");
    const requests = [];

    for (const select of dataLoaders) {
      requests.push(fetchData(select));
    }

    const responses = await Promise.all(requests).catch((e) => {
      console.error(e);
      return [] as FetchResponse[];
    });

    responses.forEach(({ data }, index) => {
      const select = dataLoaders[index];

      for (const item of data) {
        const option = document.createElement("option");
        option.textContent = item.name;
        select.append(option);
      }
    });
  },
  /*******************************************************************************************************************
   * Filter courses by category
   ******************************************************************************************************************/
  initCategoryFilter() {
    const filter = document.getElementById("category")!;

    function getSelectedValues(node: HTMLElement) {
      const checkboxes = node.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:checked'
      );

      const selectedValues = Array.from(checkboxes).map(
        (checkbox) => checkbox.value
      );

      return selectedValues;
    }

    function isInList(item: string, list: string[]) {
      return list.includes(item);
    }

    filter.addEventListener("change", function () {
      const categories = getSelectedValues(this);

      const elementsToFilter = document.querySelectorAll(".js-filtered-item");

      for (const element of elementsToFilter) {
        if (categories.length === 0) {
          show(element);
          continue;
        }

        const elementCategory = element.getAttribute("data-category")!;

        if (isInList(elementCategory, categories)) {
          show(element);
        } else {
          hide(element);
        }
      }
    });
  },
  initSearchByTitle() {
    const filter = document.getElementById("getOneByName") as HTMLInputElement;
    const result = document.getElementById("name-search-result")!;

    filter.addEventListener("keyup", () => {
      const course = getOneByTitle(filter.value);

      if (course) {
        show(result);
        result.innerHTML = course.title;
      } else {
        hide(result);
      }
    });
  },
  /*******************************************************************************************************************
   * Create user form
   ******************************************************************************************************************/
  initUserForm() {
    function validateRequiredField(field: HTMLInputElement) {
      const isValid = !!field.value;

      if (!isValid) {
        field.classList.add("error");
      }
      return isValid;
    }

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

    function validateDob() {
      const field = document.getElementById("dob") as HTMLInputElement;
      const date = +new Date(field.value);
      const now = +new Date();
      const isValid =
        Math.abs(new Date(now - date).getUTCFullYear() - 1970) > 18;

      if (!isValid) {
        field.classList.add("error");
      }
      return isValid;
    }

    function validateBio() {
      const field = document.getElementById("bio") as HTMLInputElement;
      const fieldLength = field.value.length;
      const isValid = fieldLength > 0 && field.value.length <= 200;

      if (!isValid) {
        field.classList.add("error");
      }
      return isValid;
    }

    function isFormValid() {
      hide(document.getElementById("user_form_error")!);

      const formControls = document.querySelectorAll(".js-form-control");

      formControls.forEach(function (control) {
        control.classList.remove("error");
      });

      const isValid =
        validateRequiredField(
          document.getElementById("firstName") as HTMLInputElement
        ) &&
        validateRequiredField(
          document.getElementById("lastName") as HTMLInputElement
        ) &&
        validateEmail() &&
        validateDob() &&
        validateRequiredField(
          document.getElementById("country") as HTMLInputElement
        ) &&
        validateRequiredField(
          document.getElementById("courseCategory") as HTMLInputElement
        ) &&
        validateBio();

      if (!isValid) {
        show(document.getElementById("user_form_error")!);
      }

      return isValid;
    }

    function sanitize(strings: TemplateStringsArray, ...values: string[]) {
      let output = "";
      // eslint-disable-next-line no-var
      for (var index = 0; index < values.length; index++) {
        let valueString = values[index].toString();

        if (valueString.indexOf(">") !== -1) {
          valueString = "-";
        }

        output += strings[index] + valueString;
      }

      output += strings[index];
      return output;
    }

    function handleFormError() {
      show(document.getElementById("network_form_error")!);
    }

    function handleFormSuccess(form: HTMLFormElement, newUser: User) {
      const thanksBlock = document.getElementById("thanks")!;
      const title = thanksBlock.querySelector("h3")!;
      const content = thanksBlock.querySelector("p")!;

      title.innerHTML = sanitize`Thank you ${newUser.firstName} for registering!`;
      content.innerHTML = sanitize`We sent a confirmation email to <strong>${newUser.email}</strong>`;

      hide(form);
      show(thanksBlock);
    }

    document
      .getElementById("user_form")!
      .addEventListener("submit", async function (ev) {
        ev.preventDefault();
        const form = ev.target as HTMLFormElement;

        if (isFormValid()) {
          const { success, data: newUser } = await createUser(form);

          if (!success) {
            handleFormError();
            return;
          }

          handleFormSuccess(form, newUser);
        }
      });
  },
};

/**
 * Init functions
 */
window.addEventListener("DOMContentLoaded", () => {
  CodelyBackoffice.initCommon();

  if (document.getElementById("category")) {
    CodelyBackoffice.initCategoryFilter();
    CodelyBackoffice.initSearchByTitle();
  }
  if (document.querySelector("form")) {
    CodelyBackoffice.initForms();
  }
  if (document.getElementById("user_form")) {
    CodelyBackoffice.initUserForm();
  }
});
