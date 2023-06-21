import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from './ProductForm';

describe('ProductForm', () => {
  test('should render the form correctly', () => {
    render(<ProductForm />);

    const nameInput = screen.getByLabelText('Name:');
    const priceInput = screen.getByLabelText('Price:');
    const imageInput = screen.getByLabelText('Image:');
    const submitButton = screen.getByText('Add Product');

    expect(nameInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('should update form inputs when typed', () => {
    render(<ProductForm />);

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

  // Add more test cases for form validation, form submission, etc.
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';

jest.mock('axios');

describe('ProductForm', () => {
  it('should submit the form with correct data', async () => {
    const mockResponse = {
      status: 201,
      data: {
        message: 'Product created successfully',
        product: {
          "id": 3,
          "name": "Product3",
          "image": "http://localhost:8080/public/1687344335575-Sample-jpg-image-200kb.jpg",
          "price": "1800",
          "creationDate": "2023-06-21T10:45:35.581Z",
        }
      }
    };

    axios.post.mockResolvedValueOnce(mockResponse);

    render(<ProductForm />);

    const nameInput = screen.getByLabelText('Product Name:');
    const imageInput = screen.getByLabelText('Product Image:');
    const priceInput = screen.getByLabelText('Product Price:');
    const submitButton = screen.getByText('Add Product');

    fireEvent.change(nameInput, { target: { value: 'Sample Product' } });
    fireEvent.change(imageInput, { target: { files: [new File(['sample'], 'sample.jpg')] } });
    fireEvent.change(priceInput, { target: { value: '9.99' } });

    fireEvent.click(submitButton);
  });
});