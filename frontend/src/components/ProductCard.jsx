import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  return (
    <Card
      className="product-card mb-4 p-2"
      as={NavLink}
      to={`/products/${product._id}`}
    >
      <Card.Img
        variant="top"
        src={product.image}
        style={{ width: "100%", height: "220px" }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text as="h4">Rs. {product.price}/-</Card.Text>
        <Card.Text as="div">
          <Rating
            rating={product.rating}
            text={`from ${product.numReviews} users`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
