import React from 'react';
import ReactDOM from 'react-dom';

import { createClient, Provider, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

import Pages from './pages';
// import Login from './pages/login';
import injectStyles from './styles';

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const client = new createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({}),
    fetchExchange,
  ]
});

injectStyles();
ReactDOM.render(
  <Provider value={client}>
    <Pages />
  </Provider>,
  document.getElementById('root'),
);
