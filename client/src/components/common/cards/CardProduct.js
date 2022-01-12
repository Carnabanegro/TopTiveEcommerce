import React from 'react';
import {connect} from 'react-redux'
import {Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardTitle} from 'reactstrap';
import {makeStyles} from '@material-ui/core/styles';
import CardProductStyle from '../styles/cardProductStyle';
import ModalBasic from '../modal/Modal';
import {Link} from 'react-router-dom';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from "../payment/PaymentForm";
import ProductInfo from "./ProductInfo";


const useStyles = makeStyles(CardProductStyle);

const stripePromise = loadStripe('pk_test_Dt4ZBItXSZT1EzmOd8yCxonL');

function CardProduct({product, buyButton, buyFunc,profile,token}) {
    const classes = useStyles();
    const [openPay,setOpenPay] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    function handleClose(modal){
        if (modal === 'pay'){
            setOpenPay(false);
        }else{
            setOpen(false);
        }
    }

    function handleOpen(modal){
        if (modal === 'pay'){
            setOpenPay(true)
        }else{
            setOpen(true)
        }
    }



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
                    <CardSubtitle className={classes.cardSubttitle}>{product.currency === "usd$" ? "$USD" : "$"}&nbsp;{product.value}</CardSubtitle>
                </CardBody>
                <CardFooter className="text-center row justify-content-around ">
                    <Button className="col-lg-3 col-md-4 col-sm-3 bg-light border-0 text-dark " onClick={()=>{handleOpen('details')}}>Details</Button>
                    {(buyButton && (
                        (profile && token)?
                            <Button
                                className="bg-dark col-lg-3 col-md-4 col-sm-3 border-0"
                                onClick={() =>  {handleOpen('pay')}}
                            >
                                Comprar
                            </Button> :
                            <div className="col-lg-3 col-md-4 col-sm-3">
                                <Link to={"/login"}>
                                    <Button className="bg-dark  border-0"> Comprar</Button>
                                </Link>
                            </div>

                    ))}
                </CardFooter>
            </Card>
            <ModalBasic tittle="Informacion sobre el producto" buttonCloseTittle="Cerrar" buttonOpenTittle="" handleModal={() => handleClose()} showModal={open}  body={
                <ProductInfo product={product}/>
            }/>
            <ModalBasic tittle="Informacion de pago" buttonCloseTittle="Cerrar" buttonOpenTittle="" handleModal={() => handleClose('pay')} showModal={openPay}  body={
                <Elements stripe={stripePromise}>
                    <PaymentForm product = {product} buyFunc={buyFunc} />
                </Elements>
            }/>
        </div>
    );
}

export default connect(
    state => ({
        token: state.session.token,
        profile: state.session.profile,
    }),

)(CardProduct)
