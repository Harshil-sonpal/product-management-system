import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EditProduct from './EditProduct';

describe('EditProduct', () => {
  test('should render the edit form correctly', () => {
    render(
      <Router>
        <EditProduct />
      </Router>
    );

    const nameInput = screen.getByLabelText('Name:');
    const priceInput = screen.getByLabelText('Price:');
    const imageInput = screen.getByLabelText('Image:');
    const updateButton = screen.getByText('Update');

    expect(nameInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });

  test('should update form inputs when typed', () => {
    render(
      <Router>
        <EditProduct />
      </Router>
    );

    const nameInput = screen.getByLabelText('Name:');
    const priceInput = screen.getByLabelText('Price:');
    const imageInput = screen.getByLabelText('Image:');

    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(priceInput, { target: { value: '10.99' } });
    fireEvent.change(imageInput, { target: { files: [new File([], 'test.jpg', { type: 'image/jpeg' })] } });

    expect(nameInput.value).toBe('Test Product');
    expect(priceInput.value).toBe('10.99');
    expect(imageInput.files[0]).toStrictEqual(new File([], 'test.jpg', { type: 'image/jpeg' }));
  });
});
