import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import Button from '../components/button';
import { GET_LAUNCH } from './cart-item';

export { GET_LAUNCH };
export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

export default function BookTrips({ cartItems }) {
  const [{ data }, bookTrips] = useMutation(BOOK_TRIPS);

  return data && data.bookTrips && !data.bookTrips.success
    ? <p data-testid="message">{data.bookTrips.message}</p>
    : (
      <Button onClick={() => bookTrips({ launchIds: cartItems })} data-testid="book-button">
        Book All
      </Button>
    );
}
