const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import models
const Event = require('./models/Event');
const User = require('./models/User');

// import graphQL
const root = require('./graphQL/resolver/root');
const schema = require('./graphQL/schema/index');

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  res.redirect('/graphql');
})
app.all('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
  

mongoose.connect(`mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@${process.env.mongo_host}/${process.env.mongo_database}?retryWrites=true`, { useNewUrlParser: true }).then(
  () => {
    const port = process.env.PORT || 4000;
    app.listen(port, process.env.IP ,()=>{
      console.log('>> App is Running at localhost:4000/graphql');
    });
  }
).catch(err => console.log(err));
