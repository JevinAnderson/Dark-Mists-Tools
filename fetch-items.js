const fs = require('fs');
const request = require('request');
const path = require('path');

request.get('http://api.dm.jevinanderson.com/items', (error, response, body) => {
  const json = JSON.parse(body);
  const data = JSON.stringify(json, null, 2);
  fs.writeFile(path.join(__dirname, 'items.json'), data, 'utf-8', error => {
    process.exit();
  })
})