import styled from "styled-components";
import loginBg from "../../images/bg-login.png";
import fontChewy, { colors, logoTextColor, radius, shadows } from "./Variable";

export const StyledForm = styled.div`
  height: 100vh;
  background-image: url(${loginBg});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  //logo
  h1 {
    margin-bottom: 1rem;
    font-size: 3em;
    font-family: "Chewy", cursive;
    src: url(${fontChewy});
    color: ${colors.colorDarkerPurple};

    span {
      color: white;
    }
  }

  form {
    display: grid;
    width: 400px;
    padding: 1rem;
    background-color: white;
    row-gap: 0.8rem;
    border-radius: ${radius.radiusMin};
    box-shadow: ${shadows.shadowDark};

    .group {
      position: relative;

      .input {
        width: 100%;
      }

      .input.invalid{
        border: 1px solid red;
        &:focus{
          outline-color:red
        }
      }

      svg {
        position: absolute;
        fill: ${colors.colorGray};
        left: 0;
        top: 50%;
        transform: translate(50%, -50%);
      }
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

  .error{
    background-color: red;
    color:white;
    margin-top: .5rem;

  }
`;
