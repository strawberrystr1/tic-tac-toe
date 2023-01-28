import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { Typography } from '@mui/material';

import { GameIcons, IStep } from '../../types/gamePage';
import { IHistoryPageState } from '../../types/historyPage';
import { createEmptyGameMatrix, createHistoryCells } from '../../utils/utils';
import { HistoryElement } from '../GamePage/components/HistoryItem';
import { GameArea } from '../GamePage/styled';
import { Header } from '../Header';
import { SideWrapper } from '../Profile/styled';

import { GameCell, HistoryItemWrapper, Wrapper } from './styled';

export const HistoryPage = () => {
  const location = useLocation();
  const { steps: stepsString, winner, user, currentUser } = location.state as IHistoryPageState;

  const [cells, setCells] = useState<number[][]>(() => createEmptyGameMatrix(3));
  const [currentStepPointer, setCurrentStepPointer] = useState(0);

  const icons: Record<number, ReactNode> = {
    [GameIcons.X_ICON]: <CloseIcon fontSize="large" />,
    [GameIcons.O_ICON]: <PanoramaFishEyeIcon fontSize="large" />,
  };

  const steps = useMemo(() => {
    const data: IStep[] = JSON.parse(stepsString);
    return data;
  }, []);

  useEffect(() => {
    if (!currentStepPointer) {
      setCurrentStepPointer(steps.length);
    }
    setCells(createHistoryCells(3, steps, currentStepPointer));
  }, [steps, currentStepPointer]);

  const handleHistoryItemClick = (step: IStep) => {
    const index = steps.findIndex(s => s.cell.join(',') === step.cell.join(','));

    setCurrentStepPointer(index + 1);
  };

  return (
    <>
      <Header />
      <Wrapper>
        <SideWrapper>
          <Typography fontWeight={600} fontSize={40}>
            Winner: {winner === currentUser.id ? currentUser.name : user.name}
          </Typography>
          <GameArea>
            {cells.map(row => {
              return row.map(cell => <GameCell key={Math.random()}>{icons[cell]}</GameCell>);
            })}
          </GameArea>
        </SideWrapper>
        <SideWrapper>
          <Typography fontSize={30}>Game history</Typography>
          {steps.map((step, i) => (
            <HistoryItemWrapper
              key={step.cell.join()}
              sx={{
                width: '70%',
                '&>div': { bgcolor: `${currentStepPointer - 1 === i ? '#89e70d' : 'transparent'}` },
              }}
            >
              <HistoryElement step={step} clickHandler={handleHistoryItemClick} />
            </HistoryItemWrapper>
          ))}
        </SideWrapper>
      </Wrapper>
    </>
  );
};
