let path = require('path');
let express = require('express');
let dataRouter = express.Router();
let mongo = require('mongodb').MongoClient;

dataRouter.get('/data/get-data', function (req, res) {
res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

dataRouter.post('data/insert-data', function (req, res) {

});

dataRouter.post('data/update-data', function (req, res) {
    
});

dataRouter.post('data/delete-data', function (req, res) {
    
});

module.exports = dataRouter;
