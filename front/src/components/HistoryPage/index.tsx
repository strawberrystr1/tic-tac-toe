import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

// import { GameIcons } from '../../types/gamePage';
import { IHistoryPageState } from '../../types/historyPage';
import { createEmptyGameMatrix, createHistoryCells } from '../../utils/utils';
import { GameArea } from '../GamePage/styled';
import { SideWrapper } from '../Profile/styled';

import { GameCell, Wrapper } from './styled';

export const HistoryPage = () => {
  const location = useLocation();
  const state = location.state as IHistoryPageState;

  const [cells, setCells] = useState<number[][]>(() => createEmptyGameMatrix(3));

  // const icons = {
  //   [GameIcons.X_ICON]: 'X',
  //   [GameIcons.O_ICON]: 'O',
  // };

  const steps = useMemo(() => {
    const data = JSON.parse(state.steps);

    setCells(prev => createHistoryCells(prev, data));
  }, []);

  useEffect(() => {
    console.log(steps);
  }, []);

  return (
    <Wrapper>
      <SideWrapper>
        <GameArea>
          {cells.map((row, i) => {
            return row.map((cell, j) => <GameCell key={i + cell + j} />);
          })}
        </GameArea>
      </SideWrapper>
      <SideWrapper></SideWrapper>
    </Wrapper>
  );
};
