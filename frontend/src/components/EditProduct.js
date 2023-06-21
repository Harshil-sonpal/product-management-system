import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const productId = useParams();
  const proId = productId.id;
 
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${proId}`);

      const { name, price, image } = response.data;
      setName(name);
      setPrice(price);
      setPreviewImage(image);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (image) {
        formData.append('image', image);
      }

    try {
      await axios.put(`http://localhost:8080/api/products/${proId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate("/");
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container">
      <div className="column is-6 is-offset-3 py-3">
        <div className="box">
          <h2>Edit Product</h2>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group py-1">
                <label>Product Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="form-group py-1">
                <label>Product Image:</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  placeholder="Password"
                  onChange={handleImageChange}
                />
                {previewImage && (
                <img src={previewImage} alt="Preview" width="100" height="100" />
                )}
              </div>
              <div className="form-group py-1">
                <label>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={price}
                  placeholder="Enter name"
                  onChange={handlePriceChange}
                  required
                />
              </div>
              <div className="py-3">
                <button type="submit" className="btn btn-primary">
                  Edit Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
