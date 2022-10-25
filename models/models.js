const knex = require('knex')(require('../knexfile'));

exports.getBoxers = () => {
  return knex("boxer")
  .then(data => {
    return data;
  })

  .catch(err => {
    
    return undefined;
  })
}