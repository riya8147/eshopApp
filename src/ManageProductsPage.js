import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/v1/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      setIsDeleteSuccess(true); // Set delete success message
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleCloseDeleteSuccess = () => {
    setIsDeleteSuccess(false);
  };

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} onDelete={() => {
          setDeleteProductId(product.id);
          setIsDeleteDialogOpen(true);
        }} />
      ))}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            handleDeleteProduct(deleteProductId);
            setIsDeleteDialogOpen(false);
          }} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={isDeleteSuccess} autoHideDuration={6000} onClose={handleCloseDeleteSuccess}>
        <MuiAlert onClose={handleCloseDeleteSuccess} severity="success" variant="filled">
          Product deleted successfully.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ManageProductsPage;
