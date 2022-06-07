const express = require('express');
const app = express();
const port = 4201;
const proxy = require('express-http-proxy');

app.use(express.static('./dist/automation_rules_editor'))
app.use('/*',proxy('http://localhost:'+port+'/*'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile('index.html',{root:__dirname})
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});