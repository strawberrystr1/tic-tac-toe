import { useLocation } from 'react-router-dom';

import { useCurrentUser } from '../../hooks/useCurrentUser';

import { StyledLink, Wrapper } from './styled';

export const Header = () => {
  const { currentUser } = useCurrentUser();
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <nav>
        <StyledLink to={`/profile/${currentUser?.id}`}>Profile</StyledLink>
        <StyledLink to={'/search'}>Search</StyledLink>
        <StyledLink to={'/leaderboard'}>Leaderboard</StyledLink>
        {/\/history/.test(pathname) && <StyledLink to={pathname}>History</StyledLink>}
      </nav>
    </Wrapper>
  );
};
