const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.post("/addFiles",(req,res)=>{
    const {data} = req.body;

    for(let key in data){
        const filename = path.join(__dirname,'/Files',`${key}`)
        const csv_data_of_a_file = []


        for(let row of data[key]){
            csv_data_of_a_file.push(row.join());
        }
        fs.writeFileSync(filename,csv_data_of_a_file.join(os.EOL))

    }

    

    res.json("added successfully");

})



app.listen(3000,()=>{
    console.log("app is running");
})