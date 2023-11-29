# Queuing System in JavaScript

This project contains a simple queuing system implemented in JavaScript. It uses Redis for queue management and Express for the API server.

## Features

- List all products
- Get a product by its ID
- Reserve a product by its ID
- Clear all reserved stock

## Installation

1. Clone this repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## API Endpoints

- `GET /list_products`: Returns a list of all products.
- `GET /list_products/:itemId`: Returns a product by its ID.
- `GET /reserve_product/:itemId`: Reserves a product by its ID.
- `GET /clear_stock`: Clears all reserved stock.
