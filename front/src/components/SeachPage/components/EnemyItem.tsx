import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { IProps } from '../../../types/searchPage';
import { getCurrentUser } from '../../../utils/utils';

import { Block, Wrapper } from './styled';

const EnemyItem: FC<IProps> = ({ user }) => {
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const clickHandler = () => navigate(`/game/${user.id}-vs-${currentUser.id}`);

  return (
    <Wrapper>
      <Block>
        <Typography>User: {user.name}</Typography>
        <Typography>ID: {user.id}</Typography>
      </Block>
      <Button
        sx={{ width: '120px', alignSelf: 'flex-end' }}
        onClick={clickHandler}
        variant="contained"
        size="small"
      >
        Challenge
      </Button>
    </Wrapper>
  );
};

export default memo(EnemyItem);
