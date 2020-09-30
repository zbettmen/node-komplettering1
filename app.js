const express = require('express');
const { response } = require('express');
const personnummer = require("personnummer.js");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.set('query parser', 'simple')
app.get('/secret', (req, res) => {
  const query = new URLSearchParams(req.query)
  if (query.has('key')) {
    const key = query.get('key');
    if (key == 'secretKey') {
      res.sendFile('secret.html', {root : __dirname});
    }
    else {
      var options = {
        root: path.join(__dirname, '.'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
      res.sendFile('list.txt',options,(err)=>{
        if(err){
          res.send(err)
        }
        else{
          console.log('File sent')
        }
      });
    }
  }
  else{
    res.send('Key is not provided please try again')
  }
})


app.get('/*', (req, res) => {
  const path = req.path;
  if(path!='/favicon.ico' && path.length>1)
  {
    var socialNumberId=path.replace('/','');
    if (personnummer.validate(socialNumberId)) {
      res.sendFile('secret.html');
    }
    else {
      res.send("Social NumberId is not valid, try again");
    }
  }
  else{
    res.send('You didn\'t provide any social number id')
  }
})
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server listening on port ${PORT}...");
});