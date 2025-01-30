const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require("../db_connect.js")

const Drone = sequelize.define('drone',{
    id:{type:DataTypes.INTEGER, primaryKey:true},
    brand:{type:DataTypes.STRING},
    model:{type:DataTypes.STRING},
    name:{type:DataTypes.STRING},
    description:{type:DataTypes.TEXT},
    price:{type:DataTypes.DECIMAL(10,2)},
    having:{type:DataTypes.STRING, defaultValue:"В наличии"}
})
module.exports = {Drone}