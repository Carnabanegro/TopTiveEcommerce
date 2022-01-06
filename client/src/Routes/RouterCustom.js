import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {connect} from 'react-redux';
import {map} from 'lodash';
import Home from "../components/views/Home";
import Login from "../components/views/Login";
import Register from "../components/views/Register";
import OrdersList from "../components/views/OrdersList";
import PurchasesList from "../components/views/PurchasesList";
import NavBar from "../components/common/NavBar";
import AdminPanel from "../components/views/AdminPanel";


function RouterCustom({session}) {

    const routesSignIn = [
        {key: 1, path: "/", exact: true, main: () => <Home/>, name: "Home"},
        {key: 2, path: "/login", exact: true, main: () => <Login/>, name: "Login"},
        {key: 3, path: "/register", exact: true, main: () => <Register/>, name: "Register"}
    ]

    const routes = [
        {key: 4, path: "/sells", exact: true, main: () => <OrdersList/>, name: "My Sells"},
        {key: 5, path: "/purchases", exact: true, main: () => <PurchasesList/>, name: "My Buys"},
        {key: 5, path: "/admin", exact: true, main: () => <AdminPanel/>, name: "Admin panel"}
    ]
    let allRoutes = session.profile && session.token ? [...routesSignIn, ...routes] : routesSignIn;


    return (
        <div>
            <BrowserRouter>
                <NavBar
                    routes={allRoutes}/>
                <Routes>
                    {map((allRoutes), (key) => {
                        return (
                            <Route key={key.key} path={key.path} exact={key.exact} element={<key.main/>}/>
                        )
                    })}
                    <Route path="*" element={<Navigate replace to="/"/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default connect(
    state => (
        {
            session: state.session
        }
    )
)(RouterCustom);