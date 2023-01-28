import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  width: 100%;
  height: calc(100% - 80px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const UserItem = styled(Box)`
  width: 30%;
  height: 50px;
  border: 1px solid white;
  border-radius: 5px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;
