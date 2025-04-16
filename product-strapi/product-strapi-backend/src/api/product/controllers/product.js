'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    const filters = {};

    // Search filter (name or category.name)
    if (query.search) {
      filters.$or = [
        { name: { $containsi: query.search } },
        { category: { name: { $containsi: query.search } } },
      ];
    }

    // Category filter
    if (query.category) {
      filters.category = { name: { $containsi: query.category } };
    }

    // Price filter
    if (query.price) {
      if (query.price === 'below-100') {
        filters.price = { $lt: 100 };
      } else if (query.price === '100-200') {
        filters.price = { $gte: 100, $lte: 200 };
      } else if (query.price === '200-300') {
        filters.price = { $gte: 200, $lte: 300 };
      }
    }

    // Stock filter
    if (query.stock) {
      if (query.stock === 'below-10') {
        filters.stock = { $lt: 10 };
      } else if (query.stock === '10-20') {
        filters.stock = { $gte: 10, $lte: 20 };
      } else if (query.stock === '20-30') {
        filters.stock = { $gte: 20, $lte: 30 };
      }
    }

    const entities = await strapi.entityService.findMany('api::product.product', {
      filters,
      populate: ['category', 'images'],
    });

    return { data: entities };
  },
}));