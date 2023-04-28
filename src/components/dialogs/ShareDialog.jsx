import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';

const ShareDialog = (props) => {
  const { open, handleClose, onSubmit } = props;
  const { control, handleSubmit, formState: { errors } } = useForm();

  const internalSubmit = async (data) => {
    const { url } = data;
    await onSubmit(url);
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Share a movie</DialogTitle>
      <form onSubmit={handleSubmit(internalSubmit)}>
        <DialogContent>
          <Controller
            name="url"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="url"
                label="Movie URL"
                type="text"
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Share</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
};

export default ShareDialog;