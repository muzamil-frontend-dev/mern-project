import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { loginSelector, loginUser } from "../features/auth/loginSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, userInfo, error } = useSelector(loginSelector);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const redirect = query.get("redirect") === null ? "/" : query.get("redirect");

  useEffect(() => {
    if (userInfo) {
      if (redirect.includes("admin") && userInfo.isAdmin) {
        navigation(redirect);
      } else if (!redirect.includes("admin")) {
        navigation(redirect);
      }
    }
  }, [redirect, navigation, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch login
    dispatch(loginUser(email, password));
  };

  return (
    <FormContainer title="Sign In">
      {loading && <Loading />}
      {error && <Message>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid">
          <Button type="submit" className="btn btn-dark mt-3">
            Sign In
          </Button>
        </div>
      </Form>
      <Row className="pt-3">
        <Col>
          Not have an account?{" "}
          <Link
            to={
              redirect !== "/" ? `/register?redirect=${redirect}` : "/register"
            }
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
