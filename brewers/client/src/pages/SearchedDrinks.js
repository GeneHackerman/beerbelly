import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveDrink, searchGoogleBooks } from '../utils/API';  // MAKE CHANGES IN searchGoogleBooks
import { saveDrinkIds, getSavedDRinkIds } from '../utils/localStorage';
const SearchDrinks = () => {
  // create state for holding returned google api data
  const [searchedDrinks, setSearchedDrinks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedDrinkIds, setSavedDrinkIds] = useState(getSavedBookIds());

  // set up useEffect hook to save `savedDrinkIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput); // MAKE CHANGES IN searchGoogleBooks
      if (!response.ok) {
        throw new Error('Ops! Something went wrong!');
      }

      const { items } = await response.json();
      const drinkData = items.map((book) => ({
        drinkId: drink.id,
        authors: driink.volumeInfo.authors || ['No drinks to display'],
        title: drink.volumeInfo.title,
        description: drink.volumeInfo.description,
        image: drink.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedDrinks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveDrink = async (drinkId) => {
    // find the book in `searchedDrinks` state by the matching id
    const drinkToSave = searchedDrinks.find((drink) => drink.drinkId === drinkId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveDrink(drinkToSave, token);
      if (!response.ok) {
        throw new Error('Ops! Something went wrong!');
      }

      // if book successfully saves to user's account, save drink id to state
      setSavedSDrinkIds([...savedDrinkIds, drinkToSave.drinkId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Drinks!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedDrinks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <CardColumns>
          {searchedDrinks.map((book) => {
            return (
              <Card key={drink.drinkId} border='dark'>
                {drink.image ? (
                  <Card.Img src={drink.image} alt={`The cover for ${drink.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{drink.title}</Card.Title>
                  <p className='small'>Authors: {drink.authors}</p>
                  <Card.Text>{drink.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedDrinkIds?.some((savedDrinkId) => savedDrinkId === drink.drinkId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveDrink(drink.drinkId)}>
                      {savedDrinkIds?.some((savedDrinkId) => savedDrinkId === drink.drinkId)
                        ? 'This Drink has already been saved to your Favorite Drinks list!'
                        : 'Save this Drink to your favorites!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchDrinks;

