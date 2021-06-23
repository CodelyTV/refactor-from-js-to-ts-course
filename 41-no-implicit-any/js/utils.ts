export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface CreateUserResponse {
  success: boolean;
  data: User;
}

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
}

export function countWords(str) {
  return str.split(" ").length;
}

export function countChars(str: string): number {
  return str.split("").length;
}

export function show(element) {
  element.classList.remove("hidden");
}

export function hide(element) {
  element.classList.add("hidden");
}

export function createUser(form: HTMLFormElement): CreateUserResponse {
  const data = form.elements as FormElements;
  return {
    success: true,
    data: {
      firstName: data.firstName.value,
      lastName: data.lastName.value,
      email: data.email.value,
    },
  };
}
