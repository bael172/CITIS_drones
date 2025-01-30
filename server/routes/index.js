const Router = require('express')
const router = new Router()

const drone = require("../routes/DroneRoutes.js")

router.use('/drone',drone)