const express = require("express")
const route = express.Router()
const path = require("path")
const db = require("./dbConfig")
const fs = require("fs")
// --------------start Upload file-----------------
const multer = require('multer')
// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
route.use('/images', express.static(path.join(__dirname, 'uploads', 'images')));
// ---------------End Upload file------------------


// -----------Start GET Method with DB-------------
route.get("/posts",(req,res)=>{
    const query = "SELECT * FROM posts ORDER BY id DESC"
    db.query(query,(err,data)=>{
        if(err) throw res.status(401).json("ERROR: "+err)
        return res.status(200).json(data)
    })
})
// ------------End GET Method with DB--------------

// -----------Start POST Method with DB------------
route.post("/posts",upload.single("file"),(req,res)=>{
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const fileRes = {
        name: req.file.filename,
        path: path.join(__dirname, req.file.path),
        size: req.file.size
    }
    // res.status(200).json(fileRes)
    const fields = [ req.body.title,req.body.description,fileRes.name,req.body.status]
    const query = `INSERT INTO posts (title,description,file,status) VALUES (?)`
    db.query(query,[fields],(err,data)=>{
        if(err) throw res.status(401).json("ERROR: "+err)
        if(data.affectedRows) return res.status(200).json({message:"Record Inserted"})
        return res.status(200).json({message:"SERVER SIDE ERROR !"})
    })
})
// ------------End POST Method with DB-------------

// ----------Start DELETE Method with DB-----------
route.delete("/posts/delete/:id/:img",(req,res)=>{
    const id = req.params.id
    const filePath = "uploads/images/" + req.params.img 
    // res.send({ID:id,file:filePath})
    fs.unlink(filePath,(err)=>{
        if(err) return res.status(404).json("ERROR : "+err)
        const query = `DELETE FROM posts WHERE id = ${id}`
        db.query(query,[id],(error,data)=>{
            if(error) throw res.status(401).json("ERROR: "+error)
            return res.status(200).json("Post deleted successfully".toUpperCase())
        })
    })
})
// -----------END DELETE Method with DB------------


module.exports = route

