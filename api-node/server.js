const Redis = require("ioredis");
const axios = require("axios");
const http = require('http');
const cors = require('cors');
const {publishConfData} = require('./services/redis-server')
const app = require('./app');
app.use(cors());
const config = require('dotenv').config().parsed

const data = {
    channel:config.REDIS_CHANNEL,
    url:config.URL_API
}
publishConfData(data)

app.listen(config.SERVER_PORT,()=>{console.log(`server is running on port ${config.SERVER_PORT}`)})