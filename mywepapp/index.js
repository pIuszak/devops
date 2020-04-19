const express = require("express");
const app = express();
const client redis.createClient({
host: 127:0.0.1,
port: 6379
});
app.get('/',(req,res) => {
res.send("XD webapp");
});

app.listen(8080, () => {
console.log("Listening to port 8080")
});
