import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import {Button} from 'reactstrap'

const PaymentForm = ({product,buyFunc}) => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // use stripe.createToken to get a unique token for the card
        const { error, token } = await stripe.createToken(cardElement);

        if (!error) {
            // Backend is not implemented yet, but once there isn’t any errors,
            // you can pass the token and payment data to the backend to complete
            // the charge
            axios
                .post("http://localhost:8080/stripe/charge", {
                    token: token.id,
                    currency: "USD",
                    price: (product.currency === 'usd$'? product.value*100 : (product.value/200)*100) // or 10 pounds (10*100). Stripe charges with the smallest price unit allowed
                })
                .then((resp) => {
                    buyFunc(product.id)
                    alert("Your payment was successful");
                })
                .catch((err) => {
                    alert("Your payment was rejected");
                    console.log(err);
                });
        } else {
            console.log(error);
        }
    };

    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="row align-items-center justify-content-center pt-2">
                <div className="col-12">
                    <CardElement className="bg-light text-white" />
                </div>
            </div>
            <div className="row align-items-center justify-content-end pt-4">
                <div className="col-2">
                    <Button color="dark">PAY</Button>
                </div>
            </div>
        </form>
    );
};

export default PaymentForm;