const Router = require('express')
const router = new Router()

const drone = require("./DroneRoutes.js")

router.use('/drone',drone)