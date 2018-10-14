var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var data_array = [];

function getData(res) {
    mongo.connect(url,function(err,db){
        if (err) throw err;
        dbo = db.db('energy-viz');
        let query = {"building":"Amagumbi"};
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
                    } 
                }
            });
                      res.json(data_array);
        });
    });
}

function getHeatData(res) {
    var heat_array = [];
    var z_dimension = [];
    var x_dimension = [];
    var y_dimension = ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30',
    '05:00','05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30',
    '11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30',
    '17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30',
    '23:00','23:30'];
    
    mongo.connect(url,function(err,db){
        if (err) throw err;
        dbo = db.db('energy-viz');
        let query = {"building":"Amagumbi"};
        dbo.collection('Junction').find(query).toArray(function(err,result){
        if (err) throw err;
        result.forEach(function(document){
            for(var i = 0; i<7; i++){
                var _time = document.timestamp_week.split(" ");
                next_date = new Date(_time[0]);
                next_date.setDate(next_date.getDate()+i);
                x_dimension.push(next_date);
                var day = i.toString();
                var obj = document.values['1'];
                var z_array = Object.keys(obj).map(function(k){return obj[k]});
                if (z_dimension.length<48){
                    z_dimension.push(z_array);
                }
                else{
                    z_array.forEach(function(value,index){
                        z_dimension[index].push(value);
                    });
                }
                
                }
            });
            var heat_obj = {
                z: z_dimension,
                x: x_dimension,
                y: y_dimension,
                type: 'heatmap'
            };
            
            heat_array.push(heat_obj.z);
            heat_array.push(heat_obj.x);
            heat_array.push(heat_obj.y);
            //console.log(heat_array);
            res.json(heat_array);
        });
    
    });
}

function getPie(res){
    var result = [];
    mongo.connect(url,function(err,db){
        if (err) throw err;
        dbo = db.db('energy-viz');
        let pg_query = {"Res":"JCT2018","Academic_description":"PG"};
        let ug_query = {"Res":"JCT2018","Academic_description":"UG"};

        dbo.collection("Students").find(pg_query).toArray(function(err,array){
            if (err) throw err;
            result.push(array.length);
            dbo.collection("Students").find(ug_query).toArray(function(err,_array){
                if (err) throw err;
                result.push(_array.length);
                res.json(result);
                console.log(result);
            })
        });
        //var ug_count = dbo.collection("Students").countDocuments(ug_query);
        //console.log(pg_count);
        //var result = [pg_count,ug_count];
        //res.json(result);
    });
}//db.Students.find({"res":"JCT2018","Academic_description":"PG"}).count()

module.exports.getData = getData;
module.exports.getHeatData = getHeatData;
module.exports.getPie = getPie;