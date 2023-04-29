import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Alert, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const AuthDialog = (props) => {
  const { open, handleClose, onSubmit } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onClose = () => {
    setIsError(false);
    setIsSubmitting(false);
    setErrorMessage("");
    handleClose();
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const internalSubmit = async (data) => {
    const allowedValues = [0, 1];

    if (allowedValues.indexOf(tabValue) === -1) {
      return;
    }

    setIsSubmitting(true);
    const action = tabValue === 0 ? "register" : "login";
    const res = await onSubmit(action, data);
    const { error } = res || {};

    setIsSubmitting(false);

    if (error) {
      setIsError(true);
      setErrorMessage(error.message);

      return;
    }

    setIsError(false);
    setErrorMessage("");
    onClose();
  };

  const actionLabel = tabValue === 0 ? "Register" : "Login";

  return (
    <Dialog open={open} onClose={onClose} keepMounted={true}>
      <DialogTitle>Sign in</DialogTitle>
      <Box sx={{ width: "100%" }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Register" />
          <Tab label="Login" />
        </Tabs>
      </Box>
      <form onSubmit={handleSubmit(internalSubmit)}>
        <DialogContent>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                variant="standard"
                fullWidth
                type="text"
                error={!!errors["username"]}
                helperText={errors["username"]?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                variant="standard"
                fullWidth
                type="password"
                error={!!errors["password"]}
                helperText={errors["password"]?.message}
              />
            )}
          />
          {!!isError && (
            <Alert variant="filled" severity="error">
              {errorMessage}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button role="button" type="submit" disabled={isSubmitting}>
            {actionLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AuthDialog;
