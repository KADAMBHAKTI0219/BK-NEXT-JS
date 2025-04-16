'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const filters = {};
    // Handle specific name filter from dropdown
    if (query.name) {
      filters.name = { $containsi: query.name };
    }
    // Handle search term for both name and fabric
    if (query.search) {
      filters.$or = [
        { name: { $containsi: query.search } },
        { fabric: { $containsi: query.search } },
      ];
    }

    const entities = await strapi.entityService.findMany('api::category.category', {
      filters,
      populate: ['products'], // Optional: include related products
    });

    return { data: entities };
  },
}));