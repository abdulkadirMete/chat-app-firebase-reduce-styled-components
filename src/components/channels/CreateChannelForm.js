import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";
import styled from "styled-components";
import { Hashtag } from "@styled-icons/fa-solid/Hashtag";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { colors, radius, shadows } from "../styles/Variable";

export const CreateChannelForm = ({ open,onClose }) => {
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup
      .string()
      .min(10, "Description must be atleast 10 characters")
      .required("Description is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ name, description }, e) {
    firebase.push("channels", {
      name,
      description,
      createdBy: {
        name: profile.name,
        avatar: profile.avatar,
      },
    });
    onClose();
  }

  if (open) {
    return (
      <StyledModal>
        <div className="modal-content">
          <div className="header">
            <h3>Yeni Kanal Oluştur</h3>
          </div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)} id="channel">
            <div className="group">
              <Hashtag />
              <input
                type="text"
                placeholder="#Genel"
                name="name"
                {...register("name")}
                className="input"
              />
            </div>
            <div className="group">
              <Hashtag />
              <input
                type="text"
                placeholder="Genel her türlü konunun konuşabileceği bir kanaldır"
                className="input"
                name="description"
                {...register("description")}
              />
            </div>
          </form>
          {errors.name && <span className="message error">Invalid Name</span>}
          {errors.description && (
            <span className="message error">Invalid Description</span>
          )}
          <div className="btn-group">
            <button className="btn close" onClick={onClose}>
              Vazgeç
            </button>
            <button form="channel" type="submit" className="btn add">
              Oluştur
            </button>
          </div>
        </div>
      </StyledModal>
    );
  }

  return null;
};

const StyledModal = styled.div`
  display: flex; 
  position: fixed; 
  z-index: 1; 
  width: 100%; 
  height: 100%; 
  background-color: rgba(0, 0, 0, 0.8);
  align-items: center;
  justify-content: center;

  .header {
    padding: 1rem;
  }

  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    border: 1px solid #888;
    width: 50%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    hr {
      height: 1px;
      background-color: #ccc;
      border: none;
    }

    form {
      padding: 1rem;
    }

    .group {
      position: relative;
      display: flex;

      .input {
        width: 100%;
        margin: 0.25rem 0rem;
      }

      svg {
        position: absolute;
        width: 16px;
        color: ${colors.colorGray};
        left: 0;
        top: 50%;
        transform: translate(50%, -50%);
      }
    }

    .btn-group {
      padding: 0.5rem;
      display: flex;
      justify-content: flex-end;
      background-color: ${colors.colorLighterGray};
      border-top: 1px solid ${colors.colorBorderGray};

      .btn {
        margin-right: 0.5rem;
      }

      .close {
        background-color: black;
      }

      .add {
        background-color: green;
      }
    }

    .message {
      min-width: 392px;
      margin-top: 2rem;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 8px;
      border-radius: ${radius.radiusMin};
      box-shadow: ${shadows.shadowDark};

      h4 {
        color: ${colors.colorDarkerGray};
      }
    }

    .error {
      background-color: red;
      color: white;
      margin-top: 0.25rem;
    }
  }
`;
