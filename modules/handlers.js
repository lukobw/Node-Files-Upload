var fs = require('fs'),
    formidable = require('formidable');

exports.welcome = (req, res) => {
    console.log('Welcome request is being proceed');
    fs.readFile('templates/start.html', (err, html) =>{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(html);
        res.end();
    });
};

exports.error = (req, res) => {
    console.log('Bad request');
    res.write('404 :(');
    res.end();
};

exports.upload = (req, res) => {
    console.log('Upload request is being proceed');
    var form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        fs.renameSync(files.upload.path, 'test.png');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Received image: <br/>');
        res.write("<img src='/show' />");
        res.end();
    });
};

exports.show = (req, res) => {
    fs.readFile('test.png', 'binary', (error, file) => {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(file, 'binary');
        res.end();
    });
};
