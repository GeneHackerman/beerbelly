const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Drink {
    authors: [String]
    description: String
    drinkId: String!
    image: String
    link: String
    title: String!
  }
  type User {
    _id: ID
    username: String!
    email: String!
    drinkCount: Int
    savedDrinks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  input SavedDrinkInput {
    authors: [String]
    title: String
    description: String
    drinkId: String
    image: String
    link: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveDrink(input: SavedDrinkInput): User
    removeDrink(drinkId: String!): User
  }
`;
module.exports = typeDefs;
