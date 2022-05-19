import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { getMe, deleteDrink } from '../utils/API';
import Auth from '../utils/auth';
import { removeDrinkId } from '../utils/localStorage';
const SavedDrinks = () => {
  const [userData, setUserData] = useState({});

 
  const userDataLength = Object.keys(userData).length;
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);
        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  const handleDeleteDrink = async (drinkId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteDrink(drinkId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
    
      removeDrinkId(drinkId);
    } catch (err) {
      console.error(err);
    }
  };


  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved drinks!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedDrinks.length
            ? `Viewing ${userData.savedDrinks.length} saved ${userData.savedDrinks.length === 1 ? 'drink' : 'drinks'}:`
            : 'You have no saved drinks!'}
        </h2>
        <CardColumns>
          {userData.savedDrinks.map((drink) => {
            return (
              <Card key={drink.drinkId} border='dark'>
                {drink.image ? <Card.Img src={drink.image} alt={`The cover for ${drink.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{driink.title}</Card.Title>
                  <p className='small'>Authors: {drink.authors}</p>
                  <Card.Text>{drink.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteDrink(drink.drinkId)}>
                    Delete this Drink!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedDrinks;
