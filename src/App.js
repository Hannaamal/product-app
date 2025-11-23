import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import ViewProduct from "./components/ViewProduct";
import EditProduct from "./components/EditProduct";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/productedRoute";
import { AuthProvider } from "./context/AuthContext";



function App() {
  const [products, setProducts] = useState([]);
  

  return (
    <AuthProvider>
    <Router>
      <Header/> 
      <Routes>
        <Route
          path="/"
          element={<Home products={products} setProducts={setProducts} />}
        />
        <Route
        
          path="/add-product"
          element={  
         <ProtectedRoute allowedRoles={["admin"]}>
           <AddProduct setProducts={setProducts}/>
         </ProtectedRoute>
        }
        />
        <Route path="/product/:id" element={<ViewProduct products={products} setProducts={setProducts} />} />
        <Route path="/product/:id/edit" element={<EditProduct products={products} setProducts={setProducts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer/>
    </Router>
    </AuthProvider>
  );
}

export default App;
