import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import axios from 'axios';

jest.mock('axios');

describe('ProductList', () => {
  test('should render the list of products', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product1',
        price: 2500.00,
        "image": "http://localhost:8080/public/1687344335575-Sample-jpg-image-200kb.jpg",
      },
      {
        id: 2,
        name: 'Product2',
        price: 2300.00,
        "image": "http://localhost:8080/public/1687344335575-Sample-jpg-image-200kb.jpg",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockProducts });

    render(<ProductList />);

    const product1Name = await screen.findByText('Product 1');
    const product2Name = await screen.findByText('Product 2');

    expect(product1Name).toBeInTheDocument();
    expect(product2Name).toBeInTheDocument();
  });
});
