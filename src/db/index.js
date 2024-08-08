const mongoose = require("mongoose")
const logger = require('../config/logger')
const { mongo_url } = require('../config/config');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(mongo_url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
        if(connection){
            logger.info('Database Connected')
        }
    } catch (error) {
        console.log(error)
        logger.error('Database Connection error')
        process.exit(1)
    }
}

module.exports = connectDB