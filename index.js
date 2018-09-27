let path = require('path');
let express = require('express');
let mainRouter = require('C:/Users/Ndooba/Desktop/Design II/energy-viz/server/mainRoute.js');
let app = express();

app.use('/cdn', express.static('public'));
app.use('/', mainRouter);

app.listen(3000);
console.log("Express server running on port 3000");