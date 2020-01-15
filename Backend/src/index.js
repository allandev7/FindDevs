const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
//Query Params, sao os parametros da url        req.query
//Route Params, parametro da url sem 'vvariavel' como id    req.params
//Body, formulario que esta sendo enviado   req.body

mongoose.connect('mongodb://omnistack:omnistack@cluster0-shard-00-00-f7rwe.mongodb.net:27017,cluster0-shard-00-01-f7rwe.mongodb.net:27017,cluster0-shard-00-02-f7rwe.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology:true });


app.use(express.json());
app.use(routes);

app.listen(3333);