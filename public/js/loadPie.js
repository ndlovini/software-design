let request = new XMLHttpRequest();
request.open('GET','/data/get-piechart', true);

let requestErrorFunc = function(){
    alert("Could not load data");
}

request.onload = function(data){
    if (request.status >= 200 && request.status < 400){
        
        let data = JSON.parse(request.responseText);
        let total = Number(data[0]) + Number(data[1]);
        let PG = (Number(data[0])/total)*100;
        let UG = (Number(data[1])/total)*100;
        //document.getElementById("graphdiv").innerHTML = data;
        var pie_obj = {
            values: [PG,UG],
            labels: ["Post Grads","Under Grads"],
            type: 'pie'
        };

        var layout = {
            height: 400,
            width: 500
          };
        var pie_array = [pie_obj];
        //document.getElementById("graphdiv").innerHTML = f;
        Plotly.newPlot('graphdiv', pie_array,layout);
    }
    else {
        requestErrorFunc();
    }
};

request.onerror = requestErrorFunc;
request.send();