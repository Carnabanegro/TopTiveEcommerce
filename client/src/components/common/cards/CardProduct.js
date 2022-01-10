import React from 'react';
import {connect} from 'react-redux'
import {Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardTitle} from 'reactstrap';
import {makeStyles} from '@material-ui/core/styles';
import CardProductStyle from '../styles/cardProductStyle';
import ModalBasic from '../modal/Modal';
import {Divider, ListItem} from "@material-ui/core";
import List from '@mui/material/List';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(CardProductStyle);

function CardProduct({product, buyButton, buyFunc,profile,token}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
     //const navigate = useNavigate();

    function handleClose(){
        setOpen(false);
    }
    function handleOpen(){
        setOpen(true)
    }

    /*function handleBuy(){
        if (!profile && !token) {
            navigate("/login")
        } else {
            buyFunc(product.currency, product.value, product.name);
        }
    }*/


    return (
        <div className="col-md-6 col-lg-4 pb-5">
            <Card className={classes.card}>
                <CardImg
                    alt="Card image cap"
                    src="http://placeimg.com/640/480/business"
                    top
                    className={classes.cardImg}
                    width="100%"
                />
                <CardBody className={classes.cardBody}>
                    <CardTitle className={classes.cardTittle}>{product.name}</CardTitle>
                    <CardSubtitle>{product.currency === "usd$" ? "$USD" : "$"}&nbsp;{product.value}</CardSubtitle>
                </CardBody>
                <CardFooter className="text-center row justify-content-around ">
                    <Button className="col-lg-3 col-md-4 col-sm-3 bg-light text-dark " onClick={()=>{handleOpen()}}>Details</Button>
                    {(buyButton && (
                        (profile && token)?
                            <Button
                                className="bg-danger bg-opacity-50 col-lg-3 col-md-4 col-sm-3 border-0"
                                onClick={() => buyFunc(product.currency, product.value, product.name)}
                            >
                                Comprar
                            </Button> :
                            <Link to={"/login"}>
                                <Button className=" bg-opacity-50 col-lg-3 col-md-4 col-sm-3 border-0"> Comprar en gris</Button>
                            </Link>
                    ))}
                    {/*{buyButton && <Button className="bg-danger bg-opacity-50 col-lg-3 col-md-4 col-sm-3 border-0"
                                          onClick={() => handleBuy()}>Comprar</Button>*/}
                </CardFooter>
            </Card>
            <ModalBasic tittle="Informacion sobre el producto" buttonCloseTittle="Cerrar" buttonOpenTittle="" handleModal={() => handleClose()} showModal={open}  body={
                <div className="container-fluid">
                    <List aria-label="mailbox folders">
                        <ListItem>
                            Name: {product.name}
                        </ListItem>
                        <ListItem>
                            Value: {product.currency === "usd$" ? "$USD" : "$"}&nbsp;{product.value}
                        </ListItem>
                        <ListItem divider>
                            Description: {product.descrip}
                        </ListItem>
                        <Divider />
                        <ListItem divider className="fw-bolder h5">
                            Detalles del vendedor
                        </ListItem>
                        <ListItem>
                            Name: {product.User.firstName} {product.User.lastName}
                        </ListItem>
                        <ListItem>
                            Email: {product.User.email}
                        </ListItem>
                        <ListItem>
                            Phone: {product.User.tel}
                        </ListItem>
                    </List>
                </div>
            }/>
        </div>
    );
}

export default connect(
    state => ({
        token: state.session.token,
        profile: state.session.profile,
    })
)(CardProduct)
