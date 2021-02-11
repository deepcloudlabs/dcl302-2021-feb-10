const mongoose = require("mongoose");
require("./utils");

//region mongodb
// 1. mongodb connection
const mongodb_url = "mongodb://localhost:27017/hrdb";
const collection_name = 'employees';
const mongo_opts = {
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useCreateIndex": true,
    "useUnifiedTopology": true
}
mongoose.connect(mongodb_url, mongo_opts);
// 2. mongoose -> Schema -> Entity
const employeeSchema = new mongoose.Schema({
    "_id": {
        type: String,
        required: true
    },
    "fullname": {
        type: String,
        required: true,
        minLength: 5
    },
    "identityNo": { // tc kimlik no
        type: String,
        required: true,
        unique: true,
        validation: /^[1-9][0-9]{10}$/,
        validate: [
            tcKimlikNoValidator,
            "You must provide a valid identity no."
        ]
    },
    "salary": {
        type: Number,
        required: true,
        min: 5000
    },
    "iban": {
        type: String,
        required: true,
        validate: [
            ibanValidator,
            "You must provide a valid iban."
        ]
    },
    "birthYear": {
        type: Number,
        required: true
    },
    "photo": {
        type: String,
        required: false
    },
    "fulltime": {
        type: Boolean,
        required: false,
        default: true
    },
    "department": {
        type: String,
        enum: ["IT", "Sales", "Finance", "HR"],
        required: false,
        default: "Finance"
    },
    "version": {
        type: String,
        required: false,
        default: "1.2.0"
    }
});
// 3. CRUD Persistence Object
const Employee = mongoose.model(collection_name,employeeSchema );
//endregion

//region express + swagger ui configuration
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const openApiDoc = require("./swagger-hr");


const port = 7100;
const api = express();
api.use(bodyParser.json({limit : "3mb"}));
api.use(logger('dev'));
// CORS Filter
api.use(function(req,res,next){
   res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Methods", "HEAD, POST, PUT, DELETE, PATCH, GET");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
   next();
})
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDoc))
//endregion

//region rest over http

//endregion

//region rest over ws

//endregion

console.log("Server is up and running...")