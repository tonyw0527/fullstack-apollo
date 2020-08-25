const { ApolloServer, gql } = require("apollo-server");

const mongoose = require('mongoose');
const logger = require('morgan');
const { TodoModel } = require("./data-sources/TodoModel");

logger('dev');

// ***몽구스 추가
mongoose.connect('mongodb://'
, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console,
    "connection error:"));
db.once('open', () => {
    console.log('DB connected');
});







// schema type definition
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
    }

    type Todo {
        _id: ID!
        title: String
        content: String
        done: Boolean
    }

    type Query {
        users: [User]
        user(id: ID!): User
        todo(_id: ID!): Todo
    }

    type Mutation {
        deleteUser(id: ID!): [User]
        UpdateTodoTitle(_id: ID!, newTitle: String): String
    }
`;

// schema resolvers
const resolvers = {
    Query: {
        users: async (_source, _args) => {
            return users;
        },
        user: async (parent, { id }) => {
            const user = await users.find((user) => user.id === id);
            if (user) {
                return user;
            } else {
                throw new Error("Not Found!");
            }
        },
        todo: (_, { _id }, { dataSources: { todoModel }}) => todoModel.getTodo(_id)
    },
    Mutation: {
        deleteUser: async (parent, { id }) => {
            const index = await users.findIndex((user) => user.id === id);
            if (index < 0 ) return users;
            users.splice(index, 1);
            console.log(users);
            return users;
        },
        UpdateTodoTitle: async (_, { _id, newTitle }, {dataSources: { todoModel }}) => todoModel.UpdateTodoTitle(_id, newTitle)
    }
};

// apollo-server construction
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        todoModel: new TodoModel()
    })
});

server.listen().then(({ url }) => {
    console.log(`Listening at ${url}`);
});


// dummy data
const users = [...Array(5).keys()].map((key) => ({
    id: key + "",
    name: `Name${key}`,
}));