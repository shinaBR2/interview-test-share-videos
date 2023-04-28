import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ShareDialog = (props) => {
  const { open, handleClose, onSubmit } = props;

  const handleSubmit = () => {
    // TODO
    const url = '';
    onSubmit(url);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Share a movie</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="movieURL"
          label="Movie URL"
          type="text"
          fullWidth
          variant="standard"
          name="movieURL"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Share</Button>
      </DialogActions>
    </Dialog>
  )
};

export default ShareDialog;