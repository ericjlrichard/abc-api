/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const fs = require ("node:fs")
const action_data = require("./seed_data/actions.js")
const boxer_data = require("./seed_data/boxers.js")
const action_type_data = require("./seed_data/action_types.js")
const combo_data = require("./seed_data/combos.js")
const achievement_data = require("./seed_data/achievement.js")

let sqlBoxerData = null;
let sqlTypeData = null;
let sqlActionData = null;

exports.seed = function(knex) {
  return knex("action")
    .del()
    .then(() => {
      const arrayInsert = action_data.map(item => {
        return { "name": item.name, "code": item.code, "description": item.description}
      })

      return knex("action").insert(arrayInsert)
    })

    .then(() => {
      return knex("boxer").del()
    })
    .then(() => {
      const arrayInsert = boxer_data.map(item => {
        return { 
          "first_name": item.first_name, 
          "last_name": item.last_name,
          "nickname": item.nickname,
          "description": item.description,
          "img": item.img
        }
      })

      return knex("boxer").insert(arrayInsert);
    })

    .then(() => {
      return knex("action_type").del()
    })
    .then(() => {
      return knex("action_type").insert(action_type_data)
    })

    //grabbing boxer SQL data
    .then(() => {
      knex("boxer")
      .then(result => {
        sqlBoxerData = result
      })
      return sqlBoxerData
    })

    //grabbing type SQL data
    .then(() => {
      knex("action_type")
      .then(result => {
        sqlTypeData = result
      })
      return sqlTypeData
    })

    //grabbing action SQL data
    .then(() => {
      knex("action")
      .then(result => {
        sqlActionData = result
      })
      return sqlActionData
    })

    .then(() => {
      return knex("combo").del()
    })
    .then(() => {
      const arrayInsert = []

      combo_data.forEach(item =>
        {

          //little bit of trickery to find the boxer SQL id through the last name
          const boxerFound = boxer_data.find(boxer => boxer.id === item.boxer)

          const boxerLastName = boxerFound ? boxerFound["last_name"] : "Caufield"

          const sqlBoxerFound = sqlBoxerData.find(boxer => boxer.last_name === boxerLastName)

          const comboString = item["combo-array"].join();
          item.comboString = comboString;

          const refactoredCombo = {
            name: item["combo-name"],
            boxer_id: sqlBoxerFound.id,
            combo_string: item["combo-array"].join(),
            description: ""
          }

          arrayInsert.push(refactoredCombo)
        }
      )

      return knex("combo").insert(arrayInsert)
    })

    .then(() => {
      return knex("action_by_type").del();
    })

    .then(() => {

      let arrayInsert = []

      action_data.forEach(action => {
        const actionFound = sqlActionData.find(sqlAction => sqlAction.code === action.code)
        action.types.forEach(type => {
          const typeFound = sqlTypeData.find(sqlType => sqlType.name === type)
        
          arrayInsert.push({action_id: actionFound.id, action_type_id: typeFound.id})
        })
      })

      return knex("action_by_type").insert(arrayInsert);
    })

    .then(() => {
      return knex("achievement").del();
    })

    .then(() => {
      return knex("achievement").insert(achievement_data);
    })
};
