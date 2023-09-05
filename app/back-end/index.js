const http = require('http');
const path = require('node:path');
const express = require('express');
var session = require('express-session');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(session({ secret: 'abc123Secrect' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('port', 3001);



app.get('/', async (req, res) => {
    res.send([
        'Ok!',
    ]);
});

server.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}/home`)
});

const mongo = require('mongoose')
mongo.connect('')