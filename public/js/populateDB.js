var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs = require('fs');
var csv = require('csvtojson');
var file_path = 'C:/Users/Ndooba/Desktop/Design II/Data/clean_Amagumbi.csv';

mongo.connect(url,function(err,db){
    if (err) throw err;
    var dbo = db.db('energy-viz');

    csv().fromFile(file_path).then((jsonObj)=>{
        //console.log(jsonObj);

        //console.log(schemaObj);
        var count = 0;
        var count2 = 0;
        var day_obj = {};
        var week_obj = {};
        var line_number = 0;
        var final_time = '';
        jsonObj.forEach(function(line){
            day_obj[count] = Number(line.Reading);
            count++;
            
            if (count == 48) {
                week_obj[count2] = day_obj;
                count = 0;
                count2++;
                day_obj = {};
            } 

            if (count2 == 7){
                var schemaObj = {
                    place: "Junction",
                    building: "Amagumbi",
                    station_type: "sub",
                    type: "energy",
                    timestamp_week: line.Date_time,
                    values: week_obj
                };
                count2 = 0;
                dbo.collection('Junction').insertOne(schemaObj,function(err,res){
                    if (err) throw err;
                    console.log('document added to junction collection');
                    
                })

                week_obj = {};
            }
            final_time = line.Date_time;
        })

        week_obj[count2] = day_obj;
        var schemaObj = {
            place: "Junction",
            building: "Amagumbi",
            station_type: "sub",
            type: "energy",
            timestamp_week: final_time,
            values: week_obj
        };

        dbo.collection('Junction').insertOne(schemaObj,function(err,res){
            if (err) throw err;
            console.log('document added to junction collection');
            
        })

        db.close();

    })

    
});