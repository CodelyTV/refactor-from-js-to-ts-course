export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface CreateUserResponse {
  success: boolean;
  data: User;
}

export function createUser(form): CreateUserResponse {
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
