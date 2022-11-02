import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_CHATROOM } from "../utils/queries";
import { POST_MESSAGE_TO_CHATROOM } from "../utils/mutations";

const ChatRoom = () => {
  const { roomId } = useParams();

  const { loading, data } = useQuery(GET_SINGLE_CHATROOM, {
    variables: { roomId: roomId },
  });

  const chatRoom = data?.chatRoom || {};

  function MessageEditor() {
    const [post] = useMutation(POST_MESSAGE_TO_CHATROOM);
    const [value, setValue] = useState("");
    function handleChange(e) {
      setValue(e.target.value);
    }
    console.log(roomId);
    async function handleSubmit(e) {
      e.preventDefault();
      await send(value);
      setValue("");
    }
    async function send(messageText) {
      await post({ variables: { roomId, messageText } });
    }
    return (
      <form id="form" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          id="input"
          autoComplete="off"
        />
        <button>send</button>
      </form>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{chatRoom.roomName}</h2>
      <MessageEditor />
    </div>
  );
};

export default ChatRoom;
