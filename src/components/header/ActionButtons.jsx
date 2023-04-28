import { Box, Button } from "@mui/material";
import { useAuthContext } from "../../contexts/auth";

const ActionButtons = (props) => {
  const { openShareDialog, openAuthDialog } = props;
  const authContext = useAuthContext();
  const { isSignedIn, logOut } = authContext;

  if (isSignedIn) {
    return (
      <Box>
        <Button color="inherit" onClick={openShareDialog}>
          Share video
        </Button>
        <Button color="inherit" onClick={logOut}>
          Sign out
        </Button>
      </Box>
    );
  }

  return (
    <Button color="inherit" onClick={openAuthDialog}>
      Sign in
    </Button>
  );
};

export default ActionButtons;
