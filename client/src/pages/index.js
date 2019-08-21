import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';

export const CartContext = React.createContext(null);

export default function Pages() {
  const [cartItems, setCartItems] = React.useState([]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
        </Router>
      </PageContainer>
      <Footer />
    </CartContext.Provider>
  );
}
