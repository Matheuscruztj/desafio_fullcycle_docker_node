const mysql = require('mysql');
const { config } = require('./config');

async function query(sql) {
  const connection = mysql.createConnection(config);

  const queryPromise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })

  const queryResults = await queryPromise;

  connection.end();
  return queryResults;
}

async function queryInsert(sql, value) {
  const connection = mysql.createConnection(config);

  const queryPromise = new Promise((resolve, reject) => {
    connection.query(sql, value, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })

  const queryResults = await queryPromise;

  connection.end();
  return queryResults;
}

const queryPromise = {
  query,
  queryInsert
}

module.exports = { queryPromise };