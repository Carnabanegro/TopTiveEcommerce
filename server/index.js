const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
require('dotenv').config()
const db = require('./models');
const {addDefaultData} = require("./utils/addDefaultData");

//stripe
const stripe = require("stripe")(process.env.STRIPE_KEY);
//

//ROUTERS
const productRouter = require('./routes/products');
app.use("/products" , productRouter);
const userRouter = require('./routes/users');
app.use("/users" , userRouter);
const orderRouter = require('./routes/orders');
app.use("/orders" , orderRouter);
const roleRouter = require('./routes/roles');
app.use("/roles" , roleRouter);

app.post('/stripe/charge', async (req, res) => {
    const { token, currency, price } = req.body;
    const charge = await stripe.charges.create({
        amount: price,
        currency,
        source: token,
    });
    if (!charge) {
        throw new Error("charge unsuccessful")
    }else{
        res.status(200).send( {message: "charge successfull"});
    }
});


db.sequelize.sync().then(() => {
    addDefaultData();
    app.listen(PORT,() =>{
        console.log(`Server running on port:${PORT}`)
    })
})
