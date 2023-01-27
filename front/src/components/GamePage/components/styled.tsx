import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Cell = styled(Box)`
  width: calc(100% / 3);
  height: calc(100% / 3);
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s ease;
`;

export const HistoryWrapper = styled(Box)`
  width: 30%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HistoryItem = styled(Box)`
  width: 100%;
  border: 1px solid white;
  padding: 5px;
  text-align: center;
`;
