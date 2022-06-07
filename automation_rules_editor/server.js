const fs = require('fs');
const proxy = require('express-http-proxy');
const express = require('express');
const app = express();
const port = 4201;

app.use(express.static('./dist/automation_rules_editor'));
// app.use('/*',proxy('http://localhost:'+port+'/*'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile('index.html', {root:__dirname});
});

app.get('/json', (req, res) => {
    var json_object = JSON.parse(fs.readFileSync('./dist/automation_rules_editor/assets/rules.json','utf-8'));
    res.json(json_object);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});