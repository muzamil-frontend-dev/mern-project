import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginSelector } from "../../features/auth/loginSlice";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import {
  adminDashboardSelector,
  getItems,
} from "../../features/admin/adminDashboard";

const DashboardScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const { loading, items, error } = useSelector(adminDashboardSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(getItems());
    }
  }, [userInfo, dispatch]);

  const [products, orders, users] = items;

  return (
    <Container fluid className="pt-3">
      {loading && <Loading />}
      {error && <Message>{error}</Message>}
      <Row>
        <Col md={4}>
          <Card className="bg-light">
            <Card.Body as={NavLink} to="/admin/products">
              <Card.Title>Products</Card.Title>
              <Card.Text className="text-center display-4">
                {products && products.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-light">
            <Card.Body as={NavLink} to="/admin/orders">
              <Card.Title>Orders</Card.Title>
              <Card.Text className="text-center display-4">
                {orders && orders.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-light">
            <Card.Body as={NavLink} to="/admin/users">
              <Card.Title>Users</Card.Title>
              <Card.Text className="text-center display-4">
                {users && users.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardScreen;
