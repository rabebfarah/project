import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveRecipe,
  listRecipes,
  deleteRecipe,
} from '../actions/recipeActions';

function RecipesScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const recipeList = useSelector((state) => state.recipeList);
  const { loading, recipes, error } = recipeList;

  const recipeSave = useSelector((state) => state.recipeSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = recipeSave;

  const recipeDelete = useSelector((state) => state.recipeDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = recipeDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listRecipes());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (recipe) => {
    setModalVisible(true);
    setId(recipe._id);
    setName(recipe.name);
    setPrice(recipe.price);
    setDescription(recipe.description);
    setImage(recipe.image);
    setBrand(recipe.brand);
    setCategory(recipe.category);
    setCountInStock(recipe.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveRecipe({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const deleteHandler = (recipe) => {
    dispatch(deleteRecipe(recipe._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="recipe-header">
        <h3>Recipes</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Recipe
        </button>
      </div>
      

      <div className="recipe-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
             {/* // <th>Price</th> */}
              <th>Flavor</th>
             {/* // <th>Brand</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe._id}</td>
                <td>{recipe.name}</td>
              {/* //  <td>{recipe.price}</td> */}
                <td>{recipe.category}</td>
              {/* //  <td>{recipe.brand}</td> */}
                <td>
                  <button className="button" onClick={() => openModal(recipe)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(recipe)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalVisible && (
        <div className="formedit">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Recipe</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              {/* <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li> */}
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              {/* <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li> */}
              {/* <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li> */}
              <li>
                <label htmlFor="name">Flavor</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
    </div>
  );
}
export default RecipesScreen;