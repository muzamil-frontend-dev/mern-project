import React from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCreditCard,
  faTruckFast,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <Nav className="justify-content-between" activeKey="/home">
          {step1 ? (
            <Nav.Item>
              <Nav.Link className="text-dark" as={NavLink} to="/login">
                <FontAwesomeIcon icon={faUser} /> login
              </Nav.Link>
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Nav.Link disabled>
                <FontAwesomeIcon icon={faUser} /> login
              </Nav.Link>
            </Nav.Item>
          )}
          {step2 ? (
            <Nav.Item>
              <Nav.Link className="text-dark" as={NavLink} to="/shipping">
                <FontAwesomeIcon icon={faAddressCard} /> Shipping Address
              </Nav.Link>
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Nav.Link disabled>
                <FontAwesomeIcon icon={faAddressCard} /> Shipping Address
              </Nav.Link>
            </Nav.Item>
          )}
          {step3 ? (
            <Nav.Item>
              <Nav.Link className="text-dark" as={NavLink} to="/payment">
                <FontAwesomeIcon icon={faCreditCard} /> Payment
              </Nav.Link>
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Nav.Link disabled>
                <FontAwesomeIcon icon={faCreditCard} /> Payment
              </Nav.Link>
            </Nav.Item>
          )}
          {step4 ? (
            <Nav.Item>
              <Nav.Link className="text-dark" as={NavLink} to="/checkout">
                <FontAwesomeIcon icon={faTruckFast} /> Checkout
              </Nav.Link>
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Nav.Link disabled>
                <FontAwesomeIcon icon={faTruckFast} /> Checkout
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </Col>
    </Row>
  );
};

export default CheckoutSteps;
