import React, { useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import LeftMenu from "./LeftMenu";

interface IProps {
  openLeft: boolean;
  setOpenLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LeftDrawer({ openLeft, setOpenLeft }: IProps) {
  const [searchResults, setSearchResults] = useState<DocumentData[]>([]);

  function handleOpen() {
    setOpenLeft(true);
  }

  function handleClose() {
    setOpenLeft(false);
    setSearchResults([]);
  }

  return (
    <SwipeableDrawer
      sx={{
        display: {
          md: "none",
        },
      }}
      anchor={"left"}
      open={openLeft}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <LeftMenu />
    </SwipeableDrawer>
  );
}
