import Email from "./validators/Email";
import Password from "./validators/Password";

export default function validationLogin({ email, password }) {
  let errors = {};

  Email(email, errors);

  Password(password, errors);

  return errors;
}
