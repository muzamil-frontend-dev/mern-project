import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCubes,
  faShoppingCart,
  faTachometerAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const SideMenu = () => {
  return (
    <ListGroup className="side-nav">
      <Link as={NavLink} to="/admin/dashboard">
        <ListGroup.Item>
          <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
        </ListGroup.Item>
      </Link>
      <Link as={NavLink} to="/admin/products">
        <ListGroup.Item>
          <FontAwesomeIcon icon={faCubes} /> Products
        </ListGroup.Item>
      </Link>
      <Link as={NavLink} to="/admin/orders">
        <ListGroup.Item>
          <FontAwesomeIcon icon={faShoppingCart} /> Orders
        </ListGroup.Item>
      </Link>
      <Link as={NavLink} to="/admin/users">
        <ListGroup.Item>
          <FontAwesomeIcon icon={faUsers} /> Users
        </ListGroup.Item>
      </Link>
    </ListGroup>
  );
};

export default SideMenu;
