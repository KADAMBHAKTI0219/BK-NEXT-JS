'use strict';

/**
 * custom router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/combined-data',
      handler: 'custom.combinedData',  // 👈 Use `custom`, not `product`
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
