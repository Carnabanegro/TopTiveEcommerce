import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {Button, Table} from "reactstrap";
import {map} from "lodash";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoHandler from "../common/InfoHandler";
import {requestOrdersWithLiquidation} from "../../actions/order";
import PropTypes from "prop-types";
import Pagination from "../common/Pagination";
import PaidIcon from '@mui/icons-material/Paid';

function Statistics({fetchOrdersWithLiquidation,session,orders,error,abmStatus,size,total,liquidation}){
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        fetchOrdersWithLiquidation(null, null, 0,session.profile.id,"liquidation",session.token)
    }, [])

    function handlePage(numberPage) {
        setCurrent(numberPage)
        fetchOrdersWithLiquidation(null, null, numberPage,session.profile.id,"liquidation",session.token)
    }


    return (
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
                        {map(orders, (order, index) => {
                            return (
                                <tr>
                                    <th scope="row">
                                        {index + 1}
                                    </th>
                                    <td>
                                        {order.User.firstName}
                                    </td>
                                    <td>
                                        {order.User.firstName} {order.User.lastName}
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
                    <Pagination current={current} size={size} total={total} onClick={handlePage}/>
                </div>
                <div className="col-3">
                    <div className="card border-start border-5 border-danger opacity-75">
                        <div className="card-body row align-items-center ">
                            <div className="col-8 font-monospace">
                                <div className="display-5">{liquidation}</div>
                                <div className="card-text">Total sales in USD</div>
                                <div className="display-5">{total}</div>
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


Statistics.protoTypes = {
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

Statistics.defaultProps = {
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


