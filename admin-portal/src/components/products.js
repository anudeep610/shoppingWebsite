import React from 'react'
import { Container, Col, Row, Form, Button, Modal, Table } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addProduct } from '../actions';
import "./styles/product.css";

export default function Products() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [show, setShow] = useState(false);
    const [productPics, setProductPics] = useState([]);
    const [productDetailsModal, setProductDetailsModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null)

    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch()

    const handleClose = () => {
        setProductName("");
        setPrice("");
        setDescription("");
        setQuantity("");
        setProductCategory("");
        setProductPics([]);
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleSave = () => {
        let details=new FormData();
        details.append("name",productName);
        details.append("price",price);
        details.append("description",description);
        details.append("quantity",quantity);
        details.append("category",productCategory);
        for(let pic of productPics)
            details.append("pictures",pic);
        dispatch(addProduct(details));
        handleClose();
    };

    const cerateCategoryList = (categories, options = []) => {
        for (let cat of categories) {
            options.push({ val: cat._id, name: cat.name });
            if (cat.children.length)
                cerateCategoryList(cat.children, options);
        }
        return options;
    }

    const handleProductPics = (e) => {
        setProductPics([...productPics, e.target.files[0]]);
    }

    const renderAddProduct = () => {
        return <Modal show={show} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Add a new Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e) => setProductName(e.target.value)} type="text" placeholder="Name" required />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" required />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Available Quantity</Form.Label>
                    <Form.Control onChange={(e) => setQuantity(e.target.value)} type="text" placeholder="Quantity" required />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Category</Form.Label>
                    <select aria-label="product details" className="form-select" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                        <option value={""}>Select a category</option>
                        {
                            cerateCategoryList(category.categories).map(option => {
                                return <option value={option.val} key={option.val}>{option.name}</option>
                            })
                        }
                    </select>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Price" required />
                </Form.Group>
                {productPics.length > 0
                    ? productPics.map((pic, index) => (
                        <div key={index}>{pic.name}</div>
                    ))
                    : null}
                <input
                    type="file"
                    name="productPics"
                    onChange={handleProductPics}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    }

    const closeProductDetailsModal = () => {
        setProductDetailsModal(false)
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailsModal(true);
        // console.log(product);
    }
    const renderProductDetailsModal = () => {
        if (!productDetails)
            return null;

        return <Modal size="lg" show={productDetailsModal} onHide={closeProductDetailsModal}>
            <Modal.Header >
                <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{ display: 'flex' }}>
                            {productDetails.pictures.map(picture =>
                                <div key={picture.img} className="productImgContainer">
                                    <img alt="product" src={"http://localhost:3000/"+picture.img} />
                                </div>
                            )}
                        </div>

                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={closeProductDetailsModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Sidebar />
                    <Col md={10} style={{ marginLeft: "auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem .5rem" }}>
                            <h4>Products</h4>
                            <Button onClick={handleShow}>+</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={10} style={{ marginLeft: "auto" }}>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.products.length > 0 ?
                                        product.products.map((prod, index) =>
                                            <tr className="data" onClick={() => showProductDetailsModal(prod)} key={prod._id}>
                                                <td>{index + 1}</td>
                                                <td>{prod.name}</td>
                                                <td>{prod.quantity}</td>
                                                <td>{prod.price}</td>
                                                <td>{prod.category.name}</td>
                                            </tr>
                                        ) : null
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            {renderAddProduct()}
            {renderProductDetailsModal()}
        </div>
    )
}
