import React from 'react'
import { Container, Col, Row, Form, Button, Modal } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addCategory, updateCategories, deleteCate, getAllCategory } from '../actions';
import CheckboxTree from 'react-checkbox-tree';
import { MdOutlineCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { IoMdCheckboxOutline, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { VscExpandAll, VscCloseAll } from "react-icons/vsc"
import { AiOutlineFolder, AiOutlineFolderOpen, AiOutlineFile } from "react-icons/ai";

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import "./styles/category.css";

function Category() {
    const [categoryName, setCategoryName] = useState("");
    const [parentID, setParentID] = useState("");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const rendercategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    value: category._id,
                    label: category.name,
                    children: category.children.length !== 0 && rendercategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const cerateCategoryList = (categories, options = []) => {
        for (let cat of categories) {
            options.push({ val: cat._id, name: cat.name, parentId: cat.parentId });
            if (cat.children.length)
                cerateCategoryList(cat.children, options);
        }
        return options;
    }

    const addNewCategory = () => {
        if(categoryName===""){
            alert("Name cannot be empty");
            return;
        }
        var form = {
            name: categoryName,
            parentID: parentID
        };
        dispatch(addCategory(form))
        .then(result=>{
            if(result){
                dispatch(getAllCategory());
            }
        })
        setCategoryName('');
        setParentID('');
        setAddCategoryModal(false);
    }
    const updateCategory = () => {
        createCheckedAndExpandedArray();
        setUpdateCategoryModal(true);
    }
    const createCheckedAndExpandedArray=()=>{
        const categories = cerateCategoryList(category.categories);
        const checkedArr = [];
        const expandedArr = [];
        checked.length > 0 && checked.forEach((catId, index) => {
            const category = categories.find((category, _index) => catId === category.val);
            category && checkedArr.push(category);
        });
        expanded.length > 0 && expanded.forEach((catId, index) => {
            const category = categories.find((category, _index) => catId === category.val);
            category && expandedArr.push(category);
        });
        setCheckedArray(checkedArr);
        setExpandedArray(expandedArr);
    }
    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray);
        } else if (type === 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item)
            setExpandedArray(updatedExpandedArray);
        }
    }
    const saveUpdatedCategories = () => {
        const form = [];
        expandedArray.forEach((item, index) => {
            const details = {};
            details._id = item.val;
            details.name = item.name;
            details.parentId = item.parentId ? item.parentId : "";
            form.push(details);
        });
        checkedArray.forEach((item, index) => {
            const details = {};
            details._id = item.val;
            details.name = item.name;
            details.parentId = item.parentId ? item.parentId : "";
            form.push(details);
        });
        dispatch(updateCategories(form));
        setUpdateCategoryModal(false);
    }
    const renderUpdateCategoryModal = () => {
        return <Modal size="lg" show={updateCategoryModal} onHide={() => setUpdateCategoryModal(false)}>
            <Modal.Header >
                <Modal.Title>Edit Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <h6><strong>Expanded</strong></h6>
                        </Col>
                    </Row>
                    {
                        expandedArray.length > 0 ?
                            expandedArray.map((item, index) =>
                                <Row className="mb-3" key={index}>
                                    <Form.Group as={Col}>
                                        <Form.Control value={item.name} type="text" placeholder="Name" required onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')} />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <select value={item.parentId} className="form-select" onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                            <option value="">Select a category</option>
                                            {
                                                cerateCategoryList(category.categories).map(option => {
                                                    return <option value={option.val} key={option.val}>{option.name}</option>
                                                })
                                            }
                                        </select>
                                    </Form.Group>
                                </Row>
                            ) : <h6>Expand categories in the category tree</h6>
                    }

                    <Row>
                        <Col>
                            <h6><strong>Checked</strong></h6>
                        </Col>
                    </Row>
                    {
                        checkedArray.length > 0 ?
                            checkedArray.map((item, index) =>
                                <Row className="mb-3" key={index}>
                                    <Form.Group as={Col}>
                                        <Form.Control value={item.name} type="text" placeholder="Name" required onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')} />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <select value={item.parentId} className="form-select" onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                            <option value=" ">Select a category</option>
                                            {
                                                cerateCategoryList(category.categories).map(option => {
                                                    return <option value={option.val} key={option.val}>{option.name}</option>
                                                })
                                            }
                                        </select>
                                    </Form.Group>
                                </Row>
                            ) : <h6>Check categories in the category tree</h6>
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
            {checkedArray.length || expandedArray.length ? 
                    <> <Button variant="secondary" onClick={() => setUpdateCategoryModal(false)}>Close</Button>
                    <Button variant="success" onClick={saveUpdatedCategories}>Save Changes</Button></>
                    : <Button variant="primary" onClick={()=>setUpdateCategoryModal(false)}>Ok</Button>
            }
            </Modal.Footer>
        </Modal>
    }
    const renderAddCategoryModal = () => {
        return <Modal size="lg" show={addCategoryModal} onHide={() => setAddCategoryModal(false)}>
            <Modal.Header >
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Control value={categoryName} onChange={(e) => setCategoryName(e.target.value)} type="text" placeholder="Name" required />
                        </Form.Group>
                        <Form.Group as={Col}>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="mb-2" variant="secondary" onClick={() => setAddCategoryModal(false)}>Cancel</Button>
                <Button className="mb-2" variant="primary" onClick={addNewCategory}>Submit</Button>
            </Modal.Footer>
        </Modal>
    }

    const deleteCategories=()=>{
        createCheckedAndExpandedArray();
        setDeleteCategoryModal(true);
    }

    const deleteCategory=()=>{
        dispatch(deleteCate(checkedArray));
        setDeleteCategoryModal(false);
    }
    const renderDeleteCategoryModal=()=>{
        return <Modal size="lg" show={deleteCategoryModal}>
            <Modal.Header>
                <Modal.Title>Delete Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {checkedArray.length ? checkedArray.map((item,index)=> <div key={index}>{item.name}</div> ):<span>Check items to delete them</span>}
            </Modal.Body>
            <Modal.Footer>
                {checkedArray.length ? 
                    <> <Button variant="secondary" onClick={()=>setDeleteCategoryModal(false)}>No</Button>
                    <Button variant="danger" onClick={deleteCategory}>Yes</Button> </>
                    : <Button variant="primary" onClick={()=>setDeleteCategoryModal(false)}>Ok</Button>
            }
            </Modal.Footer>
        </Modal>
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Sidebar />
                    <Col md={10} style={{ display: "flex", justifyContent: "space-between", margin: ".7rem 0 0 auto" }}>
                        <h4>Available Categories</h4>
                        <div>
                            <Button className="mx-1" variant="primary" onClick={()=>setAddCategoryModal(true)}>Add</Button>
                            <Button className="mx-1" variant="warning" onClick={updateCategory} >Edit</Button>
                            <Button className="mx-1" variant="danger"  onClick={deleteCategories}>Delete</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={10} style={{ marginLeft: "auto" }}>
                        <CheckboxTree
                            nodes={rendercategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <MdCheckBox />,
                                uncheck: <MdOutlineCheckBoxOutlineBlank />,
                                halfCheck: <IoMdCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowUp />,
                                expandAll: <VscExpandAll />,
                                collapseAll: <VscCloseAll />,
                                parentClose: <AiOutlineFolder />,
                                parentOpen: <AiOutlineFolderOpen />,
                                leaf: <AiOutlineFile />
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            {renderUpdateCategoryModal()}
            {renderAddCategoryModal()}
            {renderDeleteCategoryModal()}
        </div>
    );
}

export default Category;
