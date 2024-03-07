import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const EditProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/products/${productId}`);
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          image: response.data.image
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/products/${productId}`, formData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          name="image"
          label="Image URL"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
      <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <MuiAlert onClose={handleCloseSuccess} severity="success" variant="filled">
          Product updated successfully.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default EditProductPage;
