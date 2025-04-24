
import { connectToDatabase } from '@/utils/db';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const items = await db.collection('items').find({}).toArray();
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch items' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();
    const item = {
      ...body,
      quantity: parseInt(body.quantity),
      price: parseFloat(body.price),
      createdAt: new Date(),
    };
    const result = await db.collection('items').insertOne(item);
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid item ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'Item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'Item deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid item ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const update = {
      name: body.name,
      quantity: parseInt(body.quantity),
      price: parseFloat(body.price),
      description: body.description,
      updatedAt: new Date(),
    };
    const result = await db.collection('items').updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: 'Item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'Item updated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}