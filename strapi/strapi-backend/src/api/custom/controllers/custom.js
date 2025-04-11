'use strict';

/**
 * custom controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::custom.custom', ({ strapi }) => ({
  async combinedData(ctx) {
    const { price } = ctx.query;
    let filter = {};

    // Proper string comparison for query value
    if (price === 'lessthan150') {
      filter = {
        price: {
          $lt: 150,
        },
      };
    } else if (price === 'greaterthan150') {
      filter = {
        price: {
          $gt: 151
          , 
        },
      };
    }

    const [products, categories] = await Promise.all([
      strapi.entityService.findMany('api::product.product', {
        filters: filter,
        sort: { price: 'asc' },
        populate: '*',
      }),
      strapi.entityService.findMany('api::category.category', {
        populate: '*',
      }),
    ]);

    const lowThreshold = Number(ctx.query.low || 10);
    let stockCountless10 = 0;
    let stockCountMoreOrEqual10 = 0;

    products.forEach(product => {
      if (product.stock < lowThreshold) {
        stockCountless10++;
      } else {
        stockCountMoreOrEqual10++;
      }
    });

    ctx.body = {
      products,
      categories,
      productCount: products.length,
      categoryCount: categories.length,
      stockCountless10,
      stockCountMoreOrEqual10,
    };
  }
}));
