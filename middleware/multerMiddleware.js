
const multer=require("multer")
const path=require("path")

 // this is my multer configuration 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
   cb(null,path.join(__dirname,"../","/uploads"))
    }
    ,
    filename:function(req,file,cb){
const name=Date.now() + '-' + Math.round(Math.random()*1E9);
cb(null,file.originalname+'-'+name)
    }
})


//setting up file-filter to upload only (.csv) files

function checkCsv(req,file,cb){
if(file.mimetype=='text/csv'){
    cb(null,true)
}
else{
    cb(null,false)
}

}



//initializing multer

const upload=multer({storage:storage,fileFilter:checkCsv}).single('file')


module.exports=upload

