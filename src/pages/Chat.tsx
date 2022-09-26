import React, { useRef, useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

import { BsFillPlusCircleFill } from "react-icons/bs";
import {
  IconButton,
  InputBase,
  Stack,
  TextField,
  styled,
  Typography,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";
import Contacts from "./Contacts";
import { useChatsContext } from "../contexts/ChatsContext";
import { useUsersContext } from "../contexts/UsersContext";

const ChatBody = styled(Stack)({
  // border:'1px solid',
  flexDirection: "column",
  gap: "10px",
  height: "calc(100vh - 120px)",
  padding: "20px 10px",
  overflow: "scroll",
});
const ChatInputs = styled("form")(({ theme }) => ({
  display: "flex",

  height: "60px",
  backgroundColor: theme.palette.primary.main,
  flexDirection: "row",
  alignItems: "center",
  padding: "0 10px",
}));

export default function Chat() {
  const textInputRef = useRef<HTMLInputElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const { selectedChat, createChat, sendMessage } = useChatsContext();
  const { selectedUser } = useUsersContext();
  const { user } = useAuthContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const messageText = textInputRef.current?.value || null;
    if (textInputRef.current) textInputRef.current.value = "";

    if (messageText) {
      if (selectedChat && user) {
        try {
          await sendMessage(selectedChat?.chatId, user?.uid, messageText, null);
        } catch {
          setError("somethign went wrong");
        }
      }
    }
  }

  function handleStart() {
    if (selectedUser && user) {
      createChat(user, selectedUser);
    }
  }
  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [selectedChat]);
  return (
    <Stack
      direction={"column"}
      sx={{
        maxWidth: "600px",
        m: "auto",
        backgroundColor:'grey.200'
      }}
    >
      <ChatBody ref={chatBodyRef}>
        {selectedChat?.messages.map((message) => {
          const owner = message.senderId === user?.uid;
          return (
            <Message key={message.messageId} owner={owner} message={message} />
          );
        })}
      </ChatBody>
      {selectedChat ? (
        <ChatInputs onSubmit={handleSubmit}>
          <input
            placeholder="message"
            ref={textInputRef}
            style={{
              padding: "0 10px",
              flex: 1,
              height: "75%",
              borderRadius: "10px",
              outline: "none",
              border: "none",
            }}
          />
          <IconButton type="submit">
            <SendIcon sx={{ color: "background.default" }} />
          </IconButton>
        </ChatInputs>
      ) : (
        <ChatInputs>
          <Button
            variant="outlined"
            sx={{ m: "auto", color: "background.paper", width: "100%",height:'100%' }}
            onClick={handleStart}
          >
            start Chat
          </Button>
        </ChatInputs>
      )}
    </Stack>
  );
}
