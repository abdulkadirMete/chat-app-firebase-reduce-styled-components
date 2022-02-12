import React from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import styled from "styled-components";
import { SignOutAlt } from "styled-icons/fa-solid";

export const UserPanel = () => {
  const user = useSelector((state) => state.firebase.profile);
  const firebase = useFirebase();

  const handleSignOut = () => {
    firebase.logout();
  };
  return (
    <StyledDiv>
      <span>{user.name}</span>
      <SignOutAlt onClick={handleSignOut}></SignOutAlt>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  margin: 0 0.5rem;
  margin-top: 2rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    text-transform: uppercase;
    color: white;
  }

  svg {
    color: white;
    width: 24px;
  }
`;
