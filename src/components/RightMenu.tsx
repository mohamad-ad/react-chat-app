import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

export default function RightMenu() {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  return (
    <List sx={{width:{xs:'250px',md:'auto'}}}>
      <ListItem>
        <ListItemButton
          onClick={() => {
            navigate("/");
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={() => {
            logout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
