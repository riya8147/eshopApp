// ProductCard.js
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

const ProductCard = ({ product, onDelete }) => {
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
          <IconButton aria-label="edit">
            <Edit />
          </IconButton>
          <IconButton aria-label="delete" onClick={onDelete}>
            <Delete />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
