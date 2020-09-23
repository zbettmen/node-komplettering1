const http = require("http");
const url = require("url");
const fs = require("fs");
const port = 3000;
let secretKey = "ALBATROSS";

http.createServer(respond).listen(port, () => {
  console.log("Server running at: " + port);
});

function respond(req, response) {
  let params = url.parse(req.url, true);

  if (params.query.key == secretKey) {
    fs.readFile("./secret.html", { encoding: "utf8" }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const content = data;
        response.end(content);
      }
    });
  } else {
    fs.readFile("./list.txt", { encoding: "utf8" }, (err, txtF) => {
      if (err) {
        console.log(err);
      } else {
        const txtFile = txtF;
        response.end(txtFile);
      }
    });
  }
}
