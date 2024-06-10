import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import path from "./routes/path.js";
import Login from "./pages/login/login.jsx";
import Home from "./pages/home/Home.jsx";


function App() {

  return (
    // <div>
    //   <Login />
    // </div>

      <>
      <BrowserRouter>
        {/*<Header />*/}
        <Routes>
          <Route path={path.login} element={<Login />} />
          <Route path={path.home} element={<Home />} />
          {/*<Route path="/products" element={<Products />} />*/}
          {/*<Route path="/contact" element={<Contact />} />*/}
          {/*<Route path="/single-product/:id" element={<SingleProduct />} />*/}
          {/*<Route path="/cart" element={<Cart />} />*/}
          {/*<Route path="*" element={<ErrorPage />} /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      </>
  )
}

export default App
