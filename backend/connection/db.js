const mongoose = require("mongoose")


const connection = mongoose.connect("mongodb+srv://hrusikeshviroot:hrusikesh@cluster0.qdkjhsq.mongodb.net/")

module.exports={connection}