const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    launches: async (_, { limit = 20, from = 0 }, { dataSources }) => {
      const allLaunches = await dataSources.launchAPI.getAllLaunches();
      // we want these in reverse chronological order
      allLaunches.reverse();

      return {
        launches: allLaunches.slice(from, from + limit),
        hasMore: allLaunches.length > from
      };
    },
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: async (_, __, { dataSources }) =>
      dataSources.userAPI.findOrCreateUser(),
  },
  Mutation: {
    bookTrips: async (_, { launchIds }, { dataSources }) => {
      const results = await dataSources.userAPI.bookTrips({ launchIds });
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds,
      });

      return {
        success: results && results.length === launchIds.length,
        message:
          results.length === launchIds.length
            ? 'trips booked successfully'
            : `the following launches couldn't be booked: ${launchIds.filter(
                id => !results.includes(id),
              )}`,
        launches,
      };
    },
    cancelTrip: async (_, { launchId }, { dataSources }) => {
      const result = dataSources.userAPI.cancelTrip({ launchId });

      if (!result)
        return {
          success: false,
          message: 'failed to cancel trip',
        };

      const launch = await dataSources.launchAPI.getLaunchById({ launchId });
      return {
        success: true,
        message: 'trip cancelled',
        launches: [launch],
      };
    },
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return { token: Buffer.from(email).toString('base64') };
    },
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  },
  Mission: {
    // make sure the default size is 'large' in case user doesn't specify
    missionPatch: (mission, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    },
  },
  User: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

      if (!launchIds.length) return [];

      // look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds,
        }) || []
      );
    },
  },
};
