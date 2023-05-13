import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { addPaymentType, cartSelector } from "../features/cart/cartSlice";
import { loginSelector } from "../features/auth/loginSlice";

const PaymentScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const { paymentType } = useSelector(cartSelector);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [payment, setPayment] = useState(
    paymentType === [] ? paymentType : "Stripe"
  );
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigation("/login");
    }
  }, [userInfo, navigation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity()) {
      dispatch(addPaymentType(payment));
      navigation("/placeorder");
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer title="Payment Type">
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Check type="radio" id="stripe">
            <Form.Check.Input
              type="radio"
              name="paymentType"
              value="Stripe"
              checked={payment === "Stripe"}
              onChange={(e) => setPayment(e.target.value)}
            />
            <Form.Check.Label>Stripe</Form.Check.Label>
          </Form.Check>
          <Form.Check type="radio" id="paypal">
            <Form.Check.Input type="radio" name="paymentType" disabled />
            <Form.Check.Label>Paypal</Form.Check.Label>
          </Form.Check>
          <Button type="submit" className="btn btn-dark float-end">
            Continue <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
