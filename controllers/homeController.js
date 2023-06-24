const { exportFile } = require("./fileController");
let array=exportFile()

async function home(req,res){

return res.render('home',{
    files:array
})

}


module.exports=home