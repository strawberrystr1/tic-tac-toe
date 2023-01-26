import { FC, memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

import { Cell } from './styled';
import { ICellProps } from './types';

const cellIcons = {
  1: <CloseIcon fontSize="large" />,
  2: <PanoramaFishEyeIcon fontSize="large" />,
};

const GameCell: FC<ICellProps> = ({ cell, index, clickHandler }) => {
  const handleClick = () => {
    if (!cell) {
      clickHandler(index);
    }
  };

  return (
    <Cell onClick={handleClick} sx={{ '&:hover': { bgcolor: !cell ? '#54d818c0' : '#ce412e7c' } }}>
      {!!cell && cellIcons[cell]}
    </Cell>
  );
};

export default memo(GameCell);
