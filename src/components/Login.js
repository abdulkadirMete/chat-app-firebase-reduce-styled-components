import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { StyledForm } from "./styles/StyledForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useFirebase } from "react-redux-firebase";

export const Login = () => {
  const firebase = useFirebase();
  const [fbErrors, setFbErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ email, password }, e) {
    setSubmitting(true);
    setFbErrors([]);

    firebase
      .login({
        email,
        password,
      })
      .then((data) => {
      })
      .catch((error) => {
        setFbErrors([{ message: error.message }]);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const displayErrors = () =>
    fbErrors.map((error, index) => `${error.message} \n`);

  return (
    <StyledForm>
      <h1>
        Chatify<span>.io</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="group">
          <input
            className={`input ${errors.email ? "invalid" : null}`}
            placeholder="Kullanıcı Adı"
            name="email"
            {...register("email")}
          />

          <MdEmail></MdEmail>
        </div>
        <div className="group">
          <input
            className={`input ${errors.password ? "invalid" : null}`}
            placeholder="Şifre"
            name="password"
            {...register("password")}
          />

          <RiLockPasswordFill></RiLockPasswordFill>
        </div>
        <button disabled={submitting} className="btn">
          Giriş Yap
        </button>
      </form>

      <div className="message">
        <h4>
          Yeni misin ? <Link to="/signup">Hesap Oluştur</Link>
        </h4>
      </div>

      {/* Errors */}

      {errors.email && <span className="message error">Invalid Email</span>}
      {errors.password && (
        <span className="message error">Invalid Password</span>
      )}
      {fbErrors.length > 0 && (
        <span className="message error">{displayErrors()}</span>
      )}
    </StyledForm>
  );
};
