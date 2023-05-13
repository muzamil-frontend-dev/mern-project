import React, { useEffect } from "react";
import { Row, Col, Table, Button, Form, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  adminOrdersListSelector,
  getOrdersList,
} from "../../features/admin/orders/adminOrderList";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  adminOrderDeliverSelector,
  deliverOrder,
} from "../../features/admin/orders/adminDeliverOrder";

const OrderListScreen = () => {
  const { loading, orders, error } = useSelector(adminOrdersListSelector);
  const {
    loading: statusLoading,
    status,
    error: statusError,
  } = useSelector(adminOrderDeliverSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch, status]);

  const editOrder = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  const handleStatusChange = (status, id) => {
    if (status === true) {
      dispatch(deliverOrder(id, status));
    }
  };

  return (
    <Row>
      <Col>
        {loading || statusLoading ? <Loading /> : null}
        {error || statusError ? (
          <Message>{error || statusError}</Message>
        ) : null}
        {orders && (
          <Table variant="stripped" className="text-center">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Name</th>
                <th>Price</th>
                <th>Paid</th>
                <th>Delivery Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.createdAt.slice(0, 10)}</td>
                  {order.orderItems.map((item) => (
                    <React.Fragment key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
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
                        {order.isDelivered ? (
                          <Badge pill bg="success">
                            Order Delivered
                          </Badge>
                        ) : (
                          <Form.Check
                            required
                            type="switch"
                            // value={isDelivered}
                            onChange={(e) =>
                              handleStatusChange(e.target.checked, order._id)
                            }
                          />
                        )}
                      </td>
                      {/* <td>
                        <Button size="sm" variant="danger">
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="ms-2"
                          onClick={() => editOrder(order._id)}
                        >
                          <FontAwesomeIcon icon={faPencil} />
                        </Button>
                      </td> */}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default OrderListScreen;
