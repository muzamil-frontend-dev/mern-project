import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../features/auth/loginSlice";
import { Link, useParams } from "react-router-dom";
import {
  updateProfileSelector,
  updateUserProfile,
} from "../features/auth/updateProfile";
import Loading from "../components/Loading";
import Message from "../components/Message";
import {
  getOrdersList,
  ordersListSelector,
} from "../features/order/ordersListSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ProfileScreen = () => {
  const { id } = useParams();

  const [message, setMessage] = useState(null);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector(loginSelector);
  const { loading, success, error } = useSelector(updateProfileSelector);
  const {
    loading: ordersLoading,
    orders,
    error: ordersError,
  } = useSelector(ordersListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(userInfo.name);
    dispatch(getOrdersList());
  }, [setName, userInfo.name, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    // update profile
    dispatch(updateUserProfile(id, name, password));
  };

  return (
    <Row>
      <Col md={4} className="p-0">
        <FormContainer size={12} title="User Profile">
          {loading && <Loading />}
          {message && <Message>{message}</Message>}
          {error && <Message>{error}</Message>}
          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value !== confirmPassword) {
                    setMessage("Password not matched.");
                  } else {
                    setMessage(null);
                  }
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (e.target.value !== password) {
                    setMessage("Password not Matched.");
                  } else {
                    setMessage(null);
                  }
                }}
              />
            </Form.Group>
            <div className="d-grid mt-3">
              <Button type="submit" className="btn btn-dark">
                Update Profile
              </Button>
            </div>
          </Form>
        </FormContainer>
      </Col>
      <Col md={8} className="p-0">
        <FormContainer size={12} title="Orders">
          {ordersLoading ? (
            <Loading />
          ) : ordersError ? (
            <Message>{ordersError}</Message>
          ) : (
            orders && (
              <Table className="text-center">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order.createdAt.slice(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid === true ? (
                          <span>{order.paidAt.slice(0, 10)}</span>
                        ) : (
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="text-danger"
                          />
                        )}
                      </td>
                      <td>
                        {order.isDelivered === true ? (
                          <span>{order.deliveredAt.slice(0, 10)}</span>
                        ) : (
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="text-danger"
                          />
                        )}
                      </td>
                      <td>
                        <Button className="btn btn-light btn-sm">
                          <Link to={`/orders/${order._id}`}>Details</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )
          )}
        </FormContainer>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
