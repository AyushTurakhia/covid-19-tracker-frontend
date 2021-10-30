
const express = require('express');
const path = require('path')
const app = express();


app.use(express.static('./dist/covid19-frontend'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/covid19-frontend/'});
  });

app.listen(process.env.PORT || 8080,()=>console.log("running...."));