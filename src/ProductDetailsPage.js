import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Extract product ID from URL parameter
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]); // Fetch product details when productId changes

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`/api/v1/products/${productId}`);
      setIsDeleteDialogOpen(false);
      history.push('/'); // Redirect to home page or product list page
      // Display success message
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={handleQuantityChange} />
          {/* Additional product details */}
          <Button variant="contained" color="primary" startIcon={<Edit />}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" startIcon={<Delete />} onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Delete Product Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteProduct} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDetailsPage;
