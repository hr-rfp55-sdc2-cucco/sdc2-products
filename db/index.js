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
    .then((style) => {
      const styleIds = style.rows.map((item) => item.id);

      let stylesObj = {
        product_id: id,
      };
      let finalStyles = style.rows.map((item) => {
        const resultsObj = {
          style_id: item.id,
          name: item.name,
          original_price: item.original_price,
          sale_price: item.sale_price,
          default: item.default_style,
        };
        return resultsObj;
      });
      console.log(styleIds);
      for (let i = 0; i < styleIds.length; i += 1) {
        pool.query(`SELECT * FROM skus WHERE style_id = ${styleIds[i]}`)
          .then((ps) => {
            stylesObj.results[i].skus = ps.rows;
            console.log(stylesObj.results);
          });
      }
      stylesObj.results = finalStyles;
      console.log(stylesObj);
      callback(stylesObj);
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
