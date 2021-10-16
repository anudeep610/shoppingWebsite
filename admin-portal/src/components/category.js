import React from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addCategory } from '../actions';

function Category() {
    const [categoryName, setCategoryName] = useState("");
    const [parentID, setParentID] = useState("");
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const rendercategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.slug}>
                    {category.name}
                    <ul>{category.children.length !== 0 && rendercategories(category.children)}</ul>
                </li>
            );
        }
        return myCategories;
    }

    const cerateCategoryList = (categories, options = []) => {
        for (let cat of categories) {
            options.push({ val: cat._id, name: cat.name });
            if (cat.children.length)
                cerateCategoryList(cat.children, options);
        }
        return options;
    }

    const addNewCategory = () => {
        var form = {
            name: categoryName,
            parentID: parentID
        };
        dispatch(addCategory(form));
        setCategoryName('');
        setParentID('');
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Sidebar />
                    <Col md={10} style={{ margin: ".7rem 0 0 auto" }}>
                        <h4>Available Categories</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={10} style={{ marginLeft: "auto" }}>
                        <ul>
                            {rendercategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col md={10} style={{ marginLeft: "auto" }}>
                        <h4>Add new category</h4>
                        <Container>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control value={categoryName} onChange={(e) => setCategoryName(e.target.value)} type="text" placeholder="Name" required />
                                    </Form.Group>
                                    <Form.Group as={Col} style={{marginTop:"2rem"}}>
                                        <select className="form-select" value={parentID} onChange={(e) => setParentID(e.target.value)}>
                                            <option value="">Select a category</option>
                                            {
                                                cerateCategoryList(category.categories).map(option => {
                                                    return <option value={option.val} key={option.val}>{option.name}</option>
                                                })
                                            }
                                        </select>
                                    </Form.Group>
                                </Row>
                                <Button className="mb-2" variant="primary" onClick={addNewCategory}>Submit</Button>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Category;
