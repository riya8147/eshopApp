import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProductsPage from './ProductsPage'; // Import ProductsPage component

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State to manage user login status
  const [categories, setCategories] = useState([]); // State to store product categories

  // useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/v1/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Router>
      <div>
        <NavigationBar loggedIn={loggedIn} categories={categories} /> {/* Pass categories as prop */}
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/products">
            {/* Pass loggedIn and categories props to ProductsPage */}
            <ProductsPage loggedIn={loggedIn} categories={categories} />
          </Route>
          {/* Other routes */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
