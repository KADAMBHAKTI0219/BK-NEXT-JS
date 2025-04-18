'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { amount, products } = ctx.request.body.data;

    try {
      // Validate input
      if (!amount || !products || !Array.isArray(products)) {
        ctx.response.status = 400;
        return { error: { message: 'Invalid input: amount and products are required' } };
      }

      // Create the order
      const order = await strapi.service('api::order.order').create({
        data: {
          amount,
          products,
          user: user ? user.id : null,
        },
      });

      return order;
    } catch (err) {
      ctx.response.status = 500;
      return {
        error: { message: 'There was a problem creating the order' },
        amount,
        products,
      };
    }
  },
}));