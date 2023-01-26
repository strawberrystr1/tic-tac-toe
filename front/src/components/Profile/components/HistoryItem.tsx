import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { TopBlock, Wrapper } from './styled';
import { IHistoryItemProps } from './types';

export const HistoryItem: FC<IHistoryItemProps> = ({ history, currentUser }) => {
  const navigate = useNavigate();

  const { steps, winner, gameId, users } = history;

  const handleClick = () => {
    navigate(`/history/${gameId}`, { state: { steps, currentUser, user: users[0] } });
  };

  return (
    <Wrapper>
      <TopBlock>
        <Box>
          <Typography fontSize={20} align="center">
            {currentUser.name}
          </Typography>
          {winner > 0 && (
            <Typography align="center" color={currentUser.id === winner ? 'green' : 'red'}>
              {currentUser.id === winner ? 'WIN' : 'LOSE'}
            </Typography>
          )}
        </Box>
        {winner < 0 && (
          <Typography fontSize={20} align="center" color="#f88603">
            Draw
          </Typography>
        )}
        <Box>
          <Typography fontSize={20} align="center">
            {users[0].name}
          </Typography>
          {winner > 0 && (
            <Typography align="center" color={users[0].id === winner ? 'green' : 'red'}>
              {users[0].id === winner ? 'WIN' : 'LOSE'}
            </Typography>
          )}
        </Box>
      </TopBlock>
      <Button
        onClick={handleClick}
        variant="contained"
        size="small"
        sx={{ width: 100, alignSelf: 'flex-end' }}
      >
        View more
      </Button>
    </Wrapper>
  );
};
