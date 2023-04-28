import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const AuthDialog = (props) => {
  const { open, handleClose, onSubmit } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const internalSubmit = async data => {
    console.log(data);
    if (tabValue === 0) {
      await onSubmit('register', data);
      handleClose();
    } else if (tabValue === 1) {
      await onSubmit('login', data);
      handleClose();
    } else {
      // Invalid state
    }
  };

  const actionLabel = tabValue === 0 ? 'Register' : 'Login';

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sign in</DialogTitle>
      <Box sx={{ width: '100%' }}>
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
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                variant="standard"
                fullWidth
                type="text"
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                variant="standard"
                fullWidth
                type="password"
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{actionLabel}</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
};

export default AuthDialog;