import { FC } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { HistoryItem, HistoryWrapper } from './styled';
import { IHistoryProps } from './types';

export const HistoryBlock: FC<IHistoryProps> = ({ steps }) => {
  return (
    <HistoryWrapper>
      <Typography component="h2" fontSize={22} fontWeight={600}>
        History
      </Typography>
      <Box>
        {steps.map(step => (
          <HistoryItem
            key={step.cell.join()}
            sx={{ border: '1px solid black', borderTop: 'none', mt: '5px' }}
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
        ))}
      </Box>
    </HistoryWrapper>
  );
};
