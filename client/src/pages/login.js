import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import { LoginForm, Loading } from '../components';
import { AuthContext } from '..';
import usePreviousValue from './usePreviousValue';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email) {
      token
    }
  }
`;

export default function Login() {
  const [{ data, fetching, error }, login] = useMutation(LOGIN_USER);
  const { setAuthState } = React.useContext(AuthContext);
  const prevFetching = usePreviousValue(fetching);

  React.useEffect(() => {
    if (prevFetching === true && fetching === false && data && data.login && data.login.token) {
      const { token } = data.login;
      setAuthState(() => ({ isLoggedIn: true, token }));
      window.localStorage.setItem('token', token);
    }
  }, [fetching, data, prevFetching, setAuthState]);

  if (fetching) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
