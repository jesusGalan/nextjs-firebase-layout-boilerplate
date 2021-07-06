import React, { useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { Field, Form, InputSubmit } from "../components/ui/Form";

import firebase from "../firebase";

import useValidation from "../hooks/useValidation";
import ValidationRegister from "../validation/ValidationRegister";
import { Error } from "../components/ui/Form";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const { values, errors, submitForm, handleSubmit, handleChange, handleBlur } =
    useValidation(initialState, ValidationRegister, registerUser);

  const { name, email, password } = values;

  const [error, saveError] = useState(false);

  async function registerUser() {
    try {
      await firebase.registerUser(name, email, password);
      await Router.push("/");
    } catch (error) {
      saveError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1>Register</h1>
          <Form noValidate onSubmit={handleSubmit}>
            <Field>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Type your name"
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            {errors.name && <Error>{errors.name}</Error>}

            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Type your email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            {errors.email && <Error>{errors.email}</Error>}

            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                placeholder="Type your password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            {errors.password && <Error>{errors.password}</Error>}

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="create account" />
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default Register;
