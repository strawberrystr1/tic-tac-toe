import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

export const Avatar = styled(Box)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #65c724;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const SideWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 49%;
  height: 100%;
  align-items: center;
  overflow: auto;
  padding: 10px;
`;
