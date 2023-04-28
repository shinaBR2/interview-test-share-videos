import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AuthDialog = () => {
  const { open, handleClose, onSubmit } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = () => {
    if (value === 0) {
      // TODO register
      onSubmit('register');
    } else if (value === 1) {
      // TODO login
      onSubmit('login');
    } else {
      // Invalid state
    }
  }

  const actionLabel = value === 0 ? 'Register' : 'Login';

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sign in</DialogTitle>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Register" />
          <Tab label="Login" />
        </Tabs>
      </Box>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          name="username"
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="password"
          type="password"
          fullWidth
          variant="standard"
          name="password"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{actionLabel}</Button>
      </DialogActions>
    </Dialog>
  )
};

export default AuthDialog;