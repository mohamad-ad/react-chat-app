import React from 'react'
import {styled, Stack} from '@mui/material'
import { IMessage } from '../interfaces';
import { useAuthContext } from '../contexts/AuthContext';
import { useUsersContext } from '../contexts/UsersContext';

interface IProps{
  owner:boolean,
  message: IMessage
}

export default function Message({owner, message}:IProps) {
  const {user} = useAuthContext();
  const {selectedUser} = useUsersContext();
    const Message = styled("div")(({ theme }) => ({
        display: "flex",
        gap:'10px',
        flexDirection:owner? 'row-reverse':"row",
        // border: "1px solid",
        alignItems: "flex-start",
        
        
      }));
      
      const MessageText = styled("span")(({ theme }) => ({
        padding: "5px 15px",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: owner?"15px 0px 15px 15px":"0 15px 15px 15px",
        maxWidth: "300px",
        backgroundColor:owner ? theme.palette.primary.main:'',
       color:owner ? theme.palette.background.default:'',
       alignSelf:owner ? 'flex-end':'flex-start',
       minWidth:'100px',
       textAlign:'center'
        
      
      }));
      const MessageImg = styled('img')(({ theme }) => ({
        maxHeight:'300px',
        maxWidth: "200px",
        borderRadius: owner?"15px 0px 15px 15px":"0 15px 15px 15px",
        backgroundColor:owner ? theme.palette.primary.main:'',
       color:owner ? theme.palette.background.default:'',
        
      
      }));
  return (
    <Message>
          <img
            style={{ objectFit:'cover',width: "35px", height: "35px", borderRadius: "50%" }}
            src={(owner ? user?.photoURL:selectedUser?.photoURL) || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'}
            alt="avatar"
          />
          <Stack direction='column'  gap={'10px'} >
            {message.text && <MessageText className="owner"> {message.text}</MessageText>}
            
            {message.photoURL && <MessageImg src={message.photoURL}/>}

          </Stack>
        </Message>
  )
}
