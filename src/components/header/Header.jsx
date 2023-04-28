import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ActionButtons from "./ActionButtons";

const Header = (props) => {
  const { openShareDialog, openAuthDialog } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Funny Movies
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
