const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const path = require("path");

const userRouter = require("./routes/user.routes");
const companyRouter = require("./routes/company.routes");
const paymentRouter = require("./routes/payment.routes");
const connectDB = require("./configs/database");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// connecting to db here
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(limiter);
app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/payment", paymentRouter);

// Serve static files from the Vue app
app.use(express.static(path.join(__dirname, 'dist')));

// Add a catch-all route to handle all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running with speed at port ${PORT}`);
});
