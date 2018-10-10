var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var data_array = [];
//var exportFunc = function(){module.exports.getData = getData;};

function getData(res) {
    mongo.connect(url,function(err,db){
        if (err) throw err;
        dbo = db.db('energy-viz');
        let query = {"values.0.0":-1};
        dbo.collection('Junction').find(query).toArray(function(err,result){
        if (err) throw err;
        result.forEach(function(document){
            for(var i = 0; i<7; i++){
                for(var j = 0; j<48; j++){
                    var time = document.timestamp_week.split(" ");
                    var split_time = time[1].split(":");
                    var hour = split_time[0];
                    var minute = split_time[1];
                    var num = j/2;
                    var hour_count = parseInt(num,10);
                                
                    var new_hour = Number(hour-(23-hour_count));
                    var new_minute = "";
                                
                    if (j%2 == 0) new_minute = "00";
                    else if (j%2 != 0) new_minute = "30";
                               
                    var i_string = i.toString();
                    var j_string = j.toString();
                    var new_date = time[0].replace(/-/g,"/" );
                    var new_time = new_hour.toString()+":"+new_minute+":00";
                    data_array.push([new Date(new_date+" "+new_time), document.values['1']['1']]);
                    //console.log(data_array);
                    } 
                }
            });
    
                    /*
                    graph = new Dygraph(
                        document.getElementById("graphdiv"),  // containing div
                        data_array                                 // the options
                      );*/
                      //console.log(data_array);
                      res.json(data_array);
    
        });
    
            
        
        
        //db.close();
    });
}

module.exports.getData = getData;