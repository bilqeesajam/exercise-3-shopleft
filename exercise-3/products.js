const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const db = require('./db');

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching products');
        } else {
            res.json(results);
        }
    });
});

app.post('/products', (req, res) => {
  const { product_code, product_name, product_price, product_quantity } = req.body;

  const sql = `INSERT INTO products (product_code, product_name, product_price, product_quantity)
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [product_code, product_name, product_price, product_quantity], (err, result) => {
    if (err) {
      res.status(500).send('Error inserting product');
    } else {
      res.send(`Product ${product_name} added successfully!`);
    }
  });
});

app.put('/products/:code', (req, res) => {
  const productCode = req.params.code;
  const { product_name, product_price, product_quantity } = req.body;

  const sql = `UPDATE products 
               SET product_name = ?, product_price = ?, product_quantity = ?
               WHERE product_code = ?`;

  db.query(sql, [product_name, product_price, product_quantity, productCode], (err, result) => {
    if (err) {
      res.status(500).send('Error updating product');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Product not found');
    } else {
      res.send(`Product ${productCode} updated successfully!`);
    }
  });
});

app.delete('/products/:code', (req, res) => {
    const productCode = req.params.code;

    db.query('DELETE FROM products WHERE product_code = ?', [productCode], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting product');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Product not found');
        } else {
            res.send(`Product ${productCode} deleted successfully`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`View products at http://localhost:${port}/products`);
});
