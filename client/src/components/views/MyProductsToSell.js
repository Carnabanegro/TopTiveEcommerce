import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import ProductsList from "../common/ProductsList";
import PropTypes from "prop-types";
import {Button} from 'reactstrap';
import FormProduct from '../common/form/FormProduct'
import {requestProducts} from "../../actions/product";
import Pagination from "../common/Pagination";
import InfoHandler from "../common/InfoHandler";
import {clearError} from "../../actions";
import AddIcon from '@mui/icons-material/Add';

function MyProductsToSell({products, fetchProducts, size, total,profile,abmStatus,error}) {
    const [isAdd, setAdd] = useState(false)
    const [current, setCurrent] = useState(0);


    useEffect(() => {
        fetchProducts(null, null, current,profile.id,true);
    },[])

    function handlePage(numberPage) {
        setCurrent(numberPage)
        fetchProducts(null, null, numberPage,profile.id,true)
    }

    function handleTabAux(){
        setAdd(!isAdd);
    }

    function handleTab(add){
        setAdd(add);
        fetchProducts(null, null,current,profile.id,true);
    }

    return (

        <div className="container-fluid p-5">
            <div className="row p-4 justify-content-end">
                <div className="col-sm-2">
                    <Button className="bg-dark"
                            onClick={handleTabAux}>
                        <AddIcon/>
                        &nbsp;
                        {!isAdd ? "Agregar Producto" : "Volver a la lista"}
                    </Button>
                </div>
            </div>
            <div className="row justify-content-around">
                {!isAdd  ? (
                        !error.anErrorOccurred && (
                            <div className="col-sm-12">
                                <ProductsList products={products} noSell/>
                                <Pagination current={current} size={size} total={total} onClick={handlePage}/>
                            </div>
                        )) :
                        <div className="col-sm-6 bg-dark bg-opacity-10 rounded"><FormProduct changeTab={handleTab}/></div>
                }
            </div>
            <InfoHandler
                errorLabel={error.errorMsg}
                error={error.anErrorOccurred}
                saving={abmStatus.saving}
                success={abmStatus.success}
            />
        </div>
    );
}

export default connect(
    state => ({
        products: state.product.result,
        size: state.product.size,
        total: state.product.total,
        current: state.product.current,
        profile: state.session.profile,
        abmStatus: state.abmStatus,
        error: state.error
    }),
    dispatch => ({
        fetchProducts: (fname, fvalue, current,userId,myProducts) => dispatch(requestProducts(fname, fvalue, current,userId,myProducts)),
        clearError: () => dispatch(clearError())
    })
)(MyProductsToSell)


MyProductsToSell.protoTypes = {
    error: PropTypes.shape({
        anErrorOccurred: PropTypes.bool,
        errorMsg: PropTypes.string
    }),
    abmStatus: PropTypes.shape({
        saving: PropTypes.bool,
        success: PropTypes.bool,
        sending: PropTypes.bool
    }),
    products: PropTypes.arrayOf(PropTypes.shape({})),
    fetchProducts: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    current: PropTypes.number,
    size: PropTypes.number,
    total: PropTypes.number,
    profile: PropTypes.shape({}),
}

MyProductsToSell.defaultProps = {
    products: null,
    current: 0,
    size: 0,
    total: 0,
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
