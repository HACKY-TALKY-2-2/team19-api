const express = require('express')
const app = express()
const Route = require("./routes/Route");


app.use(express.json());
app.use("/", Route);
app.listen(8080, () => {
  console.log("Example app listening on port 8080")
})