import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Badge,
  Form,
} from "react-bootstrap";
import {
  fetchProduct,
  productDetailSelector,
} from "../features/products/productDetail";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const { loading, product, error } = useSelector(productDetailSelector);
  const navigator = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleAddCart = () => {
    navigator(`/cart/${product._id}?qty=${qty}`);
  };

  return (
    <>
      <Row>
        <Col>
          <Button
            className="my-2"
            variant="dark"
            size="lg"
            onClick={() => navigator(-1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            product && (
              <Row>
                <Col md={5}>
                  <Image src={product.image} fluid alt={product.name} />
                </Col>
                <Col md={4}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h4>{product.name}</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        rating={product.rating}
                        text={`from ${product.numReviews} users`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h4>{product.category}</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h4>{product.fabric}</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h4 className="text-capitalize">
                        Available in {product.color}
                      </h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h4>{product.description}</h4>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <h4>Price</h4>
                        </Col>
                        <Col>
                          <h4>Rs. {product.price}/-</h4>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <h4>Stock</h4>
                        </Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">Available</Badge>
                          ) : (
                            <Badge bg="danger">Out of Stock</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <h4>Quantity</h4>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Select
                              disabled={product.countInStock === 0}
                              onChange={(e) => setQty(e.target.value)}
                              value={qty}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (value) =>
                                  value < 5 && (
                                    <option key={value} value={value + 1}>
                                      {value + 1}
                                    </option>
                                  )
                              )}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          variant="dark"
                          disabled={product.countInStock === 0}
                          onClick={handleAddCart}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            )
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
