const express = require("express")
const cors = require("cors")
const app = express()
const port = 7000


app.use(cors())







app.get("/",(req,res)=>{
    res.send("Welcome to API")
})

// this is from posts api
const postRoute = require("./postController")
app.use("/api",postRoute)


app.use("/*",(req,res)=>{
    res.status(404).json({
        message:"Page not found",
        status:404
    })
})

app.listen(port,()=>{
    console.log({SERVER:`running on port ${port}`.toUpperCase()})
})
