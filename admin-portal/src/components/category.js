import React, {useRef} from 'react'
import { Container, Col, Row, Form, Button} from 'react-bootstrap';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {useState, useEffect } from 'react';
import { addCategory, getAllCategories } from '../actions';

function Category() {
    const [categoryName, setCategoryName] = useState("");
    const [parentID, setParentID] = useState("");
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    // const mounted = useRef();
    // useEffect(() => {
    //     if(!mounted.current ){
    //         mounted.current=true;
    //     }
    //     else{
    //         dispatch(getAllCategories());
    //     }
    // },[]);

    const rendercategories = (categories)=>{
        let myCategories=[];
        for(let category of categories){
            myCategories.push(
                <li key={category.slug}>
                    {category.name}
                    <ul>{category.children.length!==0 && rendercategories(category.children)}</ul>
                </li>
            );
        }
        return myCategories;
    }

    const addNewCategory = ()=>{
        var form={
            name:categoryName,
            parentID:parentID
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
                    <Col md={10} style={{ marginLeft: "auto" }}>
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
                                    <Form.Control onChange={(e) => setCategoryName(e.target.value)} type="text" placeholder="Name" required/>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Parent Id</Form.Label>
                                    <Form.Control onChange={(e)=>setParentID(e.target.value)} type="text" placeholder="Parent Id" />
                                </Form.Group>
                            </Row>
                                <Button variant="primary" onClick={addNewCategory}>Submit</Button>
                        </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Category;
