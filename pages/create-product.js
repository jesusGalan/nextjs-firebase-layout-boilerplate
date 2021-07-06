import React, { useState, useContext } from "react";
import FileUploader from "react-firebase-file-uploader";
import { useRouter } from "next/router";

import Layout from "../components/layout/Layout";
import Error404 from "../components/layout/404";
import { Error, Field, Form, InputSubmit } from "../components/ui/Form";

import useValidateNewProduct from "../hooks/useValidateNewProduct";
import validationNewProduct from "../validation/ValidationNewProduct";

import { FirebaseContext } from "../firebase";

const STATE = {
  name: "",
  companyName: "",
  briefCompanyDescription: "",
  productName: "",
  productImageUrl: "",
  productUrl: "",
  productDescription: "",
};

/** Component */
const CreateProduct = () => {
  const /** Implementa Hook de Validación */
    {
      dataForm,
      errors, // States definidos en el Hook
      setDataForm, // Funciones para modificar el State
      handleChange,
      handleSubmit,
      handleBlur, // Funciones definidas en el Hook
    } = useValidateNewProduct(
      STATE, // State inicial para el componente
      validationNewProduct, // Reglas de validación para el componente
      createProduct // Funcion que se ejecutará si la validación es exitosa
    ),
    /** Define state to handle errors */
    [error, setError] = useState(false),
    /** Destructuring del State de datos del formulario */
    {
      name,
      companyName,
      briefCompanyDescription,
      productName,
      productImageUrl,
      productUrl,
      productDescription,
    } = dataForm,
    /** Destructuring properties 'FirebaseContext' */
    { user, firebase } = useContext(FirebaseContext),
    /** Hook del Router de Next */
    router = useRouter(),
    /** Define States for 'react-firebase-file-uploader' */
    [image, setImage] = useState({
      imageName: "",
      imageUrl: "",
      isUploading: false,
      uploadProgress: 0,
    });

  /** Create user account */
  async function createProduct() {
    /** Valida si el usuario No esta autenticadoen Firebase */
    if (!user) {
      return router.push("/login"); // Redirecciona usando el router de Next
    }

    /** Crea el nuevo producto */
    const newProduct = {
      name,
      companyName,
      briefCompanyDescription,
      productName,
      productImageUrl,
      productUrl,
      productDescription,
      votes: 0,
      voters: [],
      comments: [],
      creationDate: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName,
      },
    };

    /** Inserta nuevo producto a la base de datos de Firebase */
    firebase.db.collection("products").add(newProduct);

    /** Redirecciona al Home */
    router.push("/");
  }

  /** Funciones de la dependencia 'react-firebase-file-uploader' */
  const handleUploadStart = () =>
    setImage({
      isUploading: true,
      uploadProgress: 0,
    });

  const handleProgress = (progress) =>
    setImage({
      uploadProgress: progress,
    });

  const handleUploadError = (error) => {
    setImage({
      isUploading: error,
      // Todo: handle error
    });
    console.error(error);
  };

  const handleUploadSuccess = async (filename) => {
    const downloadURL = await firebase.storage
      .ref("images/products")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        console.log("imageURL", url);

        /** Actualiza el State del Form */
        setDataForm({
          ...dataForm,
          productImageUrl: url,
        });
      });

    setImage({
      imageName: filename,
      imageUrl: downloadURL,
      uploadProgress: 100,
      isUploading: false,
    });
  };

  return (
    <Layout>
      {!user ? (
        <Error404 />
      ) : (
        <>
          <h1>Nuevo Producto</h1>
          <Form onSubmit={handleSubmit} noValidate>
            {error ? <Error>{error}</Error> : null}
            <fieldset>
              <legend>Información General</legend>

              <Field>
                <label htmlFor="name">Persona a cargo</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre de persona encargada"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.name && <Error>{errors.name}</Error>}

              <Field>
                <label htmlFor="companyName">Empresa</label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Nombre de la empresa"
                  name="companyName"
                  value={companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.companyName && <Error>{errors.companyName}</Error>}

              <Field>
                <label htmlFor="briefCompanyDescription">Descripción</label>
                <textarea
                  id="briefCompanyDescription"
                  placeholder="Breve descripción de las actividades de la empresa"
                  name="briefCompanyDescription"
                  value={briefCompanyDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.briefCompanyDescription && (
                <Error>{errors.briefCompanyDescription}</Error>
              )}
            </fieldset>
            <fieldset>
              <legend>Información del Producto</legend>

              <Field>
                <label htmlFor="productName">Producto</label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Nombre del producto"
                  name="productName"
                  value={productName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.productName && <Error>{errors.productName}</Error>}

              <Field>
                <label htmlFor="productImageUrl">Imagen</label>
                <FileUploader
                  id="productImageUrl"
                  name="productImageUrl"
                  /** Metodos de la dependencia */
                  accept="image/*"
                  randomizeFilename
                  storageRef={firebase.storage.ref("images/products")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Field>
              {errors.productImageUrl && (
                <Error>{errors.productImageUrl}</Error>
              )}

              <Field>
                <label htmlFor="productUrl">URL</label>
                <input
                  type="url"
                  id="productUrl"
                  placeholder="URL del producto"
                  name="productUrl"
                  value={productUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.productUrl && <Error>{errors.productUrl}</Error>}

              <Field>
                <label htmlFor="productDescription">Descripción</label>
                <textarea
                  id="productDescription"
                  placeholder="Descripción detallada del producto"
                  name="productDescription"
                  value={productDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.productDescription && (
                <Error>{errors.productDescription}</Error>
              )}
            </fieldset>

            <InputSubmit type="submit" value={"Add product"} />
          </Form>
        </>
      )}
    </Layout>
  );
};

export default CreateProduct;
