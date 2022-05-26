import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_DRINK = gql `
  mutation saveDrink ($input: drinkInput!) {
      saveDrink(input: $input) {
          _id
          username
          email
          savedbreweries {
              drinkId
              image
              description
              link
          }
      }
  }

`;

export const REMOVE_DRINK = gql `
  mutation removeDrink ($drinkId: String!) {
      removeDrink(drinkId: $rinkId) {
          _id
          username
          email
          drinkCoount
          savedDrinks {
              drinkId
              image
              description
              link
          }
      }
  }
`

