import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";
import Message from "../components/Message";
import {
  registerSelector,
  registerUser,
  resetUser,
} from "../features/auth/registerSlice";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { loading, success, error } = useSelector(registerSelector);
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const redirect = query.get("redirect") === null ? "/" : query.get("redirect");

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(resetUser());
      navigate(redirect);
    }
  }, [success, dispatch, navigate, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password not Matched.");
    } else {
      setMessage(null);
      dispatch(registerUser(name, email, password));
    }
  };

  return (
    <FormContainer title="Register">
      {loading && <Loading />}
      {message && <Message>{message}</Message>}
      {error && <Message>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value !== confirmPassword) {
                setMessage("Password not Matched");
              } else {
                setMessage(null);
              }
            }}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (e.target.value !== password) {
                setMessage("Password not Matched");
              } else {
                setMessage(null);
              }
            }}
          />
        </Form.Group>
        <div className="d-grid">
          <Button type="submit" className="btn btn-dark mt-3">
            Register
          </Button>
        </div>
      </Form>
      <Row className="pt-3">
        <Col>
          Already have an account?{" "}
          <Link
            to={redirect !== "/" ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
