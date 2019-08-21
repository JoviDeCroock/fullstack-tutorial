import React from 'react';
import styled from '@emotion/styled';

import { menuItemClassName } from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';
import { AuthContext } from '..';

export default function LogoutButton() {
  const { setAuthState } = React.useContext(AuthContext);
  const logout = React.useCallback(() => {
    setAuthState(() => ({ isLoggedIn: false, token: '' }));
    window.localStorage.setItem('token', '');
  }, [setAuthState])
  return (
    <StyledButton
      data-testid="logout-button"
      onClick={logout}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});
