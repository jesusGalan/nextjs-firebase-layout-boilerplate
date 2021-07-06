const Email = (email, errors) => {
  if (!email) {
    errors.email = "El Email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "Email no valido";
  }
};

export default Email;
