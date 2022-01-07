import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import ProductsList from "../common/ProductsList";
import PropTypes from "prop-types";
import {Button} from 'reactstrap';
import FormProduct from '../common/form/FormProduct'
import {requestProducts} from "../../actions/product";
import Pagination from "../common/Pagination";

function MyProductsToSell({products, fetchProducts, size, total,profile}) {
    const [isAdd, setAdd] = useState(false)
    const [current, setCurrent] = useState(0);


    useEffect(() => {
        fetchProducts(null, null, current,profile.id,true);
    },[])

    function handlePage(numberPage) {
        setCurrent(numberPage)
        fetchProducts(null, null, numberPage,profile.id,true)
    }

    function handleTab(add){
        setAdd(add);
        fetchProducts(null, null, current,profile.id,true);
    }

    return (
        <div className="container-fluid">
            <div className="row p-4 justify-content-center">
                <div className="col-sm-2">
                    <Button color="primary"
                            onClick={() => setAdd(!isAdd)}>{!isAdd ? "Agregar Producto" : "Volver a la lista"}</Button>
                </div>
            </div>
            <div className="row justify-content-center">
                {!isAdd ?
                    <div className="col-sm-12">
                        <ProductsList products={products} noSell/>
                        <Pagination current={current} size={size} total={total} onClick={handlePage}/>
                    </div>
                    :
                    <div className="col-sm-6"><FormProduct changeTab={handleTab}/></div>
                }
            </div>
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
        abmStatus: state.abmStatus
    }),
    dispatch => ({
        fetchProducts: (fname, fvalue, current,userId,myProducts) => dispatch(requestProducts(fname, fvalue, current,userId,myProducts))
    })
)(MyProductsToSell)


MyProductsToSell.protoTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({})),
    fetchProducts: PropTypes.func.isRequired,
    current: PropTypes.number,
    size: PropTypes.number,
    total: PropTypes.number,
    profile: PropTypes.shape({}),
}

MyProductsToSell.defaultProps = {
    products: null,
    current: 0,
    size: 0,
    total: 0
}
