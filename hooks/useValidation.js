import React, { useState, useEffect } from "react";

const useValidation = (initialState, validation, fn) => {
  const [values, saveValues] = useState(initialState);
  const [errors, saveErrors] = useState({});
  const [submitForm, saveSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;

      if (noErrors) {
        fn();
      }

      saveSubmitForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleChange = (e) => {
    saveValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsValidation = validation(values);
    saveErrors(errorsValidation);
    saveSubmitForm(true);
  };

  const handleBlur = () => {
    const errorsValidation = validation(values);
    saveErrors(errorsValidation);
  };

  return {
    values,
    errors,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidation;
