const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require("../db_connect.js")

const User= sequelize.definew('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    login:{type:DataTypes.STRING},
    passwd:{type:DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING, defaultValue:"client"}
})
const Drone = sequelize.define('drone',{
    id:{type:DataTypes.INTEGER, primaryKey:true},
    img:{type:DataTypes.TEXT},
    brand:{type:DataTypes.STRING},
    model:{type:DataTypes.STRING},
    name:{type:DataTypes.STRING},
    description:{type:DataTypes.TEXT},
    price:{type:DataTypes.DECIMAL(10,2)},
    having:{type:DataTypes.STRING, defaultValue:"В наличии"},
})
module.exports = {User, Drone}