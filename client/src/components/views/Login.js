import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom'
import {Button, Col, Form, FormGroup, Input, Row} from "reactstrap";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import 'bootstrap/dist/css/bootstrap.min.css';
import {requestLogin} from "../../actions/login";
import CloseIcon from '@mui/icons-material/Close';
import InfoHandler from "../common/InfoHandler";
import {clearError} from "../../actions";

function Login({requestLogin, token,abmStatus,error,clearError}) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();
        requestLogin(user, password);
    }

    function handleRegister(e) {
        e.preventDefault()
        navigate("/register")
        clearError();
    }

    function handleBack(){
        navigate(-1)
        clearError()
    }

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    });

    return (
        <div className="container-fluid ">
            <Row className="p-5">
                <Col sm={{size: 4, offset: 4}} className="bg-dark bg-opacity-10 pt-2 pb-3 rounded" >
                    <Form onSubmit={e => handleForm(e)}>
                        <Row class="align-items-center">
                            <Col sm="8" lg="10">
                                <FormGroup>
                                    <h2>
                                        <DoubleArrowIcon fontSize="large" className="bg-dark text-light rounded-circle"/>
                                        &nbsp; Iniciar sesión
                                    </h2>
                                </FormGroup>
                            </Col>
                            <Col sm="2" lg="2" >
                                <Button color="transparent" onClick={handleBack}>
                                    <CloseIcon />
                                </Button>
                            </Col>
                        </Row>
                        <Row className="p-4">
                            <FormGroup>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    type="username"
                                    onChange={e => setUser(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    id="examplePassword"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </FormGroup>
                        </Row>
                        <Row class="pb-3 align-items-center">
                            <Col sm="5" lg="6">
                                <Button
                                    type="submit"
                                    style={{backgroundColor: '#FC5130', border:'none'}}
                                >
                                    <LoginIcon/>
                                    &nbsp; Ingresar
                                </Button>
                            </Col>
                            <Col sm="5" lg="6">
                                <Button
                                    color="dark"
                                    onClick={e => handleRegister(e)}
                                >
                                    <AppRegistrationIcon/>
                                    &nbsp; Registrarse
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className="p-4">
                <InfoHandler
                    errorLabel={error.errorMsg}
                    error={error.anErrorOccurred}
                    saving={abmStatus.saving}
                    success={abmStatus.success}
                />
            </Row>
        </div>
    );
}

export default connect(
    state => ({
        login: state.login,
        token: state.session.token,
        abmStatus: state.abmStatus,
        error: state.error
    }),
    dispatch => ({
        requestLogin: (user, password) => dispatch(requestLogin(user, password)),
        clearError: () => dispatch(clearError())
    })
)(Login)

Login.protoTypes = {
    profile: PropTypes.shape({
        usuario: PropTypes.string
    }),
    session: PropTypes.shape({
        error: PropTypes.bool
    }),
    login: PropTypes.shape({
        error: PropTypes.bool
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
    clearError: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    requestLogin: PropTypes.func.isRequired,
    succeededMsj: PropTypes.string
}

Login.defaultProps = {
    profile: null,
    abmStatus: {
        saving: false,
        success: false,
        sending: false,
    },
    error: {
        anErrorOccurred: false,
        errorMsg: ''
    },
    session: {
        error: false
    },
    succeededMsj: null,
    login: {
        user: '',
        role: ''
    },
    loading: true
}