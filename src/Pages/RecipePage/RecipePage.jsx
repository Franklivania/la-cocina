import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const RecipePage = () => {
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`https://lacocina-api.onrender.com/api/v1/recipe/getAllRecipes/${recipeId}`)
      .then(response => {
        setRecipe(response.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
        console.log(error);
      });
  }, [recipeId]);
  
  

  if (isLoading) {
    return <div>Loading recipe...</div>;
  }

  if (error) {
    return <div className="error-message">Failed to load recipe: {error.message}</div>;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className='recipePage'>
      <Navbar />
      
      <div className="container">

        <h1>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} />
        <p>Dish Type: {recipe.dishType}</p>
        <p>Ready in {recipe.readyInMinutes} minutes</p>
        <p>Instructions: {recipe.instructions}</p>
        {/* Render other recipe details as needed */}

      </div>

      <Footer />
    </div>
  );
};

export default RecipePage;
