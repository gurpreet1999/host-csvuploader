const express=require("express")
const { uploadFile, parsingCSV, deleteFile, showTableData, sorting, searching } = require("../controllers/fileController.js")


const fileRoute=express.Router()

fileRoute.post('/upload',uploadFile)
fileRoute.get('/open',parsingCSV)
fileRoute.get('/showdata/:id',showTableData)
fileRoute.get('/sort/:val/:field',sorting)

fileRoute.get('/delete',deleteFile)
fileRoute.post('/search',searching)


module.exports=fileRoute



