import { User } from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { IContact, IUser } from "../interfaces";

interface IUsersContext {
  addUserToDB: (user: User) => Promise<void>;
  searchByName(name: string): Promise<QuerySnapshot<DocumentData>>,
  selectUser(uid: string): Promise<void>,
  selectedUser: IUser | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  getUserContacts(uid: string): Promise<DocumentSnapshot<DocumentData>>,
  getUser(uid: string): Promise<DocumentSnapshot<DocumentData>>,
  updateUser(user: User): Promise<void>
}

const UsersContext = createContext({} as IUsersContext);
export const useUsersContext = () => useContext(UsersContext);

export const UsersContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [selectedUser, setSelectedUser] = useState<IUser|null>(null);
  
  const addUserToDB = async (user: User) => {
    console.log(user);
    const docRef = doc(db, "users", user.uid);
    const { uid, displayName, email, photoURL } = user;
    const newUser: IUser = {
      uid,
      displayName,
      email,
      photoURL,
    };
    const userDoc = await getDoc(docRef);
    if (userDoc.exists()) return;
    setDoc(doc(db, 'userContacts', user.uid),{
      contacts:[]
    })
    return setDoc(docRef, newUser);
  };

    function searchByName(name: string) {
    const q = query(collection(db, "users"), where("displayName", "==", name));
    return getDocs(q);
  }

  async function selectUser(uid:string){
    const userDoc = await getDoc(doc(db, 'users',uid ))
    const user= userDoc.data() as IUser;
    setSelectedUser(user)
  }
  function getUserContacts(uid:string ){
    return getDoc(doc(db, 'userContacts', uid))
  }
  function getUser(uid:string){
    return getDoc(doc(db, 'users', uid));
  } 

  async function updateUser(user:User){
    const docRef = doc(db, "users", user.uid);
    const { uid, displayName, email, photoURL } = user;
    const userDoc = await getDoc(docRef);
    if (!userDoc.exists()) return;
    updateDoc(docRef, {
      displayName,
      photoURL
    })
  }
  
  
  const value = {
    addUserToDB,
    searchByName,
    selectUser,
    selectedUser,
    setSelectedUser,
    getUserContacts,
    getUser,
    updateUser
  };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
