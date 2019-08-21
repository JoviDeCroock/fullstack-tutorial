import React, { Fragment } from 'react';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

import { LaunchTile, Header, Button, Loading } from '../components';

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
  const [from, setFrom] = React.useState(0)
  const [{ fetching, error, data }] = useQuery({
    query: GET_LAUNCHES,
    variables: { from },
  });
  if (fetching) return <Loading />;
  if (error) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
      {data.launches &&
        data.launches.hasMore && (
          <Button
            onClick={() => {
              setFrom(from + 20);
            }}
          >
            Load More
          </Button>
        )}
    </Fragment>
  );
}
