export function countWords(str) {
  return str.split(" ").length;
}

export function countChars(str) {
  return str.split("").length;
}

export function show(element) {
  element.classList.remove("hidden");
}

export function hide(element) {
  element.classList.add("hidden");
}

export function createUser(form) {
  return new Promise((resolve) => {
    const newUser = Object.values(form.elements).reduce((user, element) => {
      if (element.id) {
        // @ts-expect-error
        user[element.id] = element.value;
      }
      return user;
    }, {});

    resolve({
      success: true,
      data: newUser,
    });
  });
}
