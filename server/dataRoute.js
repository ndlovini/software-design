let path = require('path');
let express = require('express');
let dataRouter = express.Router();
let mongo = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
var data = require('./getLineGraph');

dataRouter.use(bodyParser.urlencoded({ extended: true }));

dataRouter.post('/get-data', function (req, res) {
    console.log('submitted ', req.body.line_graph);
    res.sendFile(path.join(__dirname, '../views', 'showGraph.html'));
});

dataRouter.post('/get-heat', function (req,res){
    res.sendFile(path.join(__dirname, '../views', 'showHeat.html'))
})

dataRouter.post('/get-pie', function (req,res){
    res.sendFile(path.join(__dirname, '../views', 'showPie.html'))
})

dataRouter.get('/get-line', function(req,res){
    data.getData(res);
})

dataRouter.get('/get-heatmap', function(req,res){
    data.getHeatData(res);
})

dataRouter.get('/get-piechart', function(req,res){
    data.getPie(res);
})

dataRouter.post('data/insert-data', function (req, res) {

});

dataRouter.post('data/update-data', function (req, res) {
    
});

dataRouter.post('data/delete-data', function (req, res) {
    
});

module.exports = dataRouter;
