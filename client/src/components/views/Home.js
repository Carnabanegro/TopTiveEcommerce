import React, {Component} from 'react';
import {connect} from 'react-redux'
import ProductsList from "../common/ProductsList";
import {requestProducts} from "../../actions/product";
import Pagination from "../common/Pagination";
import PropTypes from "prop-types";
import {saveOrderRequest} from "../../actions/order";
import InfoHandler from "../common/InfoHandler";
import HomeStyle from "./styles/home";
import PaginationStyle from "../common/styles/pagination";
import {withStyles} from "@material-ui/core";
import {compose} from "redux";



class Home extends Component{

    static propTypes = {
        token: PropTypes.string,
        profile: PropTypes.shape({
            usuario: PropTypes.string
        }),
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
        buyProduct: PropTypes.func.isRequired,
        current: PropTypes.number,
        size: PropTypes.number,
        total: PropTypes.number,
    }

    static defaultProps = {
        products: null,
        orders: null,
        abmStatus: {
            saving: false,
            success: false,
            sending: false,
        },
        error: {
            anErrorOccurred: false,
            errorMsg: ''
        },
        current: 0,
        size: 0,
        total: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            products: this.props.products,
            size: this.props.size,
            total: this.props.total,
            token: this.props.token,
            profile: this.props.profile,
            abmStatus: this.props.abmStatus,
            error: this.props.error,
        }
    }

    componentDidMount() {
        if(!this.state.profile){
            this.props.fetchProducts(null, null, this.state.current);
        }else{
            this.props.fetchProducts(null, null, this.state.current,this.state.profile.id)
        }
    }

    handleBuy(id) {
        this.props.buyProduct(id, this.props.profile.username, "save");
    }

    handlePage(numberPage) {
        this.setState({current: numberPage})
        if(!this.state.profile){
            this.props.fetchProducts(null, null, numberPage,null)
        }else{
            this.props.fetchProducts(null, null, numberPage,this.state.profile.id)
        }

    }

    render(){
        const {current,size,total,products} = this.props;
        const {classes} = this.props;
        return(
            <div className={classes.container}>
                {!this.props.error.anErrorOccurred && (
                    <>
                        <ProductsList products={products} func={(currency,value,productName)=>this.handleBuy(currency,value,productName)} sell/>
                        <Pagination className={classes.end} current={current} size={size} total={total} onClick={(page)=> this.handlePage(page)}/>
                    </>
                )}
                <InfoHandler
                    errorLabel={this.props.error.errorMsg}
                    error={this.props.error.anErrorOccurred}
                    saving={this.props.abmStatus.saving}
                    success={this.props.abmStatus.success}
                />
            </div>
        )
    }


}

export default compose(
    connect(
        state => ({
            products: state.product.result,
            size: state.product.size,
            total: state.product.total,
            current: state.product.current,
            token: state.session.token,
            profile: state.session.profile,
            abmStatus: state.abmStatus,
            error: state.error,
        }),
        dispatch => ({
            fetchProducts: (fname, fvalue, current, userId, mySells) => dispatch(requestProducts(fname, fvalue, current, userId,mySells)),
            buyProduct: (id, username, actionType) => dispatch(saveOrderRequest(id, username, actionType))
        })
    ),
    withStyles(HomeStyle,PaginationStyle))(Home);





