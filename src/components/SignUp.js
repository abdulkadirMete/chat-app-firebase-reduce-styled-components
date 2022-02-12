import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { StyledForm } from "../components/styles/StyledForm";
import loginBg from "../images/bg-login.png";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useFirebase } from "react-redux-firebase";

//icons
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export const SignUp = () => {
  const firebase = useFirebase();
  const [fbErrors, setFbErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup.string().required("First Name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = ({ username, email, password }) => {
    setSubmitting(true);
    setFbErrors([]);

    const [first, last] = username.split(" ");

    firebase
      .createUser(
        {
          email,
          password,
        },
        {
          name: username,
          avatar: `https://ui-avatars.com/api/?name=${first}+${last}&background=random&color=fff`,
        }
      )
      .then((user) => {
      })
      .catch((error) => {
        setFbErrors([{ message: error.message }]);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

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
            name="username"
            type="text"
            placeholder="Kullanıcı Adı"
            className={`input ${errors.username ? "invalid" : null}`}
            {...register("username")}
          />
          <FaUserAlt></FaUserAlt>
        </div>
        <div className="group">
          <input
            name="email"
            type="text"
            placeholder="Email Adresi"
            className={`input ${errors.email ? "invalid" : null}`}
            {...register("email")}
          />
          <MdEmail></MdEmail>
        </div>
        <div className="group">
          <input
            name="password"
            type="text"
            placeholder="Şifre"
            className={`input ${errors.password ? "invalid" : null}`}
            {...register("password")}
          />
          <RiLockPasswordFill></RiLockPasswordFill>
        </div>
        <button type="submit" className="btn" disabled={submitting}>
          Kaydol
        </button>
      </form>

      <div className="message">
        <h4>
          Zaten Hesabın Var mı ? <Link to="/login">Giriş Yap</Link>
        </h4>
      </div>

      {/* Errors */}

      {errors.username && (
        <span className="message error">Invalid UserName</span>
      )}
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

const StyledSignUp = styled.div`
  height: 100vh;
  background-image: url(${loginBg});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin-bottom: 1rem;
    font-size: 3em;
  }

  form {
    display: grid;
    width: 400px;
    padding: 1rem;
    background-color: white;
    row-gap: 0.8rem;

    .group {
      position: relative;

      .input {
        width: 100%;
      }

      svg {
        position: absolute;
        fill: grey;
        left: 0;
        top: 50%;
        transform: translate(50%, -50%);
      }
    }
  }
`;
