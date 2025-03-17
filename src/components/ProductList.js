import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';
import useFetch from '../hooks/useFetch';

const ProductList = ({ products: productsProp }) => {
  // Call useFetch only when products are not passed as a prop.
  const { data: productsFromHook = [], loading } = useFetch('/product.json');
  const products = productsProp || productsFromHook;

  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Only show the loading message if no products prop is provided.
  if (loading && !productsProp) return <p>Loading products...</p>;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
              <ProductCard product={product} />
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
