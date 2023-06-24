const express=require("express")
const { exportFile } = require("../controllers/fileController.js")

const fileRoute = require("./fileRoute.js")

const indexRoute=express.Router()



indexRoute.get('/',exportFile)
indexRoute.use('/file',fileRoute)




module.exports=indexRoute



