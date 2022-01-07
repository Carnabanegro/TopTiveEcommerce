const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
const db = require('./models');

//ROUTERS
const productRouter = require('./routes/products');
app.use("/products" , productRouter);
const userRouter = require('./routes/users');
app.use("/users" , userRouter);
const orderRouter = require('./routes/orders');
app.use("/orders" , orderRouter);
const roleRouter = require('./routes/roles');
app.use("/roles" , roleRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT,() =>{
        console.log(`Server running on port:${PORT}`)
    })
})