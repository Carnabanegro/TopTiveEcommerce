import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom'
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {faChevronCircleRight, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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
        <div>
            <Container className="p-5">
                <Form onSubmit={e => handleForm(e)}>
                    <Row class="align-items-center ">
                        <Col sm="6">
                            <FormGroup>
                                <h2>
                                    <FontAwesomeIcon icon={faChevronCircleRight}/>
                                    &nbsp; Iniciar sesión
                                </h2>
                            </FormGroup>
                        </Col>
                        <Col sm="2" >
                            <Button onClick={handleBack}>
                                <CloseIcon/>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder=""
                                type="username"
                                onChange={e => setUser(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="password placeholder"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormGroup>
                    </Row>
                    <Row class="align-items-center">
                        <Col class="align-items-center" sm="12">
                            <Button
                                type="submit"
                                color="primary"
                            >
                                <FontAwesomeIcon icon={faPowerOff}/>
                                &nbsp; Ingresar
                            </Button>
                            &nbsp;
                            <Button
                                color="danger"
                                onClick={e => handleRegister(e)}
                            >
                                <FontAwesomeIcon icon={faPowerOff}/>
                                &nbsp; Registrarse
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row className="p-4">
                    <InfoHandler
                        errorLabel={error.errorMsg}
                        error={error.anErrorOccurred}
                        saving={abmStatus.saving}
                        success={abmStatus.success}
                    />
                </Row>
            </Container>
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