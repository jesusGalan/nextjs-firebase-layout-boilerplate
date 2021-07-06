import Email from "./validators/Email";
import Password from "./validators/Password";

export default function validationRegister({ name, email, password }) {
  let errors = {};

  if (!name) {
    errors.name = "El nombre es obligatorio";
  }

  Email(email, errors);

  Password(password, errors);

  return errors;
}
