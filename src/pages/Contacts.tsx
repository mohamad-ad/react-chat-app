import React, { useEffect, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import Contact from "../components/Contact";
import { useUsersContext } from "../contexts/UsersContext";
import { useAuthContext } from "../contexts/AuthContext";
import { IContact } from "../interfaces";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";

export default function Contacts() {
  const [userContacts, setUserContacts] = useState<IContact[] | null>(null);
  const { getUserContacts } = useUsersContext();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      (async () => {
        const userContactsDoc = await getUserContacts(user.uid);
        if (userContactsDoc.exists()) {
          setUserContacts(userContactsDoc.data().contacts as IContact[]);
        }
      })();
    }
  }, []);
  return (
    <>
      <Stack direction="row">
        <Box sx={{ display: { xs: "none", md: "block" }, flex:'1' }}>
          <LeftMenu />
        </Box>
        <Stack
          sx={{
            gap: "8px",
            backgroundColor: "grey.200",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "20px 0",
            overFlow: "scroll",
            height: "calc(100vh - 60px)",
            flex:'3'
          }}
        >
          {!userContacts && <Typography>loading...</Typography>}

          {userContacts?.length !== 0 ? (
            userContacts?.map((contact) => (
              <Contact key={contact.uid} contact={contact} />
            ))
          ) : (
            <Typography>No contacts yet</Typography>
          )}
        </Stack>
        <Box sx={{ display: { xs: "none", md: "block" } ,flex:'1'}}>
          <RightMenu />
        </Box>
      </Stack>
    </>
  );
}
