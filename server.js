var express = require('express')
var path = require("path")
const app = express();

app.use(express.static('/'))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./pages/index.html'))
})

app.listen(80)