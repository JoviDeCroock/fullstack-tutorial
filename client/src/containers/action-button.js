import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';
import { CartContext } from '../pages';

// export all queries used in this file for testing
export { GET_LAUNCH_DETAILS };

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

export default function ActionButton({ isBooked, id }) {
  const [{ fetching, error }, cancelTrip] = useMutation(CANCEL_TRIP);
  const { cartItems, setCartItems } = React.useContext(CartContext);

  const addOrRemoveInCart = React.useCallback(() => {
    setCartItems(items => {
      if (items.includes(id)) {
        return items.filter(itemId => itemId !== id);
      }
      return [...items, id];
    });
  }, [id, setCartItems]);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <Button
        onClick={isBooked ? () => cancelTrip({ launchId: id }) : addOrRemoveInCart}
        isBooked={isBooked}
        data-testid={'action-button'}
      >
        {isBooked
          ? 'Cancel This Trip'
          : cartItems.includes(id)
            ? 'Remove from Cart'
            : 'Add to Cart'}
      </Button>
    </div>
  );
}
