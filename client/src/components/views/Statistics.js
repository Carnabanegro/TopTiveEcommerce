import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Table} from "reactstrap";
import {map} from "lodash";
import InfoHandler from "../common/InfoHandler";
import {requestOrdersWithLiquidation} from "../../actions/statistics";
import PropTypes from "prop-types";
import Pagination from "../common/Pagination";
import PaidIcon from '@mui/icons-material/Paid';
import Loading from "../common/Loading";

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
        ordersStatistics: PropTypes.arrayOf(PropTypes.shape({})),
        profile: PropTypes.shape({}),
        fetchOrdersWhitLiquidations: PropTypes.func.isRequired,
        current: PropTypes.number,
        size: PropTypes.number,
        total: PropTypes.number,
        liquidation: PropTypes.number,
        loading: PropTypes.bool
    }

    static defaultProps = {
        ordersStatistics: null,
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


    handlePage(numberPage) {
        this.setState({current: numberPage})
        this.props.fetchOrdersWithLiquidation(null, null, numberPage,this.props.session.profile.id,"liquidation",this.props.session.token)
    }

    render(){
        return(
            <div>
            {this.props.loading && (<Loading label="Cargando"/>)}
            {!this.props.loading && (
                <div className="container-fluid align-items-center h-100 p-5">
                    <div className="row">
                        <div className="col-9">
                            <Table className="table table-bordered table-striped  table-dark">
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
                                </tr>
                                </thead>
                                <tbody>
                                {map(this.props.ordersStatistics, (order, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">
                                                {index + 1}
                                            </th>
                                            <td>
                                                {order.User.name}
                                            </td>
                                            <td>
                                                {order.User.lastName} {order.User.firstName}
                                            </td>
                                            <td>
                                                {(order.currency === 'usd$'? 'USD': '$')}
                                            </td>
                                            <td>
                                                {order.value}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                            <Pagination current={this.state.current} size={this.props.size} total={this.props.total}
                                        onClick={(page) => this.handlePage(page)}/>
                        </div>
                        <div className="col-3">
                            <div className="card border-start border-5 border-dark">
                                <div className="card-body row align-items-center ">
                                    <div className="col-8 font-monospace">
                                        <div className="display-5">{this.props.liquidation}</div>
                                        <div className="card-text">Total sales in USD</div>
                                        <div className="display-5">{this.props.total}</div>
                                        <div className="card-text">Number of sales</div>
                                    </div>
                                    <div className="col-4">
                                        <PaidIcon style={{width: '5rem', height: '5rem', color: '#FC5130'}}/>
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
        </div>
        )

    }
}

export default connect(
        state => ({
    ordersStatistics: state.orderStatistics.result,
    size: state.orderStatistics.size,
    total: state.orderStatistics.total,
    session: state.session,
    abmStatus: state.abmStatus,
    error: state.error,
            loading: state.order.loading,
    liquidation: state.orderStatistics.liquidation

}),
dispatch => ({
    fetchOrdersWithLiquidation: (fname, fvalue, current, userId,actionType,token) => dispatch(requestOrdersWithLiquidation(fname, fvalue, current, userId,actionType,token))
})
)(Statistics)








