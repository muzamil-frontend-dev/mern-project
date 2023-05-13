import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
// import {
//   adminProductDetailSelector,
//   getProductDetail,
// } from "../../features/admin/products/adminProductDetailSlice";
import { loginSelector, logoutUser } from "../../features/auth/loginSlice";

const ProductEditScreen = () => {
  const { id } = useParams();
  const { userInfo } = useSelector(loginSelector);
  // const { loading, product, error } = useSelector(adminProductDetailSelector);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [fabric, setFabric] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const { token } = userInfo;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      const res = await axios.get(`/api/admin/products/${id}`, config);
      const product = res.data;
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setColor(product.color);
      setFabric(product.fabric);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setImage(product.image);
      setIsActive(product.isActive);
      setLoading(false);
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      if (error.response && error.response.status === 401) {
        dispatch(logoutUser());
      }
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity()) {
      // edit Product
      editProduct();
    }
  };

  const editProduct = async () => {
    try {
      setLoading(true);
      const { token } = userInfo;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      await axios.put(
        `/api/admin/products/${id}`,
        {
          name,
          price,
          description,
          image,
          category,
          color,
          fabric,
          countInStock,
          isActive,
        },
        config
      );
      setLoading(false);
      navigate("/admin/products");
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      if (error.response && error.response.status === 401) {
        dispatch(logoutUser());
      }
      setError(error);
      setLoading(false);
    }
  };

  const uploadImage = async (e) => {
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setLoading(true);
      const { token } = userInfo;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };

      const { data } = await axios.put("/api/admin/uploads", formData, config);
      setImage(data.imageUrl);
      setLoading(false);
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      if (error.response && error.response.status === 401) {
        dispatch(logoutUser());
      }
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Button className="btn btn-dark" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <FormContainer title="Edit Product" size={12}>
        {loading && <Loading />}
        {error && <Message>{error}</Message>}
        <Form onValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Product Name is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="price" className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Price is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description" className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Product Description is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="image" className="mb-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control type="file" onChange={uploadImage} accept="image/*" />
            <Form.Control.Feedback type="invalid">
              Image is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="category" className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Category is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="color" className="mb-2">
            <Form.Label>Color</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Color is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="fabric" className="mb-2">
            <Form.Label>Fabric</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Fabric"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Fabric is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="countInStock" className="mb-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Count In Stock is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="isActive" className="mb-2 mt-4">
            <Form.Label>Status</Form.Label>
            <Form.Check
              type="switch"
              id="isActive"
              label="Product is Active"
              value={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <Form.Control.Feedback type="invalid">
              Status is Required.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="btn btn-dark float-end">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
