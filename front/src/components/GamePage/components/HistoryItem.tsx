import { FC } from 'react';
import { Typography } from '@mui/material';

import { IStep } from '../../../types/gamePage';

import { HistoryItem } from './styled';
import { IHistoryElementProps } from './types';

export const HistoryElement: FC<IHistoryElementProps> = ({ step, clickHandler }) => {
  const handleClick = (itemStep: IStep) => () => {
    if (clickHandler) {
      clickHandler(itemStep);
    } else {
      return;
    }
  };

  return (
    <HistoryItem
      key={step.cell.join()}
      sx={{ border: '1px solid black', borderTop: 'none', mt: '5px' }}
      onClick={handleClick(step)}
    >
      <Typography component="span" fontWeight={600}>
        {step.user}{' '}
      </Typography>
      moved to
      <Typography component="span" fontWeight={600}>
        {' '}
        {`[${step.cell.join(',')}]`}{' '}
      </Typography>
      with
      <Typography component="span" fontWeight={600}>
        {' '}
        {`${step.icon === 1 ? '"X"' : '"O"'}`}
      </Typography>
    </HistoryItem>
  );
};
