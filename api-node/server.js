const Redis = require("ioredis");
const axios = require("axios");
const http = require('http');
const cors = require('cors');
const {publishConfData,receiveRedisDataFromKey} = require('./services/redis-server')
const {initCronTab} = require('./crontab/')
const app = require('./app');
app.use(cors());
const config = require('dotenv').config().parsed
const redisClient = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
});

const data = {
    channel:config.REDIS_CHANNEL,
    url:config.URL_API
}
publishConfData(data)

const server = http.createServer(app);

 const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    }
  });
receiveRedisDataFromKey(io);

const client = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
});

initCronTab(redisClient,client,io);



server.listen(config.SERVER_PORT,()=>{console.log(`server is running on port ${config.SERVER_PORT}`)})





