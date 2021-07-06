import React, { useState, useEffect } from "react";

const useValidateNewProduct = (initialState, validate, fn) => {
  const [dataForm, setDataForm] = useState(initialState),
    [errors, setErrors] = useState({}),
    [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) {
      const noErrors = Object.keys(errors).length === 0;

      if (noErrors) {
        fn();
      }
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleBlur = () => {
    const errorsValidate = validate(dataForm);
    setErrors(errorsValidate);
  };

  const handleChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errorsValidate = validate(dataForm);
    setErrors(errorsValidate);
    setSubmit(true);
  };

  return {
    dataForm,
    errors,
    setDataForm,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default useValidateNewProduct;
