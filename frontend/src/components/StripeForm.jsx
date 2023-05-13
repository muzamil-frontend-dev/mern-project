import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { orderPaySelector, payOrder } from "../features/order/orderPaySlice";
import Message from "./Message";
import Loading from "./Loading";

const StripeForm = () => {
  const [stripeError, setStripeError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const { loading, success, error } = useSelector(orderPaySelector);
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStripeError(null);
    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      setStripeError(error.message);
      return;
    }

    const {
      id,
      card: { brand, last4 },
    } = paymentMethod;
    dispatch(
      payOrder(orderId, {
        id,
        brand,
        last4,
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      {stripeError && <Message>{stripeError}</Message>}
      {error && <Message>{error}</Message>}
      {loading && <Loading />}
      <Form.Group controlId="cardNumber" className="mb-2">
        <Form.Label>Card Number</Form.Label>
        <CardNumberElement className="form-control" />
      </Form.Group>
      <Form.Group controlId="cardExpiry" className="mb-2">
        <Form.Label>Card Expiry</Form.Label>
        <CardExpiryElement className="form-control" />
      </Form.Group>
      <Form.Group controlId="cardCvc" className="mb-2">
        <Form.Label>Card CVC</Form.Label>
        <CardCvcElement className="form-control" />
      </Form.Group>
      <div className="d-grid my-3">
        <Button type="submit" className="btn btn-dark">
          Pay
        </Button>
      </div>
    </Form>
  );
};

export default StripeForm;
