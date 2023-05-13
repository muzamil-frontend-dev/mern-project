import React, { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adminProductsListSelector,
  getProductsList,
} from "../../features/admin/products/adminProductListSlice";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { loginSelector } from "../../features/auth/loginSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  adminCreateProductSelector,
  createProduct,
} from "../../features/admin/products/adminCreateProductSlice";
import {
  adminDeleteProductSelector,
  productDelete,
} from "../../features/admin/products/adminDeleteProductSlice";

const ProductListScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const { loading, products, error } = useSelector(adminProductsListSelector);
  const { loadingNew, errorNew } = useSelector(adminCreateProductSelector);
  const {
    loading: delLoading,
    status,
    error: delError,
  } = useSelector(adminDeleteProductSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      dispatch(getProductsList());
    }
  }, [userInfo, dispatch, status]);

  const addProduct = () => {
    dispatch(createProduct(navigate));
  };

  const editProduct = (id) => {
    navigate(`/admin/products/${id}`);
  };

  const deleteProduct = (id) => {
    dispatch(productDelete(id));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button className="btn btn-dark float-end" onClick={addProduct}>
            Add Product
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading || loadingNew || delLoading ? <Loading /> : null}
          {error || errorNew || delError ? (
            <Message>{error || errorNew || delError}</Message>
          ) : null}
          {products && (
            <Table className="text-center" variant="stripped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Color</th>
                  <th>Count in Stock</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <tr key={p._id}>
                    <td>{index + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.color}</td>
                    <td>{p.countInStock}</td>
                    <td>{p.price}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteProduct(p._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="ms-2"
                        onClick={() => editProduct(p._id)}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListScreen;
