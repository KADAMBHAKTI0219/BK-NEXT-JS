'use strict';

/**
 * dashboard controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::dashboard.dashboard',(strapi) =>({
    async combinedData(ctx){
        const [products, categories] = await Promise.all([
            strapi.entityService.findMany('api::product.product', {
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
