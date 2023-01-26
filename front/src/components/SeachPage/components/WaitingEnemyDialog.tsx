import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';

import { IWaitingForEnemyProps } from '../../../types/searchPage';
import { Loader } from '../../Loader';

export const WaitingEnemyDialog: FC<IWaitingForEnemyProps> = ({ open, closeHandler }) => {
  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>{'Waiting for enemy acception'}</DialogTitle>
      <DialogContent>
        <Loader />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} variant="contained" color="error">
          Decline match
        </Button>
      </DialogActions>
    </Dialog>
  );
};
