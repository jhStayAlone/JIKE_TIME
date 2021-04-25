const http = require('http')

http.createServer((req, res) => {
    let body = []
    req.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk.toString())
    }).on('end', () => {
        // body = Buffer.concat(body).toString()
        console.log(body, 'body')
        res.writeHead(200, {'content-type': 'text/html'})
        res.end('stay alone!')
    })
}).listen(8088)

console.log('服务器已启动!!!')