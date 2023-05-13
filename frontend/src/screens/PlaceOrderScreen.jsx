import React, { useEffect } from "react";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Image,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  createOrder,
  orderCreateSelector,
} from "../features/order/orderCreateSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { loginSelector } from "../features/auth/loginSlice";
import { cartSelector, resetUserCart } from "../features/cart/cartSlice";

const PlaceOrderScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const cart = useSelector(cartSelector);
  const { cartItems, shippingAddress, paymentType } = cart;
  const { loading, error, order, success } = useSelector(orderCreateSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addDecimal = (num) => {
    return Math.round((Number(num) / 100) * 100).toFixed(2);
  };
  const itemsPrice = addDecimal(
    cartItems.reduce((pre, item) => (pre = pre + item.price * item.qty), 0)
  );
  const shippingPrice = addDecimal(itemsPrice > 1000 ? 0 : 100);
  const taxPrice = addDecimal(itemsPrice * 0.16);
  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  useEffect(() => {
    if (success && order) {
      dispatch(resetUserCart());
      navigate(`/orders/${order._id}`);
    }
  }, [success, order, dispatch, navigate]);

  const createOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentType: cart.paymentType,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      {loading && <Loading />}
      {error && <Message>{error}</Message>}
      <Row>
        <Col md={8}>
          {userInfo && (
            <>
              <Row>
                <Col>
                  <h4>name : {userInfo && userInfo.name}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>
                    Email :&nbsp;
                    <a href={`${userInfo && userInfo.email}`}>
                      {userInfo && userInfo.email}
                    </a>
                  </h4>
                </Col>
              </Row>
            </>
          )}
          {cart && (
            <>
              <Row>
                <Col>
                  <h4>
                    Address : {shippingAddress.address}, {shippingAddress.city},{" "}
                    {shippingAddress.zipCode}, {shippingAddress.country}
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>Payment Type : {paymentType}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <Row>
                        <Col lg={1}>Image</Col>
                        <Col lg={6}>Name</Col>
                        <Col lg={3}>Price</Col>
                      </Row>
                    </ListGroupItem>
                    {cartItems.map((cartItem) => (
                      <ListGroupItem key={cartItem.product}>
                        <Row>
                          <Col lg={1}>
                            <Image
                              src={cartItem.image}
                              alt={cartItem.name}
                              fluid
                              width={65}
                            />
                          </Col>
                          <Col lg={6}>
                            <Link to={`/products/${cartItem.product}`}>
                              {cartItem.name}
                            </Link>
                          </Col>
                          <Col lg={3}>
                            {cartItem.price} x {cartItem.qty} = Rs.{" "}
                            {cartItem.price * cartItem.qty}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col>
                  <h3>
                    Subtotal (
                    {cartItems.reduce((pre, item) => (pre = item.qty + pre), 0)}
                    )
                  </h3>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>
                  <h5>Products Price</h5>
                </Col>
                <Col>
                  <h5>Rs. {itemsPrice}/-</h5>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>
                  <h5>Shipping Price</h5>
                </Col>
                <Col>
                  <h5>Rs. {shippingPrice}/-</h5>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>
                  <h5>
                    Tax <span className="fw-light fs-6">(16% GST)</span>
                  </h5>
                </Col>
                <Col>
                  <h5>Rs. {taxPrice}/-</h5>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>
                  <h5>Total Price</h5>
                </Col>
                <Col>
                  <h5>Rs. {totalPrice}/-</h5>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col className="d-grid">
                  <Button onClick={createOrderHandler} className="btn btn-dark">
                    Place Order
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
