// import { useEffect, useState } from "react";
// import axios from "axios";
// import './Recipes.scss'
// import Footer from "../../Components/Footer/Footer";
// import Navbar from "../../Components/Navbar/Navbar";
// // import RecipeCard from "../../Components/RecipeCard";
// import { Link, useNavigate } from "react-router-dom";

// const Recipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [isPending, setIsPending] = useState(true);
//   const navigate = useNavigate();

//   const headers = [
//     {
//       title: "Breakfast"
//     },
//     {
//       title: "Lunch"
//     },
//     {
//       title: "Dinner"
//     },
//     {
//       title: "Dessert"
//     },
//     {
//       title: "Snacks"
//     },
//     {
//       title: "Beverages"
//     },
//     {
//       title: "Holidays"
//     },
//     {
//       title: "Regional Cusines"
//     },
//     {
//       title: "Special Diets"
//     },
//   ]

//   useEffect(() => {
//     axios.get("https://lacocina-api.onrender.com/api/v1/recipe")
//       .then(response => {
//         setRecipes(response.data.data);
//         setIsPending(false);
//       })
//       .catch(error => {
//         console.error("Failed to fetch recipes:", error);
//         setIsPending(false);
//       });
//   }, []);

//   const handleSavedClick = () => {
//     navigate('/saved')
//   }


//   return (
//     <div className="recipe">

//       <Navbar />

//       <div className="titles">
//           {headers.map((header, index) => (
//             <aside>
//               <p>{header.title}</p>
//             </aside>
//           ))}
//       </div>

//       <button type="button" id="all" className="btn"> Search all Recipes</button>
//       <button type="button" id="saved" className="btn" onClick={handleSavedClick}> Saved Recipes </button>

//       <div className="recipe-container">
//           <h3>Recipes you'll love</h3>
//           <p>Find a new favorite dish for your table with our collection of recipes.</p>

//           <div className="recipe-content">
//             {isPending ? (
//               <div>Loading recipes...</div>
//             ) : (
//               recipes.map(recipe => (
//                 <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="rep">
//                   <button type='button' id='rate'><i className='fa-solid fa-heart'></i></button>
//                   <img src={recipe.image} alt={recipe.title} />
//                   <h4>{recipe.title}</h4>
//                   <p>{recipe.dishType}</p>
//                   <p>{recipe.cuisineType}</p>
//                   {/* <p>{recipe.downloads}</p> */}
//                 </Link>
//               ))
//             )}
//           </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Recipes;


