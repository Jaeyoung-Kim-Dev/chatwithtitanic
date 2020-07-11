var fs = require('fs')
var data = require('./data.json')

console.log(data.name);

fs.readFile('./data.json', 'utf-8', (err, data) => {
    var data2 = JSON.parse(data)
    console.log(data2.name);
})