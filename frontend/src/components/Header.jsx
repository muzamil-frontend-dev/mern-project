import React from "react";
import { Container, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector, logoutUser } from "../features/auth/loginSlice";
import { cartSelector } from "../features/cart/cartSlice";

const Header = () => {
  const { cartItems } = useSelector(cartSelector);
  const { userInfo } = useSelector(loginSelector);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <FontAwesomeIcon icon={faBasketShopping} /> Basket
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/cart">
              <FontAwesomeIcon icon={faCartShopping} /> Cart &nbsp;
              <Badge pill bg="light">
                {cartItems.length}
              </Badge>
            </Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name}>
                <NavDropdown.Item as={NavLink} to={`/profile/${userInfo._id}`}>
                  Profile
                </NavDropdown.Item>
                {userInfo.isAdmin && (
                  <NavDropdown.Item as={NavLink} to="/admin">
                    Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                <FontAwesomeIcon icon={faUser} /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
