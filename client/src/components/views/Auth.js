import React, {useEffect, useState} from 'react';
import {Card, CardTitle, Button, CardBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {activateAccountRequest, resendEmailConfirmationRequest} from "../../actions/user";
import InfoHandler from "../common/InfoHandler";


function Auth({activateAccount,abmStatus,error,resendEmailConfirmation}){
    let {token} = useParams();
    const [mail,setMail] = useState()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        if (abmStatus.success && !abmStatus.sending && !abmStatus.saving) {
            let timer = setTimeout(() => navigate("/"), 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    },[abmStatus]);

    function handleActive(){
        activateAccount(token)
    }

    function handleReSend(){
        resendEmailConfirmation(username,password,mail)
    }
    return(
            <div className="container-fluid h-50 justify-content-center p-5">
                <div className="row justify-content-center">
                    {error.errorMsg ? (
                        <div className="col-8">
                            <Card className="bg-dark bg-opacity-10 border-0">
                                <CardTitle><h2>Resend confirmation mail.</h2></CardTitle>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Input
                                                type="username"
                                                id="email"
                                                value={username}
                                                placeholder="Username"
                                                required
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                type="password"
                                                id="password"
                                                value={password}
                                                placeholder="Password"
                                                required
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                type="email"
                                                id="email"
                                                value={mail}
                                                placeholder="Mail"
                                                required
                                                onChange={(e) => setMail(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Form>
                                    <Button color="success" onClick={handleReSend}>send</Button>
                                </CardBody>
                            </Card>
                        </div>

                    ):(
                        <div className="col-8">
                        <Card className="bg-dark bg-opacity-10 border-0">
                            <CardTitle><h2>Activate your account , click the button</h2></CardTitle>
                            <CardBody>
                                <Button color="success" onClick={handleActive}>Confirm</Button>
                            </CardBody>

                        </Card>
                        </div>
                    )}


                </div>
                <div className="row justify-content-center p-4">
                    <div className="col-sm-6">
                        <InfoHandler
                            errorLabel={error.errorMsg}
                            error={error.anErrorOccurred}
                            saving={abmStatus.saving}
                            success={abmStatus.success}
                            successMsg={abmStatus.successMsg}
                        />
                    </div>
                </div>
            </div>
    )
}

export default connect(
        state => ({
            error: state.error,
            abmStatus: state.abmStatus,
        }),
        dispatch => ({
            activateAccount: (token) =>(dispatch(activateAccountRequest(token))),
            resendEmailConfirmation: (username,password,email) =>(dispatch(resendEmailConfirmationRequest(username,password,email)))

        })
)(Auth)

Auth.protoTypes = {
    activateAccount : PropTypes.func.isRequired,
    resendEmailConfirmation:  PropTypes.func.isRequired,
    error: PropTypes.shape({
        anErrorOccurred: PropTypes.bool,
        errorMsg: PropTypes.string
    }),
    abmStatus: PropTypes.shape({
        saving: PropTypes.bool,
        success: PropTypes.bool,
        sending: PropTypes.bool
    }),
}

Auth.defaultProps = {
    abmStatus: {
        saving: false,
        success: false,
        sending: false,
    },
    error: {
        anErrorOccurred: false,
        errorMsg: ''
    }
}
