import React, { useEffect, useState } from "react";
import { Stack, Avatar, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IContact, IMessage, IUser } from "../interfaces";
import { useChatsContext } from "../contexts/ChatsContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useUsersContext } from "../contexts/UsersContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Contact({ contact }: { contact: IContact }) {
  const [lastMessage, setLastMessage] = useState<IMessage | null>(null);
  const [contactUser, setContactUser] = useState<IUser | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { selectChat, selectedChat, getChat } = useChatsContext();
  const { user } = useAuthContext();
  const { selectUser, getUser } = useUsersContext();
  function handleSelect() {
    user && selectChat(user?.uid, contact.uid);
    selectUser(contact.uid);
  }

  useEffect(() => {
    if (user) {
      const chatId =
        user.uid > contact.uid
          ? user.uid + contact.uid
          : contact.uid + user.uid;
      const unsub = onSnapshot(doc(db, "chats", chatId), (chatDoc) => {
        if (chatDoc?.exists()) {
          console.log("sub");
          setLastMessage(chatDoc.data().lastMessage);
        }
      });
      return () => {
        console.log("unsub");
        unsub();
      };
    }
  }, []);
  useEffect(()=>{
    (async ()=>{
      const userDoc = await getUser(contact.uid);
      if(userDoc.exists()){
        setContactUser(userDoc.data() as IUser)
      }
    })()
    

  },[])

  return (
    <>
      <Stack
        direction={"row"}
        gap="10px"
        sx={{
          width: "90%",
          backgroundColor: "background.paper",
          borderBottom: "3px solid",
          borderColor: "primary.main",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          maxWidth: '600px'
        }}
        onClick={handleSelect}
      >
        <Avatar
          sx={{ width: "40px", height: "40px" }}
          src={contactUser?.photoURL || undefined}
        />
        <Stack direction="column">
          <Typography variant="body1" textTransform={"capitalize"}>
            {contactUser?.displayName}
          </Typography>

          <Typography fontSize={"14px"}>
            {lastMessage && ((lastMessage?.senderId === user?.uid ? "me : " : "") +
              lastMessage?.text )|| ""}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: "10px", mr: 1, ml: "auto" }}>
          Time
        </Typography>
      </Stack>
    </>
  );
}
