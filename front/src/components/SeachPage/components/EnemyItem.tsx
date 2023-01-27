import { FC, memo } from 'react';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { IProps } from '../../../types/searchPage';

import { Wrapper } from './styled';

const EnemyItem: FC<IProps> = ({ user, notifyEnemy }) => {
  const clickHandler = () => {
    notifyEnemy(user.id);
  };

  return (
    <Wrapper>
      <Typography>
        <Typography component="span" fontWeight={600}>
          ID:
        </Typography>{' '}
        {user.id}
      </Typography>
      <Typography>
        <Typography component="span" fontWeight={600}>
          User:
        </Typography>{' '}
        {user.name}
      </Typography>
      <Typography>
        <Typography component="span" fontWeight={600}>
          User rating:
        </Typography>{' '}
        {user.rating}
      </Typography>
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
