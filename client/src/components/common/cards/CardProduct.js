import React from 'react';
import {Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardTitle} from 'reactstrap';
import {makeStyles} from "@material-ui/core/styles";
import CardProductStyle from "../styles/cardProductStyle";

const useStyles = makeStyles(CardProductStyle);

export default function ProductsList({product, buyButton, buyFunc}) {
    const classes = useStyles();
    return (
        <div className="col-md-4">
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
                    <Button className="col-3">Details</Button>
                    {buyButton && <Button color="success" className="col-3"
                                          onClick={() => buyFunc(product.currency, product.value, product.name)}>Comprar</Button>}
                </CardFooter>
            </Card>
        </div>
    );
};