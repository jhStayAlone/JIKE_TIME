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
        res.end(
            `
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <style>
.box {
    display: flex;
    width: 500px;
    height: 300px;
    background-color:rgb(0,0,0);
}
.box .header {
    width: 100px;
    height: 100px;
    background-color:rgb(255,0,0);
}
.box .content {
    width: 200px;
    height: 200px;
    background-color:rgb(0,255,0);
}
.box .footer {
    flex: 1;
    background-color:rgb(0,0,255);
}
    </style>
    <div class="box">
        <div class="header"></div>
        <div class="content"></div>
        <div class="footer"></div>
    </div>
    <script></script>
</body>
</html>
            `
        )
    })
}).listen(8088)

console.log('服务器已启动!!!')