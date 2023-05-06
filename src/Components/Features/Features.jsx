import React, { useState, useEffect } from 'react';
import './Features.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Features = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

  useEffect(() => {
    axios.get('https://lacocina-api.onrender.com/api/v1/recipe')
      .then(response => {
        setRecipes(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const startIndex = (displayedRecipes.length + 3) % recipes.length;
      const endIndex = (startIndex + 3) % recipes.length;
      setDisplayedRecipes(recipes.slice(startIndex, endIndex));
    }, 48 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [recipes, displayedRecipes]);

  useEffect(() => {
    setDisplayedRecipes(recipes.slice(0, 3));
  }, [recipes]);

  if (isLoading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div className="error-message">Failed to load recipes: {error.message}</div>;
  }

  return (
    <div className='features'>
      <h1>Featured Recipe</h1>
      <p>Try making meals from our featured recipes</p>

      <div className='container'>
        {Array.isArray(displayedRecipes) && displayedRecipes.map(recipe => {
          return (
            <Link
              className='flexItem'
              key={recipe._id}
              to={`/recipepage/${recipe._id}`}
            >
              <img src={recipe.image} alt={recipe.title} />
              <button type='button' id='rate'><i className='fa-solid fa-heart'></i></button>
              <p>{recipe.dishType}</p>
              <h4>{recipe.title}</h4>
              <p id='p'><i className='fa-solid fa-clock'></i> &nbsp; {recipe.readyInMinutes}Minutes</p>
            </Link>
          )
        })}
      </div>

      <Link to='/recipes' className='link'>Get cooking <i className='fa-solid fa-arrow-right'></i></Link>
    </div>
  );
};

export default Features;
