import React, { Fragment } from 'react';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

import { Loading, Header, LaunchTile } from '../components';
import { LAUNCH_TILE_DATA } from './launches';

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default function Profile() {
  const [{ data, fetching, error }] = useQuery({
    query: GET_MY_TRIPS,
    requestPolicy: "network-only"
  });

  if (fetching) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You haven't booked any trips</p>
      )}
    </Fragment>
  );
}
