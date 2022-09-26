import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RightDrawer from "./RightDrawer";
import LeftDrawer from "./LeftDrawer";
import { useAuthContext } from "../contexts/AuthContext";
import { useUsersContext } from "../contexts/UsersContext";
import { useChatsContext } from "../contexts/ChatsContext";
import { IconButton, Avatar, Typography, Stack,AppBar, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import ForumIcon from "@mui/icons-material/Forum";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';

const Appbar = () => {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { selectedUser, setSelectedUser } = useUsersContext();
  const { setSelectedChat } = useChatsContext();

  function handleBack() {
    setSelectedUser(null);
    setSelectedChat(null);
  }

  return (
    <>
      <AppBar position="sticky" sx={{ height: "60px" }}>
        {user && selectedUser ? (
          <Toolbar sx={{ maxWidth: "600px", margin: "auto", width: "100%" }}>
            <IconButton
              sx={{ borderRadius: "20px ", padding: "5px 5px"}}
              color="inherit"
              onClick={handleBack}
            >
              <ArrowBackIcon />
              <Avatar
                alt="user-avatar"
                sx={{ width: "35px", height: "35px", ml: "10px",backgroundColor:'background.paper' }}
                src={selectedUser.photoURL || undefined}
              />
            </IconButton>
            <Typography textTransform={"capitalize"}>
              {selectedUser.displayName}
            </Typography>
            <IconButton
              color="inherit"
              sx={{ml:'auto'}}
            >
              <MoreVertIcon/>
            </IconButton>
          </Toolbar>
        ) : (
          <Toolbar
            disableGutters
            style={{ width: "100%", padding: "10px", gap: "10px" }}
          >
            {user?.displayName ? (
              <Stack direction="row" gap="10px" sx={{ flex: "1" , width:'100%'}}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{ borderRadius: "20px ", ml: "5px", padding: "5px 10px" }}
                  onClick={() => navigate("/update")}
                >
                  <Avatar
                    src={user.photoURL || undefined}
                    sx={{
                      width: "35px",
                      height: "35px",
                      mr: "10px",
                      backgroundColor: "background.paper",
                    }}
                  />
                  <Typography textTransform={"capitalize"}>
                    {user.displayName}
                  </Typography>
                </IconButton>

                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  onClick={() => setOpenLeft(true)}
                  sx={{ display: { md: "none" } }}
                >
                  <SearchIcon />
                </IconButton>

                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  
                  onClick={() => navigate("/")}
                >
                  <ForumIcon />
                </IconButton>

                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{
                    mr: 0,
                    ml: "auto",
                    display: {
                      md: "none",
                    },
                  }}
                  onClick={() => setOpenRight(true)}
                >
                  <MenuIcon />
                </IconButton>
                <IconButton
                  color='inherit'
                  size='large'
                  sx={{ml:'auto'}}
                >
                  <SettingsIcon />
                </IconButton>
              </Stack>
            ) : (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{ ml: 1, mr: 1 }}
                  onClick={() => navigate("/login")}
                >
                  <LoginIcon />
                </IconButton>
                <IconButton
                  sx={{ mr: 2, ml: "auto", color: "primary.contrastText" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <HomeIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        )}
      </AppBar>

      <RightDrawer openRight={openRight} setOpenRight={setOpenRight} />
      <LeftDrawer openLeft={openLeft} setOpenLeft={setOpenLeft} />
    </>
  );
};
export default Appbar;
