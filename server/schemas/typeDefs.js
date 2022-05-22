const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Brewery {
    authors: [String]
    description: String
    breweryId: String!
    image: String
    link: String
    title: String!
  }
  type User {
    _id: ID
    username: String!
    email: String!
    breweryCount: Int
    savedBreweries: [Brewery]
  }
  type Auth {
    token: ID!
    user: User
  }
  input SavedBreweryInput {
    authors: [String]
    title: String
    description: String
    breweryId: String
    image: String
    link: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBrewery(input: SavedBreweryInput): User
    removeBrewery(BreweryId: String!): User
  }
`;
module.exports = typeDefs;
