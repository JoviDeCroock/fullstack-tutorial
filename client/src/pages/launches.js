import React, { Fragment } from 'react';
import gql from 'graphql-tag';

import { LaunchTile, Header, Button } from '../components';
import usePagination from './usePagination';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetLaunchList($from: Int) {
    launches(from: $from) {
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default function Launches() {
  const [{ error, data }, fetchMore, hasMore] = usePagination(GET_LAUNCHES);

  if (error) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header />
      {data &&
        data.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
      {hasMore && (
          <Button onClick={fetchMore}>
            Load More
          </Button>
        )}
    </Fragment>
  );
}
