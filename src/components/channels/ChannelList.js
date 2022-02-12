import React, { useState, useEffect } from "react";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import { Hashtag } from "styled-icons/fa-solid";
import { setCurrentChannel } from "../../store/action/channel";

export const ChannelList = () => {
  useFirebaseConnect([{ path: "channels" }]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted && !isEmpty(channels)) {
      const { key, value } = channels[0];
      setActiveChannel({ key, ...value });
      setMounted(true);
    }
  });

  const channels = useSelector((state) => state.firebase.ordered.channels);
  const currentChannel = useSelector((state) => {
    return state.channels.currentChannel;
  });
  const dispatch = useDispatch();

  const setActiveChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  if (!isLoaded(channels)) {
    return (
      <ul>
        <li>Loading channels...</li>
      </ul>
    );
  }

  if (isEmpty(channels)) {
    return (
      <ul>
        <li>No Channel</li>
      </ul>
    );
  }
  return (
    <ul>
      {channels.map(({ key, value }) => {
        return (
          <li
            className={currentChannel?.key === key ? "active" : null}
            onClick={() => {
              setActiveChannel({ key, ...value });
            }}
            key={key}
          >
            <span>{value.name}</span>
            <Hashtag></Hashtag>
          </li>
        );
      })}
    </ul>
  );
};
