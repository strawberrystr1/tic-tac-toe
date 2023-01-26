import { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { IChalendegDialogProps } from '../../../types/searchPage';

export const ChalengedDialog: FC<IChalendegDialogProps> = ({
  open,
  closeHandler,
  acceptHandler,
}) => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let timerId: NodeJS.Timer;

    if (open) {
      timerId = setInterval(() => {
        setTimer(prev => {
          if (prev <= 0) {
            clearInterval(timerId);
            return 10;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [open]);

  useEffect(() => {
    if (timer <= 0) {
      closeHandler();
    }
  }, [timer]);

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>{"You've been challenged for a match"}</DialogTitle>
      <DialogContent>{timer} seconds left</DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} variant="contained" color="error">
          Decline match
        </Button>
        <Button onClick={acceptHandler} variant="contained" color="success">
          Accept match
        </Button>
      </DialogActions>
    </Dialog>
  );
};
