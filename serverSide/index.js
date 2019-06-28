// call apollo server
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');

// Type Defs
const typeDefs = require('./graphql/typeDefs');

// Resolvers
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({req}) => ({req})
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    console.log('MONGODB connected..')
    return server.listen({port: 5000})})
.then(res => console.log(`Server running at ${res.url}`));





