const { Pool } = require('pg');

const pool = new Pool({
  user: 'kleb',
  host: 'localhost',
  database: 'sdc',
  port: 5432,
});

const products = (callback) => {
  pool.query('SELECT * FROM products ORDER BY id LIMIT 200')
    .then((res) => {
      console.log(res.rows[0]);
      callback(res.rows);
      // pool.end();
    })
    .catch((err) => console.error(err));
};

const related = (id, callback) => {
  pool.query(`SELECT related_product_id FROM related WHERE current_product_id = ${id} ORDER BY related_product_id`)
    .then((res) => {
      console.log(res.rows);
      const relatedArray = res.rows.map((item) => item.related_product_id);
      callback(relatedArray);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  products,
  related,
};
