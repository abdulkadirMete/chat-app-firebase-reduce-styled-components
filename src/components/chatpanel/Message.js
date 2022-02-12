import React from "react";
import moment from "moment";
import styled from "styled-components";
import { colors } from "../styles/Variable";

export const Message = ({ message }) => {
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  console.log(message.avatar);
  console.log(message);
  return (
    <StyledDiv>
      <div className="container">
        <img src={message.user.avatar}></img>
        <div className="info">
          <div className="up">
            <span className="name">{message.user.name}</span>
            <span className="time">{timeFromNow(message.timestamp)}</span>
          </div>
          <p>{message.content}</p>
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  padding: 0.5rem;

  .container {
    display: flex;
    img {
      height: 50px;
    }

    .info {
      margin-left: 0.5rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .name {
        font-weight: bold;
        margin-right: 0.5rem;
        font-size: 1.2em;
      }

      .time {
        color: ${colors.colorDarkerGray};
      }

      p {
        margin: 0 !important;
        padding: 0;
      }
    }
  }
`;
