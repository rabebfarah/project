import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import RecipeScreen from './screens/RecipeScreen';
import CartScreen from './screens/CartScreen'; 
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import RecipesScreen from './screens/RecipesScreen';
/* import ShippingScreen from './screens/ShippingScreen'; */
/* import PlaceOrderScreen from './screens/PlaceOrderScreen'; */
import ProfileScreen from './screens/ProfileScreen';
/* import OrdersScreen from './screens/OrdersScreen'; */

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

 /*  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  }; */
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
           { /*<button onClick={openMenu}>&#9776;</button> */}
            <Link to="/">Dbartii</Link>
          </div>
          <div className="header-links">
        

{/*            <a href="cart.html">Cart</a> 
 */}            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
                <Link to="/signin">Sign In/Register now</Link>
               
              )}
              {/* <ul className="navbar">
          <li><a href="#aboutus" className="AB" >About us</a></li>
          <li><a href="#quicklinks" className="QUI" id="quicklinks">Quicklinks</a></li> 
          <li><a href="#contact" className="CON" id="contact">Contact</a></li> 
        </ul> */}
            {userInfo && userInfo.isAdmin && (
               <Link to="/recipes">Recipes</Link>
              // <div className="dropdown">
              //   <a href="#">Admin</a>
              //   <ul className="dropdown-content">
              //     <li>
              //       <Link to="/orders">Orders</Link>
              //       <Link to="/recipes">Recipes</Link>
              //     </li>
              //   </ul>
              // </div>
            )}
          </div>
        
       {/*  <aside className="sidebar">
          <h3>choose a flavor of recipes</h3>
        {/*   <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>  
          <ul className="categories">
            <li>
              <Link to="/category/Salt">Salt</Link>
            </li>

            <li>
              <Link to="/category/Sweet">Sweet</Link>
            </li>
          </ul>
        </aside> */}</header>
        <main className="main">
          <div className="content">
           {/*  <Route path="/orders" component={OrdersScreen} /> */}
            <Route path="/profile" component={ProfileScreen} />
           {/*  <Route path="/order/:id" component={OrderScreen} /> */}
            <Route path="/recipes" component={RecipesScreen} />
            {/* <Route path="/shipping" component={ShippingScreen} /> */}

            {/* <Route path="/placeorder" component={PlaceOrderScreen} /> */}
            <Route path="/signin" exact={true} component={SigninScreen} />
            <Route path="/register" exact={true}component={RegisterScreen} />
            <Route path="/recipe/:id" exact={true} component={RecipeScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
    <footer>
    <div className="footer">
      <div className="aboutus" id="aboutus"> 
      <h2 >About us</h2>
      <p>Cooking is one of the most beautiful pleasures in life, so we wanted to facilitate this fun for you. We tried to provide you with a set of delicious recipes that we hope will satisfy you.</p>
      </div>

      <div>
      <ul className="sci">
        <li><i class="fab fa-facebook-f"></i></li>
        <li><i class="fab fa-twitter-square"></i></li>
        <li><i class="fab fa-instagram-square"></i></li>
        <li><i class="fab fa-youtube"></i></li>
      </ul>
      </div>

      <div className="quicklinks" id="quicklinks">
        <h2>Quick Links</h2>
        <ul>
        <li>About</li>
        <li>FAQ</li>
        <li>Privacy Policy</li>
        <li>Help</li>
        <li>Terms and Conditions</li>
        <li>Contact</li>
        </ul>
      </div>

      <div className="contact"id="contact">
        <h2>Contact Info</h2>
        <ul className="info">
          <li>
            <span><i class="fas fa-map-marker-alt"></i></span>
            <span>Ben Arous Mourouj5 Tunis</span>
          </li>
          <li>
            <span><i class="fas fa-phone-volume"></i></span>
            <p>tel:+216 52132812</p>
          </li>
          <li>
            <span><i class="fas fa-envelope-open-text"></i></span>
            <span>Ben Arous Mourouj5 Tunis</span>
          </li>
        </ul>
      </div>
     
 </div>
  <div className="copyright">
  <p>Copyright @2021 All Rights Reserved</p>
  </div>

</footer>
</div>
    </BrowserRouter>
  );
}

export default App;
