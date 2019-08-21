import React from 'react';
import ReactDOM from 'react-dom';

import { createClient, Provider, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

import Pages from './pages';
import Login from './pages/login';
import GlobalStyles from './styles';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const client = new createClient({
  exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
  fetchOptions: () => ({
    headers: {
      authorization: localStorage.getItem("token"),
    },
  }),
  url: "http://localhost:4000/graphql"
});

export const AuthContext = React.createContext();

const App = () => {
  const token = localStorage.getItem("token");
  const [authState, setAuthState] = React.useState({
    isLoggedIn: !!token,
    token: token || ''
  });
  return (
    <React.Fragment>
      <GlobalStyles />
      <AuthContext.Provider value={{ ...authState, setAuthState }}>
        <Provider value={client}>
          {authState.isLoggedIn ? <Pages /> : <Login />}
        </Provider>
      </AuthContext.Provider>
    </React.Fragment>
  );
}



ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
