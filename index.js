import express from "express";
import fs from 'fs';
import { format } from 'date-fns';
import path from "path";


// to create node js application in express
const app = express();

// set port
const PORT = 4000;

// to listen the api call
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON: ${PORT}`);
})

// to make get call (get the request data from FE, and send response to FE)
app.get('/', (req, res) => {
    res.status(200).send(` <div style="background-color:rgb(94, 159, 135);text-align: center;border-radius: 25px;"><h1>
    Server Connected Successfully🌐
</h1>
</div>
<div style="background-color: #41a0a0; border-radius: 25px;text-align: center;">
<br>
<h2>Please check the below API's🖥</h2>
      🧾<a href="https://day-1-nodejs-filesystem.onrender.com/write">API to retrieve the files👉</a>
   🧾<a href="https://day-1-nodejs-filesystem.onrender.com/read-retrive">API to retrieve the files👉</a>
</div>`);
})

app.get('/get-data', (req, res) => {
    res.status(200).json({ message: "Successfully login", data: { name: "Gayathri" } });
})

//  to create and write timstape using get call
app.get('/write', (req, res) => {
    // creating the timestamp format with format. with new date function
    let timeStamp = format(new Date(), 'dd-mm-yyyy-HH-mm-ss');
    console.log("Timestamp", timeStamp);

    let filePath = `CurrentTimeStamp/${timeStamp}.txt`;
    // default funciton to create and write insid the file
    fs.writeFileSync(filePath, `${timeStamp}`, 'utf8');
    res.status(200).json({ message: "Timestamp file created successfully", data: { "timestamp": `${timeStamp}` } });

})

//  Create api to retrive all the file in the particular folder
app.get('/read-retrive', (req, res) => {
    let filePath = 'CurrentTimeStamp';

    // Error handling (Checking for file exist) using existsStync function
    if (!fs.existsSync('CurrentTimeStamp')) {
        return res.status(404).json({ error: "File Not Found" });
    }

    // Read the contents of the file using readdir function & extname
    fs.readdir(filePath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Cannot read file" });
        }
        // just converting txt to lowercase to get perfect data
        const match = files.filter(ele => path.extname(ele).toLowerCase() === ".txt");
        //  console.log(match);
        res.status(202).json({ message: "File retrieved successfully", data: match });
    })

})

