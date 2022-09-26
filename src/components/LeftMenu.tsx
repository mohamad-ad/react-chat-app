import React, {useRef, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  styled,
  alpha,
  Divider,
  Avatar,
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useUsersContext } from "../contexts/UsersContext";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useChatsContext } from "../contexts/ChatsContext";
import { useAuthContext } from "../contexts/AuthContext";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  
  const StyledInputBase = styled("input")(({ theme }) => ({
    color: "inherit",
    border:'none',
    outline:'none',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  
  }));

export default function LeftMenu() {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<DocumentData[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const { searchByName, selectUser } = useUsersContext();
  const {selectChat} = useChatsContext();
  const {user} = useAuthContext();

  async function handleSearch(
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const searchQuery: string = searchRef.current?.value || "";
    if(searchQuery.length === 0){
      setSearchResults([]);
    }
    if (e.code == "Enter") {
      
      
      if (searchQuery?.length > 0) {
        setSearchResults([]);
        setLoading(true);
        try {
          const docs = await searchByName(searchQuery);
          docs.forEach(doc=>{
            if(doc.data().uid !== user?.uid)
            setSearchResults(prev => [...prev, doc.data()])
          })
        } catch {
          console.log("something wents wrong");
        } finally {
          setLoading(false);
        }
      }
    }
  }

  function handleSelect(uid:string){
    selectUser(uid);
    setSearchResults([]);
    user && selectChat(user.uid, uid);
  }

  return (
    <List sx={{width:{xs:'250px',md:'auto'}}}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase   
            placeholder="Search…"
            ref={searchRef}
            onKeyDown={handleSearch}
          />
        </Search>
        {searchResults?.map((user) => (
          <ListItem key={user.uid}>
            <ListItemButton onClick={()=>handleSelect(user.uid)}>
              <ListItemAvatar>
                <Avatar src={user.photoURL} sx={{width:'35px', height:'35px'}}/>
              </ListItemAvatar>
              <ListItemText><Typography textTransform={'capitalize'}>{user.displayName}</Typography></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
        <Divider variant="middle" sx={{ color: "black" }} />
      </List>
  )
}
