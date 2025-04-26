import './App.css';


import Footer from './components/footer.js'
import NavBar from './components/nav_bar.js';


import Home from "./pages/Home";
import Contact from "./pages/contact";
import Items from "./pages/items";
import ProductPage from './pages/product-page.js';
import Cart from './pages/cart.js';
import Loginpage from './pages/Loginpage.js';
import Signinpage from './pages/signinpage.js';
import LoginAdmin from './pages/LoginAdmin.js'
import AdminSignUp from './pages/AdminSignin.js';
import AdminDashboard from './pages/AdminDashboard.js';


import { useEffect, useState } from "react";
import { BrowserRouter,Route,Switch} from 'react-router-dom';




function App() {
  
  const [products, setProducts] = useState([]); // State to store products

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())  // Parse response as JSON
      .then((data) => setProducts(data)) // Save data (products) in state
      .catch((err) => console.error(err));  // Handle errors
  }, []); // Empty dependency array ensures this runs once on component mount
  console.log(products)
  




  const [cart,setCart]  =useState([])
  const handleAddEntry = (newEntry) => {
    setCart([...cart, newEntry]);
  };
  return (
    <BrowserRouter>
        <NavBar></NavBar>
        <Switch>
        <Route exact path='/'  ><Home prod ={products}/></Route>
        <Route exact path='/items' ><Items prod={products}/></Route>
        <Route exact path='/contact' ><Contact/></Route>
        <Route exact path='/product-page/:index'><ProductPage onAddEntry={handleAddEntry} prods={products} /></Route>
        <Route exact path='/cart'><Cart items={cart}/></Route>
        <Route exact path='/login'><Loginpage/></Route>
        <Route exact path='/signup'><Signinpage/></Route>
        <Route exact path='/Adminlogin'><LoginAdmin/></Route>   
        <Route exact path='/signinadmin'><AdminSignUp/></Route>
        <Route exact path='/AdminDashboard'><AdminDashboard products ={products} /></Route>

        </Switch>
      <footer >
        <Footer ></Footer>
      </footer>
    </BrowserRouter>
  );
}

export default App;
