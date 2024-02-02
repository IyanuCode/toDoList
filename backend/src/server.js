//Sending request to the server and if it's connected




// const http = require ("http");
// const PORT = 5000
// const server = http.createServer((req,res)=>{
//     if (req.url=="/") {
//         res.setHeader("content-type", "text/html")
//         res.write("<h1>This is homepage</h1>")
//         res.end()
//     }
//     if (req.url=="/about") {
//         res.setHeader("content-type", "text/html")
//         res.write("<h1>This is about page</h1>")
//         res.end()
//     }
//     console.log("server now running");
// })
// server.listen(5000,()=>{
//     // console.log("sever running now now")
//     console.log(`SERVER RUNNING ON ${PORT}`);
// })

// sending a request using express
const taskrouter = require("../route/Taskroute")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config()
const app = express()
const PORT1 = 8000;

/*
cors stands for Cross-Origin Resource Sharing, and it's a mechanism that allows or restricts web page access to a 
resource from a different domain.
So, with this configuration, my server allows cross-origin requests only from http://localhost:3000. If a request comes
 from a different origin, it would be blocked by the browser's security policies. This is a common setup during 
 development when frontend and backend are running on different servers, and want to enable them to communicate.
*/
app.use(cors(
    {origin:["http://localhost:3000"]}
))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(taskrouter)


mongoose
.connect(process.env.MONGO_URL) 
.then((req, res)=>{
    app.listen(PORT1,()=>{
           console.log(`SERVER 2 is now running`)
   })
    app.get("/", (req,res) =>{
        res.send("server now running")
    })
    console.log("db connected");
    app.get("/about", (req,res) =>{
        res.send("This is the about page");
    })
})
.catch((error)=>{
    console.log(error)
})





