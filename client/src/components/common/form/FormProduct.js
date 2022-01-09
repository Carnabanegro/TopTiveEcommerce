import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {connect} from "react-redux";
import {saveProductRequest} from "../../../actions/product";
import PropTypes from "prop-types";
import InfoHandler from "../InfoHandler";


function FormProduct({username, saveProduct,changeTab,abmStatus}) {
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

    useEffect(() => {
        if (abmStatus.success && !abmStatus.sending && !abmStatus.saving) {
            changeTab(false);
        }
    },[abmStatus]);
    return (
        <div className="pb-3">
            <h3 align="start"  className="p-2 text-light">Formulario de producto</h3>
            <Form>
                <FormGroup>
                    <Input
                        id="textName"
                        name="name"
                        placeholder="Name"
                        type="text"
                        onChange={e => {
                            setProduct({...product, name: e.target.value})
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        id="selectCurrency"
                        name="currency"
                        type="select"
                        placeholder="Currency"
                        onChange={e => {
                            setProduct({...product, currency: e.target.value})
                        }}

                    >
                        <option value="usd$">
                            USD$
                        </option>
                        <option value="$">
                            $
                        </option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input
                        id="numberValue"
                        name="value"
                        type="number"
                        placeholder="Value"
                        onChange={e => {
                            setProduct({...product, value: e.target.value})
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        id="textDescrip"
                        name="descrip"
                        type="textarea"
                        placeholder="Product Description"
                        onChange={e => {
                            setProduct({...product, descrip: e.target.value})
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        id="fileProduct"
                        name="pictureProduct"
                        type="file"
                        placeholder="Product Picture"
                    />
                </FormGroup>
                <Button className="bg-light text-dark text-capitalize" onClick={(e) => handleForm(e)}>
                    Submit
                </Button>
            </Form>
        </div>

    );
}

export default connect(
    state => ({
        username: state.session.profile.username,
        abmStatus: state.abmStatus
    }),
    dispatch => ({
        saveProduct: (name, currency, value, descrip, username, actionType) => dispatch(saveProductRequest(name, currency, value, descrip, username, actionType))
    })
)(FormProduct)


FormProduct.protoTypes = {
    abmStatus: PropTypes.shape({
        saving: PropTypes.bool,
        success: PropTypes.bool,
        sending: PropTypes.bool
    }),
    products: PropTypes.arrayOf(PropTypes.shape({})),
    username: PropTypes.string.isRequired,
    saveProduct: PropTypes.func.isRequired
}

FormProduct.defaultProps = {
    product: null,
    username: null,
    abmStatus: {
        saving: false,
        success: false,
        sending: false,
    },
    error: {
        anErrorOccurred: false,
        errorMsg: ''
    },
}
