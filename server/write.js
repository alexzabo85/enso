const Redis = require('ioredis')                           // (1)
const fs = require('fs');

const redisSub = new Redis()
redisSub.subscribe('topic1')
redisSub.on('message', (channel, msg) => {
  console.log(`channel: ${channel} msg: ${msg}`)
  fs.writeFileSync('count.txt', msg)
})
