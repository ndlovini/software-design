let request = new XMLHttpRequest();
request.open('GET','/data/get-heatmap', true);

let requestErrorFunc = function(){
    alert("Could not load data");
}

request.onload = function(data){
    if (request.status >= 200 && request.status < 400){


        var _data = [
            {
              z: [[1, 20, 30], [20, 1, 60], [30, 60, 1],[1,1,1]],
             
              x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              
              type: 'heatmap'
            }
          ];


        
        let data = JSON.parse(request.responseText);
        //document.getElementById("graphdiv").innerHTML = data;
        var heat_obj = {
            z: data[0],
            x: data[1],
            y: data[2],
            type: 'heatmap'
        };
        var heat_array = [heat_obj];
        //document.getElementById("graphdiv").innerHTML = f;
        Plotly.newPlot('graphdiv', heat_array);
    }
    else {
        requestErrorFunc();
    }
};

request.onerror = requestErrorFunc;
request.send();