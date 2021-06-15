export function createUser(form) {
  const data = form.elements;
  return {
    success: true,
    data: {
      firstName: data.firstName.value,
      lastName: data.lastName.value,
      email: data.email.value,
    },
  };
}
