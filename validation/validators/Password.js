const Password = (password, errors) => {
  if (!password) {
    errors.password = "El password es obligatorio";
  } else if (password.length < 6) {
    errors.password = "El password necesita al menos 6 caracteres";
  }
};

export default Password;
