export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const saveDrink = (drinkData, token) => {   
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(drinkData),
  });
};


export const deleteDrink = (drinkId, token) => {  
  return fetch(`/api/users/books/${drinkId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};


export const searchBrewery = (query) => {
  return fetch(`https://api.openbrewerydb.org/breweries?by_city=${query}`); // make a search to " xyz........"  api
};
