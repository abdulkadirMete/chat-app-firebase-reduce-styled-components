import React from "react";
import styled from "styled-components";
import { ChatPanel } from "./chatpanel/ChatPanel";
import { SidePanel } from "./SidePanel/SidePanel";
import { useSelector } from "react-redux";

export const Home = () => {
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  return (
    <StyledGrid>
      <SidePanel></SidePanel>
      {currentChannel && (
        <ChatPanel currentChannel={currentChannel}></ChatPanel>
      )}
    </StyledGrid>
  );
};

const StyledGrid = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 3fr 13fr;
  background-color: #eee;
`;
