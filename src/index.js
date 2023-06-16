const express = require("express")
const app = express()
const PORT = 5003 

const usersRouter = require("./routes/users.routes")
const paymentRouter = require("./routes/payment.routes")
const company = require("./routes/company.routes")


app.use(express.json());
app.use("/users", userRouter);
app.use("/payments", paymentRouter);
app.use("/getUsers", usersRouter);
app.use("/registerCompany", company);

app.get("/", (req, res) => {
    res.status(200).json({message: "I am running"});
});

app.listen(PORT, () => {
    console.log(`Server is running with speed at port ${PORT}`);
})