import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { addShippingAddress, cartSelector } from "../features/cart/cartSlice";
import { loginSelector } from "../features/auth/loginSlice";

const ShippingScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const { shippingAddress } = useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [zipCode, setZipCode] = useState(
    shippingAddress ? shippingAddress.zipCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigation("/login");
    }
  }, [userInfo, navigation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity()) {
      dispatch(
        addShippingAddress({
          address,
          city,
          zipCode,
          country,
        })
      );
      navigation("/payment");
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer title="Shipping Address">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="Address" className="mb-2">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Street Address is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="City" className="mb-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              City is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="zipCode" className="mb-2">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Zip Code is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Country" className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Country is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="btn btn-dark float-end">
            Continue <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
