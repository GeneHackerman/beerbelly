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

<<<<<<< HEAD:brewers/client/src/pages/SavedDrinks.js
  const handleDeleteDrink = async (drinkId) => {
=======
  // create function that accepts the brewery's mongo _id value as param and deletes the brewery from the database
  const handleDeleteBrewery = async (breweryId) => {
>>>>>>> c80978a5865f979ba8df28698a2290472abdad1a:brewers/client/src/pages/SavedBreweries.js
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBrewery(breweryId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
<<<<<<< HEAD:brewers/client/src/pages/SavedDrinks.js
    
      removeDrinkId(drinkId);
=======
      // upon success, remove drink's id from localStorage
      removeBreweryId(breweryId);
>>>>>>> c80978a5865f979ba8df28698a2290472abdad1a:brewers/client/src/pages/SavedBreweries.js
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
          <h1>Viewing saved Breweries!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBreweries.length
            ? `Viewing ${userData.savedBreweries.length} saved ${userData.savedBreweries.length === 1 ? 'brewery' : 'breweries'}:`
            : 'You have no saved drinks!'}
        </h2>
        <CardColumns>
          {userData.savedBreweries.map((brewery) => {
            return (
              <Card key={brewery.breweryId} border='dark'>
                {brewery.image ? <Card.Img src={brewery.image} alt={`The cover for ${brewery.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{driink.title}</Card.Title>
                  <p className='small'>Authors: {brewery.authors}</p>
                  <Card.Text>{brewery.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBrewery(brewery.breweryId)}>
                    Delete this Brewery!
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
