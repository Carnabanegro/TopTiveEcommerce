import React from 'react';
import {map} from "lodash";
import CardProduct from '../common/cards/CardProduct'
export  default function ProductsList({products,func, sell}) {
    return (
        <div className="container">
            <div className="row align-items-start">
                {map(products, (product) =>{
                    return(
                        <CardProduct product={product} buyButton={sell} buyFunc={func}/>
                    )
                })}
            </div>
        </div>
    );
};
