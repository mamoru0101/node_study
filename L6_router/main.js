const port = 3000,
  http = require('http'),
  httpStatusCodes = require('http-status-codes'),
  router = require('./router'),
  fs = require('fs'),
  plainTextContentType = {"Content-Type": "text/plain"},
  htmlContentType = {"Content-Type": "text/html"};


const customReadFile = (filePath, res) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      console.log(error)
    }
    res.end(data)
  })
}

router.get("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType)
  res.end("INDEX")
})

router.get("/index.html", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType)
  customReadFile("views/index.html", res)
})

router.post("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType)
  res.end("POSTED")
})

http.createServer(router.handler).listen(port)
console.log(`${port}`)
