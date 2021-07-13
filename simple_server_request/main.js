const port = 3000,
  http = require('http'),
  httpStatus = require("http-status-codes").StatusCodes,
  app = http.createServer();

app.on("request", (req, res) => {
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  })

  const responseMessage = "<h1>This will show on the screen.</h1>"
  res.end(responseMessage)

  // log
  console.log(req.method) // => GET
  console.log(req.url) // => /
  console.log(req.headers) // => {
                           //      host: 'localhost:3000',
                           //      connection: 'keep-alive',...


})

app.listen(port)
console.log(`The server has started and is listening on port number: ${port}`)

