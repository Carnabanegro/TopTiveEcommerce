import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, Button, CardHeader, CardFooter, CardBody, CardTitle, Row, Col
} from 'reactstrap';
import {Modal} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import shopLogo from '../../../images/shopLogo.svg';
import ModalBasicStyle from '../styles/modalStyle';

const useStyles = makeStyles(ModalBasicStyle);

const ModalBasic = ({
                        body, tittle, handleModal, showModal, buttonOpenTittle, buttonCloseTittle, func
                    }) => {
    const classes = useStyles();
    return (
        <Modal open={showModal} onClose={handleModal} className={classes.modal}>
            <Card className={classes.paper}>
                <CardHeader className={classes.header}>
                    <img src={shopLogo} alt="logo" className={classes.img}/>
                    <b>Top Tive Store</b>
                </CardHeader>
                <CardBody className={classes.body}>
                    <CardTitle className={classes.title}><b>{tittle}</b></CardTitle>
                    {body}
                </CardBody>
                <CardFooter className={classes.footer}>
                    <Row className="container-fluid">
                        <Col sm="12">
                            { buttonOpenTittle !== '' && (
                                <Button
                                    className="btn-block"
                                    color="success"
                                    onClick={func}
                                >
                                    {buttonOpenTittle}
                                </Button>
                            )}
                            &nbsp;
                            { buttonCloseTittle !== '' && (
                                <Button
                                    className="btn-block"
                                    color="danger"
                                    onClick={handleModal}
                                >
                                    {buttonCloseTittle}
                                </Button>
                            )}
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </Modal>
    );
};


ModalBasic.propTypes = {
    body: PropTypes.shape.isRequired,
    tittle: PropTypes.string.isRequired,
    handleModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    buttonOpenTittle: PropTypes.string.isRequired,
    buttonCloseTittle: PropTypes.string.isRequired,
    func: PropTypes.func
};

ModalBasic.defaultProps = {
    func: null
};

export default ModalBasic;