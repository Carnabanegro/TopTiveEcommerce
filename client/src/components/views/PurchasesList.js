import React, {useEffect} from 'react';
import {Button, Table} from 'reactstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {requestOrders} from "../../actions/order";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {map} from "lodash";

function PurchasesList({fetchOrders, orders, current, profile}) {

    useEffect(() => {
        fetchOrders(null, null, current, profile.id)
    }, [])


    return (
        <div className="container align-items-center h-100">
            <Table striped>
                <thead>
                <tr>
                    <th>
                        #
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
        </div>
    );
}

export default connect(
    state => ({
        orders: state.order.result,
        size: state.order.size,
        total: state.order.total,
        current: state.order.current,
        profile: state.session.profile
    }),
    dispatch => ({
        fetchOrders: (fname, fvalue, current, userId) => dispatch(requestOrders(fname, fvalue, current, userId))
    })
)(PurchasesList)


PurchasesList.protoTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({})),
    profile: PropTypes.shape({}),
    fetchOrders: PropTypes.func.isRequired,
    current: PropTypes.number,
    size: PropTypes.number,
    total: PropTypes.number,
}

PurchasesList.defaultProps = {
    orders: null,
    current: 0,
    size: 0,
    total: 0
}