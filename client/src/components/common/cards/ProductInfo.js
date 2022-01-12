import React from 'react';
import List from "@mui/material/List";
import {Divider, ListItem} from "@material-ui/core";

export default function ProductInfo({product}) {

    return(
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
    )
}