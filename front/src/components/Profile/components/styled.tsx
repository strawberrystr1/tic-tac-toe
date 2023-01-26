import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  width: 100%;
  height: 100px;
  border: 1px solid white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  background-color: #ffffff78;
  padding: 5px;
`;

export const TopBlock = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;
