import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleRight, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {requestRegister} from "../../actions/user";

function Register({requestRegister, abmStatus}) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("");
    const navigate = useNavigate();


    function handleForm(e) {
        e.preventDefault()
        requestRegister(user, password, fullName, email, tel)
    }

    function handleBack() {
        navigate(-1);
    }

    useEffect(() => {
        if (abmStatus.success && !abmStatus.sending && !abmStatus.saving) {
            navigate("/login")
        }
    }, [])

    return (
        <Container>
            <Row class="align-items-center">
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
                                        <FormGroup controlId="password">
                                            <Input
                                                id="fullName"
                                                type="fullName"
                                                value={fullName}
                                                placeholder="Full name"
                                                required
                                                onChange={e => setFullName(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row class="vertical-margin">
                                    <Col sm="12">
                                        <FormGroup controlId="password">
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
                                        <FormGroup controlId="password">
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
        </Container>
    );
}

export default connect(
    state => ({
        abmStatus: state.abmStatus
    }),
    dispatch => ({
        requestRegister: (username, password, fullName, email, tel) => dispatch(requestRegister(username, password, fullName, email, tel))
    })
)(Register)

Register.protoTypes = {
    error: PropTypes.shape({
        anErrorOccurred: PropTypes.bool,
        errorMsg: PropTypes.string
    }),
    abmStatus: PropTypes.shape({
        saving: PropTypes.bool,
        success: PropTypes.bool
    }),
    requestRegister: PropTypes.func.isRequired,
}

Register.defaultProps = {
    abmStatus: {
        saving: false,
        success: false
    },
    error: {
        anErrorOccurred: false,
        errorMsg: ''
    },
}