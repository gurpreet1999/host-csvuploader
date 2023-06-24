const multer = require("multer");
const upload = require("../middleware/multerMiddleware");
const path = require("path");

//using csv-parser to convert the data into JSON format
const csv = require("csv-parser");
const fs = require("fs");

var DataInCurrentPagination = []; //this array will help to sort the current pagination data
let uploadFileName = [];
let csvParseData = []; //this array
let lengthOfData;

//function to upload the file in uploads folder
//we are using multer middleware to store
async function uploadFile(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.log(err);
    } else if (req.file) {
      uploadFileName.push(req.file.filename);
    }

    return res.redirect("back");
  });
}

// this is my home route function ..it will send all the file store in the local server to my homePage
function exportFile(req, res) {
  uploadFileName = fs.readdirSync(path.join(__dirname, "../", "uploads"));

  return res.render("home", {
    files: uploadFileName,
  });
}

//for opening the csv file and display its content in a tabular form

async function parsingCSV(req, res) {
    uploadFileName = fs.readdirSync(path.join(__dirname, "../", "uploads")); 
  csvParseData = []; //this array is for storing the current file data in json format

  const index = req.query.index;
  let filePath =path.join(__dirname, "../", "/uploads", uploadFileName[index]);

  if (!path) {
   return  res.redirect("back");
  }
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      csvParseData.push(data);
    })
    .on("end", () => {
      lengthOfData = csvParseData.length;
      DataInCurrentPagination = csvParseData.slice(0, 100);
      return res.render("table", {
        csvData: csvParseData.slice(0, 100),
        lengthOfData: lengthOfData / 100,
        data: "desc",
      });
    });
}

function deleteFile(req,res) {
  let index = req.query.index;

  try {
    var files = fs.readdirSync(path.join(__dirname, "../", "uploads"));
  } catch (err) {
    return;
  }
  if (files.length > 0) {
    var filepath = path.join(
      __dirname,
      "../",
      "uploads",
      files[index]
    );
    if (fs.statSync(filepath).isFile()) {
      fs.unlinkSync(filepath);
    }
  }

  uploadFileName.splice(index, 1);
  return res.redirect("back");
}

function showTableData(req, res) {
  let index = req.params.id || 1;

  let dataToBeSend = index * 100;

  let previousSend = (index - 1) * 100;

  lengthOfData = csvParseData.length;

  let newArray = csvParseData.slice(previousSend, dataToBeSend);

  DataInCurrentPagination = newArray;

  return res.render("table", {
    csvData: newArray,
    lengthOfData: lengthOfData / 100,
    data: "desc",
  });
}

function sorting(req, res) {
  let value = req.params.val;
var field=req.params.field
console.log(field)

  console.log(value);
  let data;
  if (value === "asc") {
    data = "desc";
    DataInCurrentPagination.sort(function compare(a, b) {
      if (a[field] < b[field]) {
        return 1;
      }
      if (a[field] > b[field]) {
        return -1;
      }
      return 0;
    });
  } else {
    console.log("hi");
    data = "asc";
    DataInCurrentPagination.sort(function compare(a, b) {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });
  }

  return res.render("table", {
    csvData: DataInCurrentPagination,
    lengthOfData: lengthOfData / 100,
    data: data,
  });
}

function searching(req, res) {

  let searchArray = [];
let search=req.body.search
 
  if (!search) {
    return res.redirect("/v1/file/open/?index=0");
  }





csvParseData.forEach((data)=>{

for(const key in data){

if(data[key].startsWith(search)){
  searchArray.push(data);

}

}


})


res.render("table", {
    csvData: searchArray,
    lengthOfData: searchArray / 100,
    data: "desc",
  });
}


module.exports = {
  uploadFile,
  exportFile,
  parsingCSV,
  deleteFile,
  showTableData,
  sorting,
  searching,
 
};
//ok
