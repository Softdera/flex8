import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from './ProductList';

describe('ProductList Integration', () => {
  const mockProducts = [
    { id: 1, name: 'T-Shirt', price: 19.99 },
    { id: 2, name: 'Jeans', price: 49.99 },
    { id: 3, name: 'Sneakers', price: 79.99 },
  ];

  it('renders product cards', () => {
    render(<ProductList products={mockProducts} />);
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
  });

  it('filters products based on search input', () => {
    render(<ProductList products={mockProducts} />);
    
    // Initially, all products are visible
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();

    // Type into search to filter out "T-Shirt"
    fireEvent.change(screen.getByLabelText(/search products/i), {
      target: { value: 'Jeans' },
    });

    // "T-Shirt" is no longer found, but "Jeans" is
    expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
  });

  it('displays "No products found." when list is empty', () => {
    render(<ProductList products={[]} />);
    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });
});
