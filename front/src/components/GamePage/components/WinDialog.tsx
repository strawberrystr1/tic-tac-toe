import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { IWinDialogProps } from './types';

export const WinDialog: FC<IWinDialogProps> = ({ open, message, closeHandler }) => {
  const splited = message.split('\n');

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>{splited[0]}</DialogTitle>
      <DialogContent>{splited[1]}</DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
