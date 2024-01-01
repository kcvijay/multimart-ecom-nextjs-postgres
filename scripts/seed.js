const { db } = require('@vercel/postgres');
const { productsData } = require('../app/lib/placeholder-data.ts');

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Creation of table 'products' if it doesnot exist.

    const createProductTable = await client.sql`
        CREATE TABLE IF NOT EXISTS products (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            price NUMERIC,
            discountPercentage NUMERIC,
            rating NUMERIC,
            stock INTEGER,
            brand VARCHAR(255),
            category VARCHAR(255),
            thumbnail VARCHAR(255),
            images VARCHAR(255)[],
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    console.log('Created products table.');

    const insertedProducts = await Promise.all(
      productsData.map(async (product) => {
        return client.sql`
            INSERT INTO products (
              title,
              description,
              price,
              discountPercentage,
              rating,
              stock,
              brand,
              category,
              thumbnail,
              images
            )
            VALUES (
              ${product.title},
              ${product.description},
              ${product.price},
              ${product.discountPercentage},
              ${product.rating},
              ${product.stock},
              ${product.brand},
              ${product.category},
              ${product.thumbnail},
              ${product.images}
            )`;
      })
    );

    return {
      createProductTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error('Error while creating products table. ' + error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedProducts(client);
  await client.end();
}

main().catch((error) => {
  console.error(`An error ocurred while seeding the database. ${error}`);
});
