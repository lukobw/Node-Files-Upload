var http = require('http'),
    colors = require('colors'),
    handlers = require('./handlers');

function start() {
    function onRequest(req, res) {
        console.log('Receiving request.'.green);
        console.log('Request ' + req.url + ' received');
        res.writeHead(200, {'Content-Type': 'text/plain'});

        switch (req.url) {
            case '/':
            case '/start':
                handlers.welcome(req, res);
                break;
            case '/upload':
                handlers.upload(req, res);
                break;
            case '/show':
                handlers.show(req, res);
                break;
            default:
                handlers.error(req, res);
        }
    }

    http.createServer(onRequest).listen(8085);
    console.log('Server online!'.green);
}

exports.start = start;
