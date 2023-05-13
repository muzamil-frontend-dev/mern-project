import React, { useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import ProductCard from "../components/ProductCard";
import EmptyContent from "../components/EmptyContent";
import {
  clearProductFilters,
  fetchProducts,
  filterProductsList,
  productListSelector,
} from "../features/products/productList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const HomeScreen = () => {
  const {
    loading,
    all_products: products,
    filter_products,
    filters: { text, category, color, minPrice, maxPrice, price },
    error,
  } = useSelector(productListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get Unique Data
  const getUniqueData = (data, property) => {
    const newArr = data.map((product) => product[property]);
    return ["all", ...new Set(newArr)];
  };
  const categories = getUniqueData(products, "category");
  const colors = getUniqueData(products, "color");

  const updateFilterValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(filterProductsList(name, value));
  };
  const clearFilters = () => {
    dispatch(clearProductFilters());
    dispatch(fetchProducts());
  };

  return (
    <Row className="py-3">
      {loading && <Loading />}
      {error && <Message>{error}</Message>}
      <Col md={3}>
        <Form onSubmit={(e) => e.preventDefault()} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search Products..."
            value={text}
            name="text"
            onChange={updateFilterValue}
          />
        </Form>
        <div className="mb-3">
          <h5>Category</h5>
          {categories.map((currCategory, index) => (
            <button
              key={index}
              type="button"
              className={
                category === currCategory
                  ? "btn filter_btn active"
                  : "btn filter_btn"
              }
              value={currCategory}
              name="category"
              onClick={updateFilterValue}
            >
              {currCategory}
            </button>
          ))}
        </div>
        <div className="mb-3">
          <h5>Color</h5>
          <Row>
            {colors.map((currColor, index) => (
              <Col md={2} key={index}>
                {currColor === "all" ? (
                  <button
                    className={
                      color === currColor
                        ? "btn filter_btn active"
                        : "btn filter_btn"
                    }
                    value={currColor}
                    name="color"
                    onClick={updateFilterValue}
                  >
                    all
                  </button>
                ) : (
                  <button
                    className={
                      color === currColor
                        ? "filter_color active"
                        : "filter_color"
                    }
                    style={{ backgroundColor: `${currColor}` }}
                    value={currColor}
                    name="color"
                    onClick={updateFilterValue}
                  >
                    {color === currColor ? (
                      <FontAwesomeIcon icon={faCheck} className="text-white" />
                    ) : null}
                  </button>
                )}
              </Col>
            ))}
          </Row>
        </div>
        <div className="mb-3">
          <h5>Price</h5>
          <p>{price}</p>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Range
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price}
              name="price"
              onChange={updateFilterValue}
            />
          </Form>
        </div>
        <div className="mb-3">
          <button
            className="btn btn-danger"
            type="button"
            name="clearFilters"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </Col>
      <Col md={9}>
        <Row className="h-100">
          {filter_products.length !== 0 ? (
            filter_products.map((product) => (
              <Col key={product._id} xl={4} lg={5} md={5} sm={6}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <EmptyContent text="No Products Found" />
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default HomeScreen;
