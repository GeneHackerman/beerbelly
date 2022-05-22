
const {ApolloServer} = require ('apollo-server-express');


const express = require('express');
const path = require('path');
const db = require('./config/connection');

const routes = require('./routes');

const { typeDefs, resolvers } = require("./schemas");  // Mariana added this
const { authMiddleware } = require("./utils/auth");  // Mariana added this

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


server.applyMiddleware({ app });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {  // if we're in production, serve client/build as static assets
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);
db.once('open', () => {
  app.listen(PORT, () => console.log(`We are now live on localhost:${PORT}`));
});
