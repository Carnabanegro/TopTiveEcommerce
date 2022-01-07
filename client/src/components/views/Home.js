import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

import ProductsList from "../common/ProductsList";
import {requestProducts} from "../../actions/product";
import Pagination from "../common/Pagination";
import PropTypes from "prop-types";
import {saveOrderRequest} from "../../actions/order";
import {useNavigate} from "react-router-dom";

function Home({fetchProducts, products, size, total, buyProduct, profile, token}) {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(!profile){
            fetchProducts(null, null, current);
        }else{
            fetchProducts(null, null, current,profile.id)
        }
    }, [])

    function handlePage(numberPage) {
        setCurrent(numberPage)
        if(!profile){
            fetchProducts(null, null, numberPage,null)
        }else{
            fetchProducts(null, null, numberPage,profile.id)
        }

    }

    function handleBuy(currency, value, productName) {
        if (!profile && !token) {
            navigate("/login")
        } else {
            buyProduct(currency, value, profile.username, productName, "save");
        }

    }

    return (
        <div>
            <ProductsList products={products} func={handleBuy} sell/>
            <Pagination current={current} size={size} total={total} onClick={handlePage}/>
        </div>

    )
}

export default connect(
    state => ({
        products: state.product.result,
        size: state.product.size,
        total: state.product.total,
        current: state.product.current,
        token: state.session.token,
        profile: state.session.profile
    }),
    dispatch => ({
        fetchProducts: (fname, fvalue, current, userId, mySells) => dispatch(requestProducts(fname, fvalue, current, userId,mySells)),
        buyProduct: (currency, value, username, productName, actionType) => dispatch(saveOrderRequest(currency, value, username, productName, actionType))
    })
)(Home)


Home.protoTypes = {
    token: PropTypes.string,
    profile: PropTypes.shape({
        usuario: PropTypes.string
    }),
    products: PropTypes.arrayOf(PropTypes.shape({})),
    fetchProducts: PropTypes.func.isRequired,
    buyProduct: PropTypes.func.isRequired,
    current: PropTypes.number,
    size: PropTypes.number,
    total: PropTypes.number,
}

Home.defaultProps = {
    products: null,
    current: 0,
    size: 0,
    total: 0
}





