import React from "react";
import { SwipeableDrawer } from "@mui/material";
import RightMenu from "./RightMenu";

export default function RightDrawer({
  openRight,
  setOpenRight,
}: {
  openRight: boolean;
  setOpenRight: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <SwipeableDrawer
      sx={{
        display: {
          md: "none",
        },
      }}
      anchor={"right"}
      open={openRight}
      onClose={() => setOpenRight(false)}
      onOpen={() => setOpenRight(true)}
    >
      <RightMenu />
    </SwipeableDrawer>
  );
}
