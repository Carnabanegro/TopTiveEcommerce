const express = require('express');
const router = express.Router;

const stripe = require('stripe')('sk_test_CGGvfNiIPwLXiDwaOfZ3oX6Y')

router.post('/create-checkout-session', async (req, res) => {
    const value = (req.params.currency === "usd$"? req.params.value : req.params.value/200)
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: value
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4242/success.html',
        cancel_url: 'http://localhost:4242/cancel.html',
    });
    res.redirect(303, session.url);
});
