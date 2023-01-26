import { FC, memo } from 'react';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { IProps } from '../../../types/searchPage';

import { Block, Wrapper } from './styled';

const EnemyItem: FC<IProps> = ({ user, notifyEnemy }) => {
  const clickHandler = () => {
    notifyEnemy(user.id);
  };

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
