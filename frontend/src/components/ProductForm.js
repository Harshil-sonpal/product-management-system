import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);

    try {
      await axios.post("http://localhost:8080/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setImage(null);
      setPrice("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="column is-6 is-offset-3 py-3">
        <div className="box">
          <h2>Add Product</h2>
          <div className="col-md-6">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group py-1">
                <label>Product Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>
              <div className="form-group py-1">
                <label>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={price}
                  placeholder="Enter name"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="py-3">
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
