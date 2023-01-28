import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > nav {
    width: 30%;
    display: flex;
    justify-content: space-between;
  }
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-size: 22px;
  font-weight: 600;
  color: black;

  &.active {
    color: #11f511;
  }
`;
