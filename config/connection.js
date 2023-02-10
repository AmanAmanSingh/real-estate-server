const express = require("express");
const mongoose = require("mongoose");

mongoose.set('strictQuery', true)
const mongooseConnection = async () => {
    await mongoose.connect(process.env.DATABASE_URI, () => {
        console.log("database connected")
    }, (e) => {
        console.log(e.message)
    })
}


module.exports = mongooseConnection