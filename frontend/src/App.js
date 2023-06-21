import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/edit-product/:id" element={<EditProduct />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
