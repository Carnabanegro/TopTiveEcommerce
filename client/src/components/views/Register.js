import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleRight, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {requestRegister} from "../../actions/user";
import InfoHandler from "../common/InfoHandler";
import {clearError} from "../../actions";

function Register({requestRegister,abmStatus,error,clearError}) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("");
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault()
        requestRegister(user, password, firstName,lastName, email, tel)
    }

    function handleBack() {
        navigate(-1);
        clearError()
    }


    useEffect(() => {
        if (abmStatus.success && !abmStatus.sending && !abmStatus.saving) {
            navigate("/");
        }
    },[abmStatus]);

    return (
        <Container>
            <Row class="p-5 align-items-center">
                <Col sm={{size: 4, offset: 4}}>
                    <Row>
                        <Col>
                            <Form onSubmit={e => handleForm(e)}>
                                <Row class="align-items-center">
                                    <Col sm="12">
                                        <FormGroup>
                                            <h2>
                                                <FontAwesomeIcon icon={faChevronCircleRight}/>
                                                &nbsp; Register
                                            </h2>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row class="vertical-margin">
                                    <Col sm="12">
                                        <FormGroup
                                            controlId="username"
                                            className="form-group"
                                        >
                                            <Input
                                                type="text"
                                                id="username"
                                                value={user}
                                                placeholder="Username"
                                                required
                                                onChange={(e) => setUser(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row class="vertical-margin">
                                    <Col sm="12">
                                        <FormGroup controlId="password">
                                            <Input
                                                id="password"
                                                type="password"
                                                value={password}
                                                placeholder="Password"
                                                required
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row class="vertical-margin">
                                    <Col sm="12">
                                        <FormGroup controlId="firstName">
                                            <Input
                                                id="firstName"
                                                type="firstName"
                                                value={firstName}
                                                placeholder="First name"
                                                required
                                                onChange={e => setFirstName(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row class="vertical-margin">
                                    <Col sm="12">
                                        <FormGroup controlId="lastName">
                                            <Input
                                                id="lastName"
                                                type="lastName"
                                                value={lastName}
                                                placeholder="Last name"
                                                required
                                                onChange={e => setLastName(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row class="vertical-margin">
                                    <Col sm="12">
                                        <FormGroup controlId="tel">
                                            <Input
                                                id="tel"
                                                type="tel"
                                                value={tel}
                                                placeholder="Phone number"
                                                required
                                                onChange={e => setTel(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row class="vertical-margin">
                                    <Col sm="12">
                                        <FormGroup controlId="email">
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                placeholder="Mail"
                                                required
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row class="align-items-center">
                                    <Col class="align-items-center" sm="12">
                                        <Button
                                            type="submit"
                                            color="primary"

                                        >
                                            <FontAwesomeIcon icon={faPowerOff}/>
                                            &nbsp; Register
                                        </Button>
                                        &nbsp;
                                        <Button
                                            type="submit"
                                            color="secondary"
                                            onClick={() => handleBack()}
                                        >
                                            <FontAwesomeIcon icon={faPowerOff}/>
                                            &nbsp; Back
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                        </Col>
                    </Row>
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
        </Container>


    );
}

export default connect(
    state => ({
        abmStatus: state.abmStatus,
        error: state.error
    }),
    dispatch => ({
        requestRegister: (username, password, firstName,lastName, email, tel) => dispatch(requestRegister(username, password,firstName,lastName, email, tel)),
        clearError: () => dispatch(clearError())
    })
)(Register)

Register.protoTypes = {
    error: PropTypes.shape({
        anErrorOccurred: PropTypes.bool,
        errorMsg: PropTypes.string
    }),
    abmStatus: PropTypes.shape({
        saving: PropTypes.bool,
        success: PropTypes.bool,
        sending: PropTypes.bool
    }),
    requestRegister: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired
}

Register.defaultProps = {
    abmStatus: {
        saving: false,
        success: false,
        sending: false,
    },
    error: {
        anErrorOccurred: false,
        errorMsg: ''
    },
}