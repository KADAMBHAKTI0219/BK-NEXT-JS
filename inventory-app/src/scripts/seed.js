const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://kadambhakti0219:CeOO5MfvWNHBwpp0@cluster0.aqosxed.mongodb.net/inventory';
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    const db = client.db('inventory');
    const collection = db.collection('items');

    const items = [
      {
        name: 'Camera',
        quantity: 6,
        price: 499.99,
        description: 'DSLR camera with lens',
        createdAt: new Date(),
      },
      {
        name: 'Tripod',
        quantity: 18,
        price: 89.99,
        description: 'Adjustable tripod',
        createdAt: new Date(),
      },
      {
        name: 'Memory Card',
        quantity: 2,
        price: 39.99,
        description: '64GB SD card',
        createdAt: new Date(),
      },
      {
        name: 'Camera Bag',
        quantity: 8,
        price: 59.99,
        description: 'Waterproof camera bag',
        createdAt: new Date(),
      },
      {
        name: 'Lens',
        quantity: 15,
        price: 299.99,
        description: '50mm prime lens',
        createdAt: new Date(),
      },
    ];

    await collection.deleteMany({});
    await collection.insertMany(items);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();