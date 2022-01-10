import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button, Table} from "reactstrap";
import {map} from "lodash";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoHandler from "../common/InfoHandler";
import {requestOrdersWithLiquidation} from "../../actions/order";
import PropTypes from "prop-types";
import Pagination from "../common/Pagination";
import PaidIcon from '@mui/icons-material/Paid';

class Statistics extends Component{

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
        fetchOrdersWhitLiquidations: PropTypes.func.isRequired,
        current: PropTypes.number,
        size: PropTypes.number,
        total: PropTypes.number,
        liquidation: PropTypes.number
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
        total: 0,
        liquidation: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            current : this.props.current
        }
    }

    componentDidMount() {
        this.props.fetchOrdersWithLiquidation(null, null, 0,this.props.session.profile.id,"liquidation",this.props.session.token)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.fetchOrdersWithLiquidation(null, null, 0,this.props.session.profile.id,"liquidation",this.props.session.token)
    }

    handlePage(numberPage) {
        this.setState({current: numberPage})
        this.props.fetchOrdersWithLiquidation(null, null, numberPage,this.props.session.profile.id,"liquidation",this.props.session.token)
    }

    render(){
        return(
            <div className="container-fluid align-items-center h-100 p-5">
                <div className="row">
                    <div className="col-9">
                        <Table striped>
                            <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    User
                                </th>
                                <th>
                                    Full Name
                                </th>
                                <th>
                                    Currency
                                </th>
                                <th>
                                    Value
                                </th>
                                <th>
                                    Details
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
                                        <td>

                                        </td>
                                        <td>
                                            {order.User.lastName}
                                        </td>
                                        <td>
                                            {order.currency}
                                        </td>
                                        <td>
                                            {order.value}
                                        </td>
                                        <td>
                                            <Button onClick={() => console.log("ver detalles")}>
                                                <RemoveRedEyeIcon/>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                        <Pagination current={this.props.current} size={this.props.size} total={this.props.total} onClick={this.handlePage}/>
                    </div>
                    <div className="col-3">
                        <div className="card border-start border-5 border-danger opacity-75">
                            <div className="card-body row align-items-center ">
                                <div className="col-8 font-monospace">
                                    <div className="display-5">{this.props.liquidation}</div>
                                    <div className="card-text">Total sales in USD</div>
                                    <div className="display-5">{this.props.total}</div>
                                    <div className="card-text">Number of sales</div>
                                </div>
                                <div className="col-4">
                                    <PaidIcon style={{width: '5rem', height: '5rem', color: '#991f33'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(
        state => ({
    orders: state.order.result,
    size: state.order.size,
    total: state.order.total,
    session: state.session,
    abmStatus: state.abmStatus,
    error: state.error,
    liquidation: state.order.liquidation
}),
dispatch => ({
    fetchOrdersWithLiquidation: (fname, fvalue, current, userId,actionType,token) => dispatch(requestOrdersWithLiquidation(fname, fvalue, current, userId,actionType,token))
})
)(Statistics)


/*function Statistics({fetchOrdersWithLiquidation,session,orders,error,abmStatus,size,total,liquidation}){*/








