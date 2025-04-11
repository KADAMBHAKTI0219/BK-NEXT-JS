'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/books/customAction',
      handler: 'book.customAction',
      config: {
        auth: false, 
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/books',
      handler: 'book.find',
    },
    {
      method: 'GET',
      path: '/books/:id',
      handler: 'book.findOne',
    },
    {
      method: 'POST',
      path: '/books',
      handler: 'book.create',
    },
    {
      method: 'PUT',
      path: '/books/:id',
      handler: 'book.update',
    },
    {
      method: 'DELETE',
      path: '/books/:id',
      handler: 'book.delete',
    },
  ],
};
