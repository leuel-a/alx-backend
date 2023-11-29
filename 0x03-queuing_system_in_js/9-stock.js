import { promisify } from 'util';
import { createClient } from 'redis';
import express from 'express';

const client = createClient();

client
  .on('err', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
  })
  .on('connect', () => {
    console.log('Redis client connected to the server');
  });

const listProducts = [
  {
    Id: 1,
    name: 'Suitcase 250',
    price: 50,
    stock: 4,
  },
  {
    Id: 2,
    name: 'Suitcase 450',
    price: 100,
    stock: 10,
  },
  {
    Id: 3,
    name: 'Suitcase 650',
    price: 350,
    stock: 2,
  },
  {
    Id: 4,
    name: 'Suitcase 1050',
    price: 550,
    stock: 5,
  },
];

/**
 * Retrieves an item by its ID from the list of products.
 *
 * @param {string} id - The ID of the item to retrieve.
 * @returns {Object} The item with the specified ID, or an empty object if no such item exists.
 */
function getItemById(id) {
  return listProducts.find((product) => product.Id === id) || {};
}

/**
 * Retrieves all items from the list of products.
 *
 * @returns {Array} An array of all items in the list of products.
 */
function getItems() {
  return listProducts;
}

/**
 * Reserves a specified quantity of an item in stock.
 *
 * @param {string} itemId - The ID of the item to reserve.
 * @param {number} stock - The quantity of the item to reserve.
 * @returns {Promise} A promise that resolves when the stock has been reserved.
 */
function reserveStockById(itemId, stock) {
  const SET = promisify(client.SET).bind(client);
  return SET(`item.${itemId}`, stock);
}

/**
 * Retrieves the current reserved stock for a specified item.
 *
 * @param {string} itemId - The ID of the item to retrieve the reserved stock for.
 * @returns {Promise<number>} A promise that resolves with the current reserved stock for the item, or 0 if no stock is reserved.
 */
async function getCurrentReservedStockById(itemId) {
  const GET = promisify(client.GET).bind(client);
  const stock = await GET(`item.${itemId}`);
  if (stock === null) return 0;
  return stock;
}

const app = express();

/**
 * Route that returns a list of all products.
 * @route GET /list_products
 * @returns {Array} An array of all products.
 */
app.get('/list_products', (req, res) => {
  res.json(getItems());
});

/**
 * Route that returns a product by its ID.
 * @route GET /list_products/:itemId
 * @param {number} itemId - The ID of the product.
 * @returns {Object} The product with the specified ID and its current quantity, or a status message if the product is not found.
 */
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);
  if (item.Id) {
    const stock = await getCurrentReservedStockById(itemId);
    item.currentQuantity = item.stock - stock;
    return res.json(item);
  }
  return res.json({ status: 'Product not found' });
});

/**
 * Route that reserves a product by its ID.
 * @route GET /reserve_product/:itemId
 * @param {number} itemId - The ID of the product.
 * @returns {Object} A status message indicating whether the product was successfully reserved, or if it was not found or there was not enough stock.
 */
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);
  if (!item.Id) {
    return res.json({ status: 'Product not found' });
  }
  const stock = await getCurrentReservedStockById(itemId);
  if (stock >= item.stock) {
    return res.json({ status: 'Not enough stock available', itemId });
  }
  await reserveStockById(itemId, Number(stock) + 1);
  return res.json({ status: 'Reservation confirmed', itemId });
});

/**
 * Clears all reserved stock for all items in the list of products.
 *
 * @returns {Promise} A promise that resolves when all reserved stock has been cleared.
 */
function clearStock() {
  const SET = promisify(client.SET).bind(client);
  return Promise.all(listProducts.map((item) => SET(`item.${item.Id}`, 0)));
}

app.listen(1245, async () => {
  await clearStock();
  console.log('API available on localhost via port 1245');
});
