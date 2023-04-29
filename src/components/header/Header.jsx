import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ActionButtons from "./ActionButtons";
import { useAuthContext } from "../../contexts/auth";

const getUsername = email => email ? email.split('@')[0] : '';

const Header = (props) => {
  const { openShareDialog, openAuthDialog } = props;
  const { user } = useAuthContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography role="heading" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Funny Movies
        </Typography>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          {`Welcome ${getUsername(user?.email)}`}
        </Typography>
        <ActionButtons
          openShareDialog={openShareDialog}
          openAuthDialog={openAuthDialog}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
