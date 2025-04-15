'use strict';

/**
 * dashboard router
 */

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/combined-data',
        handler: 'dashboard.combinedData',
        config: {
          auth: false,
          middlewares: [],
        },
      },
    ],
  };  