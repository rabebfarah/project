import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsRecipe, saveRecipeReview } from '../actions/recipeActions';
import Rating from '../components/Rating';
import { RECIPE_REVIEW_SAVE_RESET } from '../constants/recipeConstants';
/* import image from '../food.jpg'; */

function RecipeScreen(props) {
  /* const [qty, setQty] = useState(1); */
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const recipeDetails = useSelector((state) => state.recipeDetails);
  const { recipe, loading, error } = recipeDetails;
  const recipeReviewSave = useSelector((state) => state.recipeReviewSave);
  const { success: recipeSaveSuccess } = recipeReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (recipeSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: RECIPE_REVIEW_SAVE_RESET });
    }
    dispatch(detailsRecipe(props.match.params.id));
    return () => {
      //
    };
  },[recipeSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveRecipeReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  /* const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty); 
  }; */

  return (
    <div>
     
    {/*   <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div> */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (   <>
       <div classename="navbarr">
        <ul className="navbar">
          <li><a href="#aboutus" className="AB">About us</a></li>
          <li><a href="#quicklinks" className="QUI">Quicklinks</a></li> 
          <li><a href="#contact" className="CON">Contact</a></li> 
        </ul>
        </div> 
         
              <div className="details">
                <div className="details-image">
                  <img src={recipe.image} alt="recipe"></img>
                </div>
                <div className="details-info">
                  <ul>
                    <li>
                      <h4>{recipe.name}</h4>
                    </li>
                    <li>
                      <a href="#reviews">
                        <Rating
                          value={recipe.rating}
                          text={recipe.numReviews + ' reviews'}
                        />
                      </a>
                    </li>
                    {/* <li>
                      Price: <b>${recipe.price}</b>
                    </li> */}
                    <li>
                     {/*  Description: */}
                  <div>{recipe.description}</div>
                    </li>
                  </ul>
                </div>
{/*                  <div className="details-action">
                   <ul>
                   <li>Price: {recipe.price}</li> 
                   <li>
                      Status:{' '}
                      {recipe.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                    </li>
                    <li>
                      Qty:{' '}
                      <select
                        value={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      >
                        {[...Array(recipe.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li> 
                    <li>
                      {recipe.countInStock > 0 && (
                        <button
                          onClick={handleAddToCart}
                          className="button primary"
                        >
                          Add to Cart
                        </button>
                      )}
                    </li> 
                  </ul>
                </div> */}
              </div>
               
             <div className="totalform">
              <div className="content-margined-review">
                <h2>Reviews</h2>
                {!recipe.reviews.length && <div>There is no review</div>}
                <ul className="review" id="reviews">
                  {recipe.reviews.map((review) => (
                    <div className="afterrev">
                    <li key={review._id}>
                      <div className="name">{review.name}</div>
                      < div className="rev">
                        <Rating value={review.rating}></Rating>
                      </div>
                      <div>{review.createdAt.substring(0, 10)}</div>
                      <div classename="comment">{review.comment}</div>
                    </li></div>
                  ))}
                  <li className="customerrev">
                    <h3>Write a customer review</h3>
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <ul className="form-container">
                          <li className="rating">
                            <label htmlFor="rating">Rating</label>
                            <select
                              name="rating"
                              id="rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very Good</option>
                              <option value="5">5- Excelent</option>
                            </select>
                          </li>
                          <li >
                            <label  htmlFor="comment">Comment</label>
                            <textarea
                              name="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </li>
                          <li>
                            <button type="submit" className="button primary">
                              Submit
                        </button>
                          </li>
                        </ul>
                      </form>
                    ) : (
                        <div >
                          Please <Link to="/signin">Sign-in</Link> to write a review.
                        </div>
                        
                      )}
                  </li>
                </ul>
                </div>
                </div>
            </>
          )}
         <div className="background2">
            <div className="yam">
            <h1>YAM YAM ,</h1>
            <p>Follow the steps </p><p>and try to cook with us</p><p>the most delicious meals</p> </div>
          <img src="../img/food.jpg" alt="img" width="1580px" height="800px" /></div>
 
          <div className="animee">
            <div className="1">
            <img src="../img/1.gif" alt="img" width="320px" height="200px" />
            </div>
            <div className="2">
            <img src="../img/2.gif" alt="img" width="320px" height="200px" />
            </div>   
            <div className="3">
            <img src="../img/3.gif" alt="img" width="320px" height="200px" />
            </div>   
            <div className="4">
            <img src="../img/4.gif" alt="img" width="310px" height="200px" />
            </div>
            <div className="5">
            <img src="../img/5.gif" alt="img" width="310px" height="200px" />
            </div>   
         </div>
         <div className="dbarti">
         <p>'Dbartii give you a chance to Show your cooking talent'</p></div>
                  {/*  <div className="animee">
            <div className="1">
            <img src="../img/1.gif" alt="img" width="320px" height="200px" />
            </div>
            <div className="2">
            <img src="../img/2.gif" alt="img" width="320px" height="200px" />
            </div>   
            <div className="3">
            <img src="../img/3.gif" alt="img" width="320px" height="200px" />
            </div>   
            <div className="4">
            <img src="../img/4.gif" alt="img" width="310px" height="200px" />
            </div>
            <div className="5">
            <img src="../img/5.gif" alt="img" width="310px" height="200px" />
            </div>   
         </div>   */}
         <div className="trailer">
            <iframe width="1500" height="800" src="https://www.youtube.com/embed/WEDndTCyGgU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
         

            </div>
    </div>
  );}
export default RecipeScreen;
