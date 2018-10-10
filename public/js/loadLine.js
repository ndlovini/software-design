let request = new XMLHttpRequest();
request.open('GET','/data/get-line', true);

let requestErrorFunc = function(){
    alert("Could not load data");
}

request.onload = function(data){
    if (request.status >= 200 && request.status < 400){
        
        let data = JSON.parse(request.responseText);
        //document.getElementById("graphdiv").innerHTML = new_data;
        data.forEach(function(entry){
            entry[0] = entry[0].replace(/T/g,' ');
            entry[0] = entry[0].replace(/Z/g,'');
            entry[0] = new Date(entry[0]);
        });
        
        graph = new Dygraph(document.getElementById("graphdiv"), 
            data,
            {
                labels: ["time","energy"]
            }
        );  
    }
    else {
        requestErrorFunc();
    }
};

request.onerror = requestErrorFunc;
request.send();