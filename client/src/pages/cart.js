import React, { Fragment } from 'react';

import { Header } from '../components';
import { CartItem, BookTrips } from '../containers';
import { CartContext } from '.';

export default function Cart() {
  const { cartItems } = React.useContext(CartContext);
  
  return (
    <Fragment>
      <Header>My Cart</Header>
      {!cartItems || !cartItems.length ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <Fragment>
          {cartItems.map(launchId => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
          <BookTrips cartItems={cartItems} />
        </Fragment>
      )}
    </Fragment>
  );
}
