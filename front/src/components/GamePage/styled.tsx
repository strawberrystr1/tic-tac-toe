import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GameBlock = styled(Box)`
  width: 70%;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 20px;
`;

export const GameArea = styled(Box)`
  width: 400px;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20%;
`;

export const HeadBlock = styled(Box)`
  width: 70%;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

export const UserBlock = styled(Box)`
  width: 49%;
  height: 100%;
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px;
`;
