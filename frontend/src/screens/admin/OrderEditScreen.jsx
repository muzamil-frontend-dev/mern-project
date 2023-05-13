import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";

const OrderEditScreen = () => {
  const [validated, setValidated] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [isDelivered, setIsDelivered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  //   const fetchOrder = () {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // <h1>edit order</h1>
    <>
      <Button className="btn btn-dark" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <FormContainer title="Edit Order" size={12}>
        <Form onValidate validated={validated} onClick={handleSubmit}>
          <Form.Group controlId="shippingAddress" className="mb-2">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Shipping Address is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="shippingPrice" className="mb-2">
            <Form.Label>Shipping Price</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Shipping Price"
              value={shippingPrice}
              onChange={(e) => setShippingPrice(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Shipping Address is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="isDelivered" className="mb-2">
            <Form.Label>Delivery Status</Form.Label>
            <Form.Check
              required
              type="switch"
              label="Order is Delivered"
              value={isDelivered}
              onChange={(e) => setIsDelivered(e.target.checked)}
            />
            <Form.Control.Feedback type="invalid">
              Delivery Status is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="btn btn-dark float-end">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default OrderEditScreen;
