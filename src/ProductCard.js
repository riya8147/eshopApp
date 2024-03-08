import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const history = useHistory();

  const handleEdit = () => {
    // Redirect to the Modify Product page with product ID as URL parameter
    history.push(`/modify-product/${product.id}`);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name}
          height="140"
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: {product.price}
          </Typography>
          <IconButton aria-label="edit" onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </CardContent>
      </CardActionArea>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductCard;
