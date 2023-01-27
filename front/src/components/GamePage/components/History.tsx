import { FC } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { HistoryElement } from './HistoryItem';
import { HistoryWrapper } from './styled';
import { IHistoryProps } from './types';

export const HistoryBlock: FC<IHistoryProps> = ({ steps }) => {
  return (
    <HistoryWrapper>
      <Typography component="h2" fontSize={22} fontWeight={600}>
        History
      </Typography>
      <Box>
        {steps.map(step => (
          <HistoryElement step={step} key={step.cell.join()} />
        ))}
      </Box>
    </HistoryWrapper>
  );
};
