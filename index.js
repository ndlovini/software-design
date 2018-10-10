let path = require('path');
let express = require('express');
let mainRouter = require('C:/Users/Ndooba/Desktop/Design II/energy-viz/server/mainRoute.js');
let dataRouter = require('C:/Users/Ndooba/Desktop/Design II/energy-viz/server/dataRoute.js');
let mongo = require('mongodb').MongoClient;
let assert = require('assert');
let mongo_url = "mongodb://localhost:27017/energy-viz";
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cdn', express.static('public'));
app.use('/', mainRouter);
app.use('/data', dataRouter);

app.listen(3000);
console.log("Express server running on port 3000");