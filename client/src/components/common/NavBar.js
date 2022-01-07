import React from "react";
import Menu from "./Menu";
import {Link} from "react-router-dom";
import {Button, Container, Navbar} from "reactstrap";
import ModalBasic from "./modal/Modal";
import {connect} from "react-redux";
import PropTypes from "prop-types";

function NavBar({token, routes,abmStatus}) {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const logout = () => {
        localStorage.clear();
        window.location = '/';
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <Menu menuItems={routes}/>
                {!token ? (
                    <div>
                        <Link className="btn btn-outline-primary" to="/login">Login</Link>
                        &nbsp;
                        {!abmStatus.success}
                        <Link className="btn btn-outline-primary" to="/register">Register</Link>
                    </div>
                ) : (<Button color="primary" onClick={() => handleOpen()}>LogOut</Button>)}
            </Navbar>
            <ModalBasic
                tittle={(
                    <div style={{textAlign: 'center'}}>
                        <p>
                            Cerrando sesión
                        </p>
                        <p>
                            ¿Está seguro?
                        </p>
                    </div>
                )}
                buttonOpenTittle="Si, estoy seguro"
                buttonCloseTittle="Cancelar"
                showModal={open}
                handleModal={() => handleClose()}
                func={() => logout()}
                body={(Container)}
            />
        </div>
    );
}

export default connect(
    state => ({
        error: state.error,
        abmStatus: state.abmStatus,
        token: state.session.token,
        profile: state.session.profile
    })
)(NavBar)

NavBar.protoTypes = {
    error: PropTypes.shape({
        anErrorOccurred: PropTypes.bool,
        errorMsg: PropTypes.string
    }),
    abmStatus: PropTypes.shape({
        saving: PropTypes.bool,
        success: PropTypes.bool
    }),
    profile: PropTypes.shape({
        usuario: PropTypes.string
    }),
    session: PropTypes.shape({
        error: PropTypes.bool
    }),
    login: PropTypes.shape({
        error: PropTypes.bool
    }),
    loading: PropTypes.bool,
    requestLogin: PropTypes.func.isRequired,
    succeededMsj: PropTypes.string
}

NavBar.defaultProps = {
    profile: null,
    session: {
        error: false
    },
    succeededMsj: null,
    login: {
        user: '',
        role: ''
    },
    verifyToken: false,
    loading: true
}
