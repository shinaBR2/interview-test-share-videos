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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const AuthDialog = (props) => {
  const { open, handleClose, onSubmit } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  console.log(errors)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const internalSubmit = async data => {
    console.log(data);
    if (tabValue === 0) {
      setIsSubmitting(true);
      await onSubmit('register', data);
      setIsSubmitting(false);
      handleClose();
    } else if (tabValue === 1) {
      setIsSubmitting(true);
      await onSubmit('login', data);
      setIsSubmitting(false);
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
                error={!!errors['username']}
                helperText={errors['username']?.message}
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
                error={!!errors['password']}
                helperText={errors['password']?.message}
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>{actionLabel}</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
};

export default AuthDialog;