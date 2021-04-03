import {
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FAIL,
  RECIPE_DETAILS_REQUEST,
  RECIPE_DETAILS_SUCCESS,
  RECIPE_DETAILS_FAIL,
  RECIPE_SAVE_REQUEST,
  RECIPE_SAVE_SUCCESS,
  RECIPE_SAVE_FAIL,
  RECIPE_DELETE_SUCCESS,
  RECIPE_DELETE_FAIL,
  RECIPE_DELETE_REQUEST,
  RECIPE_REVIEW_SAVE_REQUEST,
  RECIPE_REVIEW_SAVE_FAIL,
  RECIPE_REVIEW_SAVE_SUCCESS,
} from '../constants/recipeConstants';
import axios from 'axios';
import Axios from 'axios';

const listRecipes = (
  category = '',
  searchKeyword = '',
  sortOrder = ''
) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_LIST_REQUEST });
    const { data } = await axios.get(
      '/api/recipes?category=' +
      category +
      '&searchKeyword=' +
      searchKeyword +
      '&sortOrder=' +
      sortOrder
    );
    dispatch({ type: RECIPE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RECIPE_LIST_FAIL, payload: error.message });
  }
};

const saveRecipe = (recipe) => async (dispatch, getState) => {
  try {
    dispatch({ type: RECIPE_SAVE_REQUEST, payload: recipe });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!recipe._id) {
      const { data } = await Axios.post('/api/recipes', recipe, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: RECIPE_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/recipes/' + recipe._id,
        recipe,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: RECIPE_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: RECIPE_SAVE_FAIL, payload: error.message });
  }
};

const detailsRecipe = (recipeId) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_DETAILS_REQUEST, payload: recipeId });
    const { data } = await axios.get('/api/recipes/' + recipeId);
    dispatch({ type: RECIPE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RECIPE_DETAILS_FAIL, payload: error.message });
  }
};

const deleteRecipe = (recipeId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: RECIPE_DELETE_REQUEST, payload: recipeId });
    const { data } = await axios.delete('/api/recipes/' + recipeId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: RECIPE_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: RECIPE_DELETE_FAIL, payload: error.message });
  }
};

const saveRecipeReview = (recipeId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: RECIPE_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/recipes/${recipeId}/reviews`,
      review,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    dispatch({ type: RECIPE_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: RECIPE_REVIEW_SAVE_FAIL, payload: error.message });
  }
};

export {
  listRecipes,
  detailsRecipe,
  saveRecipe,
  deleteRecipe,
  saveRecipeReview,
};
