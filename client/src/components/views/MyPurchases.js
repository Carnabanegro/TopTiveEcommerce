import React, {Component} from 'react';
import {Table} from 'reactstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {requestOrders} from "../../actions/order";
import {map} from "lodash";
import InfoHandler from "../common/InfoHandler";
import Pagination from "../common/Pagination";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import PaginationStyle from "../common/styles/pagination";

class MyPurchases extends Component{


    static propTypes = {
        error: PropTypes.shape({
            anErrorOccurred: PropTypes.bool,
            errorMsg: PropTypes.string
        }),
        abmStatus: PropTypes.shape({
            saving: PropTypes.bool,
            success: PropTypes.bool,
            sending: PropTypes.bool
        }),
        orders: PropTypes.arrayOf(PropTypes.shape({})),
        profile: PropTypes.shape({}),
        fetchOrders: PropTypes.func.isRequired,
        current: PropTypes.number,
        size: PropTypes.number,
        total: PropTypes.number,
    }

    static defaultProps = {
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
            current : 0
        }
    }

    handleClose(){
        this.setState({open:false});
    }


    componentDidMount() {
        this.props.fetchOrders(null, null, this.state.current, this.props.profile.id)
    }

    handlePage(numberPage) {
        this.setState({current:numberPage})
        this.props.fetchOrders(null, null, numberPage, this.props.profile.id)
    }

    render(){
        const {classes} = this.props;
        return(
            <div className="container-fluid align-items-center h-100 p-5">
                {!this.props.error.anErrorOccurred && (
                    <>
                        <Table className="table table-bordered table-striped  table-dark">
                            <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Product name
                                </th>
                                <th>
                                    Currency
                                </th>
                                <th>
                                    Value
                                </th>
                                <th>
                                    Seller Name
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {map(this.props.orders, (order, index) => {
                                return (
                                    <tr>
                                        <th scope="row">
                                            {index + 1}
                                        </th>
                                        <th>
                                            {order.Product.name}
                                        </th>
                                        <td>
                                            {(order.currency === 'usd$'? 'USD': '$')}
                                        </td>
                                        <td>
                                            {order.value}
                                        </td>
                                        <th>
                                            {order.Product.User.firstName} {order.Product.User.lastName}
                                        </th>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                        <Pagination className={classes.end} current={this.state.current} size={this.props.size} total={this.props.total} onClick={(page)=> this.handlePage(page)}/>
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
        orders: state.order.result,
        size: state.order.size,
        total: state.order.total,
        current: state.order.current,
        profile: state.session.profile,
        abmStatus: state.abmStatus,
        error: state.error
    }),
    dispatch => ({
        fetchOrders: (fname, fvalue, current, userId) => dispatch(requestOrders(fname, fvalue, current, userId)),
    })),
    withStyles(PaginationStyle) )(MyPurchases)


