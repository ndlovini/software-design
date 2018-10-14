var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs = require('fs');
var csv = require('csvtojson');
var file_path = 'C:/Users/Ndooba/Desktop/Design II/Residence_Occupation_Data_2013-2018.csv';

mongo.connect(url,function(err,db){
    if (err) throw err;
    var dbo = db.db('energy-viz');

    csv().fromFile(file_path).then((jsonObj)=>{
        jsonObj.forEach(function(line){
            //console.log(line['Year of Study']);
            var res_id = line['Residence Code']+line['Academic Year'].toString();
            //console.log(res_id);
            
            var studentObj = {
                Academic_description : line['Program Category'],
                Faculty : line['Program Faculty Name'],
                Year : Number(line['Academic Year']),
                Res : res_id
            };
            dbo.collection('Students').insertOne(studentObj,function(err,res){
                if (err) throw err;
            });
        });
    });
});