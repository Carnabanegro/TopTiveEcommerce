import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {connect} from "react-redux";
import {saveProductRequest} from "../../../actions/product";
import PropTypes from "prop-types";


function FormProduct({username, saveProduct}) {
    const [product, setProduct] = useState({
        name: '',
        currency: 'usd$',
        value: 0,
        descrip: '',
        username: ''
    });

    function handleForm(e) {
        e.preventDefault()
        saveProduct(product.name, product.currency, product.value, product.descrip, username, "save");
    }

    console.log(product);
    return (
        <Form>
            <FormGroup>
                <Label for="textName">
                    Product name
                </Label>
                <Input
                    id="textName"
                    name="name"
                    placeholder="name of product"
                    type="text"
                    onChange={e => {
                        setProduct({...product, name: e.target.value})
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="selectCurrency">
                    Currency
                </Label>
                <Input
                    id="selectCurrency"
                    name="currency"
                    type="select"
                    placeholder="select currency"
                    onChange={e => {
                        setProduct({...product, currency: e.target.value})
                    }}
                >
                    <option>
                        usd$
                    </option>
                    <option>
                        $
                    </option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="numberValue">
                    Value
                </Label>
                <Input
                    id="numberValue"
                    name="value"
                    type="number"
                    onChange={e => {
                        setProduct({...product, value: e.target.value})
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="textDescrip">
                    Product Description
                </Label>
                <Input
                    id="textDescrip"
                    name="descrip"
                    type="textarea"
                    onChange={e => {
                        setProduct({...product, descrip: e.target.value})
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="fileProduct">
                    Product Picture
                </Label>
                <Input
                    id="fileProduct"
                    name="pictureProduct"
                    type="file"
                />
            </FormGroup>
            <Button color="primary" onClick={(e) => handleForm(e)}>
                Submit
            </Button>
        </Form>
    );
}

export default connect(
    state => ({
        username: state.session.profile.username
    }),
    dispatch => ({
        saveProduct: (name, currency, value, descrip, username, actionType) => dispatch(saveProductRequest(name, currency, value, descrip, username, actionType))
    })
)(FormProduct)


FormProduct.protoTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({})),
    username: PropTypes.string.isRequired,
    saveProduct: PropTypes.func.isRequired
}

FormProduct.defaultProps = {
    product: null,
    username: null
}
