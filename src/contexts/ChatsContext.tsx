import { uuidv4 } from "@firebase/util";
import { User } from "firebase/auth";
import _ from 'lodash'
import { arrayUnion, collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { IChat, IContact, IMessage, IUser } from "../interfaces";
interface IChatsContext {
  setSelectedChat: React.Dispatch<React.SetStateAction<IChat | null>>;
  selectedChat: IChat | null;
  selectChat(uid: string, selectedUserId: string): Promise<void>,
  createChat(user: User, selectedUser: IUser): Promise<void>,
  sendMessage(chatId: string, senderId: string, text: string | null, photoURL: string | null): Promise<void>,
  getChat(uid: string, selectedUserId: string): Promise<DocumentSnapshot<DocumentData>>,
 
}
const ChatsContext = createContext({} as IChatsContext);

export function useChatsContext() {
  return useContext(ChatsContext);
}

export function ChatsContextProvider({ children }: { children: JSX.Element }) {
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  
  async function createChat(user:User, selectedUser:IUser) {
    const chatId =
     user.uid > selectedUser.uid ? user.uid + selectedUser.uid : selectedUser.uid + user.uid;
    const chat: IChat = {
      chatId,
      lastMessage:null,
      messages: [],
    };
    await setDoc(doc(db, "chats", chatId), chat);
    const userContact:IContact={
      uid:selectedUser.uid,
      displayName: selectedUser.displayName,
      photoURL:selectedUser.photoURL,
      lastMessage:null
    }
    await updateDoc(doc(db, 'userContacts', user.uid),{
      contacts:arrayUnion(userContact)
    })
    const selectedUserContact:IContact={
      uid:user.uid,
      displayName: user.displayName,
      photoURL:user.photoURL,
      lastMessage:null
    }
    await updateDoc(doc(db, 'userContacts', selectedUser.uid),{
      contacts:arrayUnion(selectedUserContact)
    })

    setSelectedChat(chat);
  }
  async function selectChat(uid: string, selectedUserId: string) {
    const chatId =
      uid > selectedUserId ? uid + selectedUserId : selectedUserId + uid;
    console.log(chatId);
    const chatDoc = await getDoc(doc(db, "chats", chatId));
    if (chatDoc.exists()) {
      const chat = chatDoc.data() as IChat;
      setSelectedChat(chat);
    } else {
      setSelectedChat(null);
    }
  }
  async function sendMessage(chatId:string,senderId:string, text:string|null, photoURL:string|null){
    const message:IMessage ={
      messageId: uuidv4(),
      photoURL,
      text,
      senderId,
      timeStamp:new Date(),
    }
    
    return updateDoc(doc(db, 'chats', chatId), {
      lastMessage:message,
      messages:arrayUnion(message)
    })
  }
  function getChat(uid:string, selectedUserId:string){
    const chatId =
      uid > selectedUserId ? uid + selectedUserId : selectedUserId + uid;
    return getDoc(doc(db, 'chats', chatId))
  }

  useEffect(()=>{
    if(selectedChat){
      const unsub = onSnapshot(doc(db, 'chats', selectedChat?.chatId),(chatDoc)=>{
        
        setSelectedChat(chatDoc.data() as IChat);
      });
      return ()=>{
        console.log('unsub');
        unsub();
      };
  }
  },[selectedChat?.chatId])
  

  

  const value = {
    setSelectedChat,
    selectedChat,
    createChat,
    selectChat,
    sendMessage,
    getChat,
    
  };
  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
}