import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import RecipeCard from "../../Components/RecipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isPending, setIsPending] = useState(true);


  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const fetchAllRecipes = async () => {
    try {
      const response = await axios("https://lacocina-api.onrender.com/api/v1/recipe");
      setRecipes(response.data.data);
      setIsPending(false);
      console.log(response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="py-12 lg:px-24 md:pl-14 px-8 overflow-x-hidden">
        {/* recipe filter navbar */}
        <div>
          <ul className="list-none flex justify-between cursor-pointer space-x-2">
            <li className="flex items-center">
              <span className="inline-block font-medium">Breakfast</span>
              <span className="text-[#646464] inline-block pl-[.25em]">|</span>
            </li>
            <li className="flex items-center pl-1">
              <span className="inline-block font-medium">Lunch</span>
              <span className="text-[#646464] inline-block pl-[.25em]">|</span>
            </li>
            <li className="flex items-center pl-1">
              <span className="inline-block font-medium">Dinner</span>
              <span className="text-[#646464] inline-block pl-[.25em]">|</span>
            </li>
            <li className="flex items-center pl-1">
              <span className="inline-block font-medium">Dessert</span>
              <span className="text-[#646464]  sm: inline-block pl-[.25em]">|</span>
            </li>
            <li className="flex items-center pl-1">
              <span className="inline-block font-medium">Snacks</span>
              <span className="text-[#646464] inline-block pl-[.25em]">|</span>
            </li>
            <li className="flex items-center pl-1">
              <span className="inline-block font-medium">Beverages</span>
              <span className="text-[#646464] inline-block pl-[.25em]">|</span>
            </li>
            <li className="flex items-center pl-1">
              <span className="inline-block font-medium">Holidays</span>
              <span className="text-[#646464] inline-block pl-[.25em]">|</span>
            </li>
            <li className="flex items-center pl-1">
              <span className="inline-block font-medium">Regional&nbsp;Cuisines</span>
              <span className="text-[#646464] inline-block pl-[.25em]">|</span>
            </li>
            <li className="flex items-center pl-1">
              <span className="inline-block font-medium">Special&nbsp;Diets</span>
              <span className="text-[#646464] inline-block pl-[.25em]">|</span>
            </li>
          </ul>
        </div>
        <div className="flex my-6 py-6  md:space-x-16 space-x-4 font-semibold">
          <button
            type="button"
            className="text-[#DA0A0A] md:w-[328px] md:h-[64px] h-auto w-auto text-lg md:text-xl px-8 py-3 border-[#DA0A0A] border rounded-xl cursor-pointer"
          >
            Search all recipes
          </button>
          <button
            type="button"
            className="text-xl md:w-[328px] md:h-[64px] w-auto h-auto px-8 py-3 bg-[#FBCD08] rounded-xl cursor-pointer"
          >
            Saved recipes
          </button>
        </div>
        <div className="my-2 py-6">
          <div>
            <h3 className="font-[700] text-[24px] leading-[33px]">Recipes You'll Love</h3>
            <p className="text-lg font-[400] text-[18px] leading-[25px]">
              Find a new favorite dish for your table with our collection of recipes.
            </p>
          </div>

          <div className="py-6 my-6 grid lg:grid-cols-4 md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
            {!isPending &&
              recipes
                .filter((elem) => elem.rate >= 3)
                .map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    title={recipe.title}
                    imgUrl={recipe.image}
                    description={recipe?.description || ""}
                    id={recipe._id}
                  />
                ))}
          </div>
        </div>
        <div className="my-2 py-6">
          <div>
            <h3 className="font-[700] text-[24px] leading-[33px]">Breakfast</h3>
            <p className="text-lg font-[400] text-[18px] leading-[25px]">
              Find a new favorite dish for your table with our collection of recipes.
            </p>
          </div>

          <div className="py-6 my-6 grid lg:grid-cols-4 md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
            {!isPending &&
              recipes
                // .filter((elem) => elem.dishType.includes("breakfast"))
                .map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    title={recipe.title}
                    imgUrl={recipe.image}
                    description={recipe?.description || ""}
                  />
                ))}
          </div>
        </div>
        <div className="my-2 py-6">
          <div>
            <h3 className="font-[700] text-[24px] leading-[33px]">Lunch</h3>
            <p className="text-lg font-[400] text-[18px] leading-[25px]">
              Find a new favorite dish for your table with our collection of recipes.
            </p>
          </div>

          <div className="py-6 my-6 grid lg:grid-cols-4 md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
            {!isPending &&
              recipes
                // .filter((elem) => elem.dishType.includes("lunch"))
                .map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    title={recipe.title}
                    imgUrl={recipe.image}
                    description={recipe?.description || ""}
                  />
                ))}
          </div>
        </div>
        <div className="my-2 py-6">
          <div>
            <h3 className="font-[700] text-[24px] leading-[33px]">Dinner</h3>
            <p className="text-lg font-[400] text-[18px] leading-[25px]">
              Find a new favorite dish for your table with our collection of recipes.
            </p>
          </div>

          <div className="py-6 my-6 grid lg:grid-cols-4 gap-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {!isPending &&
              recipes
                // .filter((elem) => elem.dishType.includes("dinner"))
                .map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    title={recipe.title}
                    imgUrl={recipe.image}
                    description={recipe?.description || ""}
                  />
                ))}
          </div>
        </div>

        <div className="my-2 py-6">
          <div>
            <h3 className="font-[700] text-[24px] leading-[33px]">Dessert & Snacks</h3>
            <p className="text-lg font-[400] text-[18px] leading-[25px]">
              Find a new favorite dish for your table with our collection of recipes.
            </p>
          </div>

          <div className="py-6 my-6 grid lg:grid-cols-4 md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
            {!isPending &&
              recipes
                // .filter(
                //   (elem) => elem.dishType.includes("desserts") || elem.dishType.includes("snacks")
                // )
                .map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    title={recipe.title}
                    imgUrl={recipe.image}
                    description={recipe?.description || ""}
                  />
                ))}
          </div>
        </div>
        <div className="my-2 py-6">
          <div>
            <h3 className="font-[700] text-[24px] leading-[33px]">Beverages</h3>
            <p className="text-lg font-[400] text-[18px] leading-[25px]">
              Find a new favorite dish for your table with our collection of recipes.
            </p>
          </div>

          <div className="py-6 my-6 grid lg:grid-cols-4 md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
            {!isPending &&
              recipes
                // .filter((elem) => elem.dishType.includes("beverages"))
                .map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    title={recipe.title}
                    imgUrl={recipe.image}
                    description={recipe?.description || ""}
                  />
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recipes;