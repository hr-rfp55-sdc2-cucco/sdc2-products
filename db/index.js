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
      callback(res.rows);
    })
    .catch((err) => console.error(err));
};

const product = (id, callback) => {
  pool.query(`SELECT * FROM products WHERE id = ${id}`)
    .then((res) => {
      pool.query(`SELECT * FROM features WHERE product_id = ${id}`)
        .then((results) => {
          res.rows[0].features = [];
          results.rows.map((item) => res.rows[0].features.push({
            feature: item.value,
            value: item.feature,
          }));
          callback(res.rows[0]);
        });
    });
};

const styles = (id, callback) => {
  pool.query(`SELECT * FROM styles WHERE product_id = ${id}`)
    .then((prod) => {
      pool.query(`SELECT * FROM styles y INNER JOIN skus s ON y.id = s.style_id WHERE y.product_id = ${id}`)
        .then((skus) => {
          pool.query(`SELECT * FROM styles y INNER JOIN photos p ON y.id = p.style_id WHERE y.product_id = ${id}`)
            .then((photos) => {
              const stylesObj = {
                product_id: id,
                results: [],
              };
              // console.log(skus.rows);
              const styleIds = prod.rows.map((item) => item.id);
              for (let i = 0; i < styleIds.length; i += 1) {
                const resultsObject = {
                  style_id: prod.rows[i].id,
                  name: prod.rows[i].name,
                  original_price: prod.rows[i].original_price,
                  sale_price: prod.rows[i].sale_price,
                  default: prod.rows[i].default_style,
                };
                const skusObject = {};
                resultsObject.photos = photos.rows.filter((item) => (
                  item.style_id === styleIds[i]
                ))
                  .map((item) => ({
                    thumbnail_url: item.thumbnail_url,
                    url: item.url,
                  }));
                skus.rows.filter((item) => (
                  item.style_id === styleIds[i]
                ))
                  .forEach((item) => {
                    skusObject[item.id] = {
                      quantity: item.quantity,
                      size: item.size,
                    };
                  });
                resultsObject.skus = skusObject;
                stylesObj.results.push(resultsObject);
              }
              callback(stylesObj);
            });
        });
    });
};

const related = (id, callback) => {
  pool.query(`SELECT related_product_id FROM related WHERE current_product_id = ${id} ORDER BY related_product_id`)
    .then((res) => {
      const relatedArray = res.rows.map((item) => item.related_product_id);
      callback(relatedArray);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  products,
  product,
  styles,
  related,
};
