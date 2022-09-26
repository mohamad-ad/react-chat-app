import { User } from "firebase/auth";



export interface IUser{
    uid:User['uid']
    displayName:User['displayName'],
    email:User['email'],
    photoURL:User['photoURL'],
    
}

// export interface IContacts{
//     uid:IContact
// }
export interface IContact{
    uid:User['uid'],
    displayName:User['displayName'],
    photoURL:User['photoURL'],
    lastMessage:string|null,
}

export interface IMessage{
    messageId: string,
    senderId:string,
    text:string | null,
    photoURL:string | null,
    timeStamp:Date
}
export interface IChat{
    chatId:string,
    lastMessage:string | null,
    messages:IMessage[]
}
