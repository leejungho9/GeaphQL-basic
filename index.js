const { ApolloServer, gql } = require('apollo-server');
const {readFileSync} = require("fs");//node의 파일을 읽는 API
const { join } = require('path');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
    books : [Book]
  }
  type Book {
      bookId : Int
      title : String
      message : String
      author : String
      url : String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    books : () => {
        return JSON.parse(readFileSync(join(__dirname,"books.json")).toString());
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground : true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});