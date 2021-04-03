import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { listRecipes } from '../actions/recipeActions';
import Rating from '../components/Rating';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const recipeList = useSelector((state) => state.recipeList);
  const { recipes, loading, error } = recipeList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listRecipes(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listRecipes(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listRecipes(category, searchKeyword, sortOrder));
  };

  return (
    <>
<div>

    <ul className="navbar">
      <li><a href="#aboutus" className="AB">About us</a></li>
      <li><a href="#quicklinks" className="QUI">Quicklinks</a></li> 
      <li><a href="#contact" className="CON">Contact</a></li> 
    </ul>
  
</div>
<div className="text">
  <p>COOK IT</p>
  <p>Unleash your talent</p>
  <p>enjoy with our recipes</p>


</div>
<div>
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
      </ul>

    </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
            <ul className="recipes">
              {recipes.map((recipe) => (
                <li key={recipe._id}>
                  <div className="recipe">
                    <Link to={'/recipe/' + recipe._id}>
                      <img
                        className="recipe-image"
                        src={recipe.image}
                        alt="recipe"
                      />
                    </Link>
                    <div className="recipe-name">
                      <Link to={'/recipe/' + recipe._id}>{recipe.name}</Link>
                    </div>
                    
                    <div className="recipe-price">${recipe.price}</div>
                    <div className="recipe-rating">
                      <Rating
                        value={recipe.rating}
                        text={recipe.numReviews + ' reviews'}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
    </>
  );
}
export default HomeScreen;
