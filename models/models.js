const knex = require('knex')(require('../knexfile'));

exports.selectAll = (table) => {
  return knex(table)
  .then(data => {
    return data;
  })

  .catch(err => {
    return err;
  })
}

exports.getCombosBoxers = () => {
  return knex("boxer")
    .join("combo", "boxer.id", "combo.boxer_id")
    .select("combo.id", "combo.combo_string", "boxer.first_name", "boxer.last_name", "boxer.nickname", "combo.description")
  .then(data => {
    return data
  })

  .catch(err => {
    return err;
  })
}

exports.getActionsWithTypes = () => {
  return knex("action_by_type")
    .join("action", "action.id", "action_by_type.action_id")
    
    .select("action.id", "action.code", "action.name", "action.description", "action_by_type.action_type_id")

  .then(data => {
    return data
  })

  .catch(err => {
    return err;
  })
}