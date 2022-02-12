import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../styles/Variable";
import { AddCircle } from "@styled-icons/fluentui-system-filled/AddCircle";
import { CreateChannelForm } from "../channels/CreateChannelForm";
import { ChannelList } from "../channels/ChannelList";
import { UserPanel } from "../UserPanel/UserPanel";


export const SidePanel = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledAside>
        <UserPanel/>
        <div className="header">
          <span>kanallar</span>
          <AddCircle onClick={handleOpen}></AddCircle>
        </div>
        <ChannelList />
      </StyledAside>
      {/* Create Channel Form */}
      <CreateChannelForm
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </>
  );
};

const StyledAside = styled.aside`
  background-color: ${colors.colorDarkerPurple};

  .header {
    margin: 0 0.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
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
  }

  ul {
    color: white;
    padding: 1rem;

    .active {
      background-color: ${colors.colorLighterPurple};
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      padding: 1rem 0.5rem;
      height: 2rem;

      span {
        text-transform: capitalize;
      }

      &:hover {
        background-color: ${colors.colorLighterPurple};
      }
    }
  }
`;
