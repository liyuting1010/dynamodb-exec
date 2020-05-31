const bodyParser = require('body-parser');
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./api/routes/projectRoutes');
routes(app);

app.listen(port);

console.log('dynamodb project RESTful API server started on: ' + port);
