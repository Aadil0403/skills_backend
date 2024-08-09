const express = require('express')
const cors = require('cors')
const config = require('./config/config')
const morgan = require("./config/morgan");
const {userRoute} = require('./api/routes')
const {globalErrorHandler} = require('./api/middlewares')

const appLoader = async(app) => {
    app.get('/',(req,res) => {
        res.status(200).end()
    })
    app.head('/',(req,res) => {
        res.status(200).end()
    })

    if(config.mode !== "test"){
        app.use(morgan.successHandler);
        app.use(morgan.errorHandler);
    }
    
    app.use(express.json())
    app.use(cors({
        origin : function (origin, callback) {
            if (origin === config.client_url || origin === config.admin_url) {
              callback(null, true)
            } else {
              callback(new Error('Not allowed by CORS'))
            }
          }
    }))
    app.use(express.urlencoded({ extended: true }));

    app.use('/users/',userRoute)

    app.use(globalErrorHandler)
}

module.exports = appLoader