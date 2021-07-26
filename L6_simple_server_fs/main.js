const port = 3000,
  http = require('http'),
  httpStatus = require('http-status-codes'),
  fs = require('fs');

const getViewUrl = url => {
  return `views${url}.html`
}

const sendErrorResponse = res => {
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  })
  res.writeHead(httpStatus.NOT_FOUND)
  res.end('<h1>FILE NOT FOUND</h1>')
}

http.createServer((req, res) => {
  let url = req.url

  if (url.indexOf('.html') !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    })
    customReadFile(`./views${url}`, res)
  } else if (url.indexOf(".js") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/javascript"
    })
    customReadFile(`./public/js${url}`, res)
  } else if (url.indexOf(".css") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/css"
    })
    customReadFile(`./public/css${url}`, res)
  } else if (url.indexOf(".png") !== -1) {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "image/png"
    })
    customReadFile(`./public/images${url}`, res)
  } else {
    sendErrorResponse(res)
  }
  
}).listen(port)

console.log(`${port}`)

const customReadFile = (filePath, res) => {
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.log(error)
        sendErrorResponse(res)
        return
      }

      res.write(data)
      res.end()
    })
  } else {
    sendErrorResponse(res)
  }
}