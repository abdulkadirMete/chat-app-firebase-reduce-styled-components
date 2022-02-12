import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase, useFirebaseConnect } from "react-redux-firebase";
import styled from "styled-components";
import { Hashtag, Search } from "styled-icons/fa-solid";
import { Add } from "styled-icons/fluentui-system-filled";
import uniqid from "uniqid";
import { colors } from "../styles/Variable";
import { Message } from "./Message";

export const ChatPanel = ({ currentChannel }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  useFirebaseConnect([
    {
      path: `messages/${currentChannel.key}`,
      storeAs: "channelMessages",
    },
  ]);

  const channelMessages = useSelector(
    (state) => state.firebase.ordered.channelMessages
  );

  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const currentUserUid = useSelector((state) => state.firebase.auth.uid);
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content !== "") {
      const message = {
        content,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: profile.name,
          avatar: profile.avatar,
          id: currentUserUid,
        },
      };

      console.log(message);

      firebase.push(`messages/${currentChannel.key}`, message).then(() => {
        setContent("");
      });
    }
  };

  const uploadMedia = (e) => {
    const file = e.target.files[0];

    if (file) {
      const storageRef = firebase.storage.ref();
      const fileRef = storageRef.child(`chat/public/${uniqid()}.jpg`);
      return fileRef
        .put(file)
        .then((snap) => {
          fileRef.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
          });
        })
        .catch((err) => console.error("error uploading file", err));
    }
  };

  const filterMessages = () => {
    const regex = new RegExp(searchTerm, "gi");

    const searchResults = [...channelMessages]?.reduce((acc, message) => {
      console.log(message);
      if (
        (message.value.content && message.value.content.match(regex)) ||
        (message.value.user.name && message.value.user.name.match(regex))
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    return searchResults;
  };

  const renderedMessages =
    searchTerm === "" ? channelMessages : filterMessages();

  return (
    <StyledPanel>
      <header>
        <div className="label">
          <Hashtag></Hashtag>
          <h3>{currentChannel.name}</h3>
        </div>

        <div className="search">
          <input
            type="text"
            className="input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Mesajlarda Ara"
          />
          <Search />
        </div>
      </header>

      <section className="container">
        {renderedMessages?.map(({ key, value }) => {
          return <Message key={key} message={value}></Message>;
        })}
      </section>

      <div className="add-message">
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            <Add></Add>
            <input
              type="file"
              name="file"
              onChange={uploadMedia}
              ref={fileInputRef}
            ></input>
          </button>
          <input
            type="text"
            className="input"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
            placeholder={`#${currentChannel.name} kanalına mesaj gönder`}
          />
        </form>
      </div>
    </StyledPanel>
  );
};

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;

  header {
    padding: 1rem;
    height: 4rem;
    box-shadow: 0 2px 0 #ccc;
    background-color: ${colors.colorLighterGray};
    display: flex;
    justify-content: space-between;
    align-items: center;

    .label {
      display: flex;

      h3 {
        text-transform: capitalize;
        margin-left: 0.5rem;
      }
    }

    .search {
      position: relative;

      .input {
        border: 1px solid ${colors.colorLighterPurple};
        padding-right: 2rem;
        padding-left: 0.5rem;
        &:focus {
          outline-color: ${colors.colorLighterPurple};
        }
      }

      svg {
        position: absolute;
        top: 50%;
        right: 0.5rem;
        color: ${colors.colorDarkerGray};
        transform: translateY(-50%);
      }
    }
  }
  /* Message-Container */

  .container {
    flex: 1;
  }

  /* Add Message */
  .add-message {
    padding: 1rem;
    height: 4rem;
    box-shadow: 0 -2px 0 #ccc;
    background-color: ${colors.colorLighterGray};

    form {
      display: flex;

      button {
        padding: 0 0.5rem;
      }

      input {
        flex: 1;
        margin-left: 1rem;
        padding-left: 0.5rem;
      }
    }
  }

  input[type="file"] {
    display: none;
  }
`;
