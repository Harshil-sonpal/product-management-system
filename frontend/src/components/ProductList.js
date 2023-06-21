import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, startDate, endDate, sortOrder, currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products", {
        params: {
          page: currentPage,
          term: searchTerm,
          start: startDate,
          end: endDate,
          sortOrder: sortOrder,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Product List</h1>
        <div className="col">
            <label htmlFor="productName"></label>
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by product name"
          />
        </div>
        <div className="col">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            className="form-control"
          />
        </div>

        <div className="col">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            className="form-control"
          />
        </div>

        <div className="col">
          <label htmlFor="sortOrder">Sort Order</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="form-control"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="my-1 py-2">
        <button
          onClick={() => navigate("/add-product")}
          className="btn btn-primary"
        >
          Add Product
        </button>
      </div>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
              <img
                  src={product.image}
                  alt={product.name}
                  width="100"
                  height="100"
                />
              </td>
              <td>{product.price}</td>
              <td>
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="btn btn-success"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="pagination justify-content-end">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="btn btn-outline-primary"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} className="btn btn-outline-primary">Next</button>
      </div>
    </div>
  );
};

export default ProductList;
