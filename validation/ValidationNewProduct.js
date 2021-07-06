/** Reglas de validación exclusivas para el formulario de creación de cuenta */
const validationNewProduct = ({
  name,
  companyName,
  briefCompanyDescription,
  productName,
  productUrl,
  productDescription,
}) => {
  let errors = {};

  /** Valida campo 'name' del formulario */
  if (!name) {
    errors.name = "El nombre del representante es requerido";
  }

  /** Valida campo 'companyName' del formulario */
  if (!companyName) {
    errors.companyName = "El nombre de la empresa es requerido";
  }

  /** Valida campo 'briefCompanyDescription' del formulario */
  if (!briefCompanyDescription) {
    errors.briefCompanyDescription =
      "Debes agregar una breve descripción de la empresa";
  }

  /** Valida campo 'productName' del formulario */
  if (!productName) {
    errors.productName = "El nombre del producto es requerido";
  }

  /** Valida campo 'productUrl' del formulario */
  if (!productUrl) {
    errors.productUrl = "La URL del producto es requerido";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(productUrl)) {
    errors.productUrl = "El formato de la URL no es valida";
  }

  /** Valida campo 'productDescription' del formulario */
  if (!productDescription) {
    errors.productDescription = "Debes agregar la descripción de tu producto";
  }

  return errors;
};

export default validationNewProduct;
