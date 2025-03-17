import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ProductCard from './ProductCard';
import { useDispatch } from 'react-redux';
import useFetch from '../hooks/useFetch';



const ProductList = () => {
  const { data: products, setData: setProducts, loading } = useFetch('https://api.example.com/products');
  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await fetch('https://api.example.com/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      dispatch({ type: 'ADD_TO_CART', payload: data });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateProductPrice = async (id) => {
    const productToUpdate = products.find((p) => p.id === id);
    if (!productToUpdate) return;
    const updatedProduct = { ...productToUpdate, price: productToUpdate.price + 10 };

    try {
      const response = await fetch(`https://api.example.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, price: data.price } : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        inputRef={searchInputRef}
        label="Search Products"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={2}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard
                product={product}
                addToCart={addToCart}
                updateProductPrice={updateProductPrice}
              />
            </Grid>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Grid>
    </div>
  );
};

export default ProductList;
