const express = require('express')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')
const fs = require('fs');
const { marked } = require('marked'); 

const companiesRouter = require("./routes/company.routes")
const connectDB = require("./configs/database")

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// connecting to db here
connectDB(process.env.MONGO_URI)

app.use(express.json())
app.use(limiter)
app.use('/companies', companiesRouter)

app.get('/', (req, res) => {
// Read the contents of README.md and parse it as markdown
fs.readFile('README.md', 'utf8', (err, data) => {
    if (err) {
    res.status(500).send('Error reading README.md');
    } else {
    // Parse markdown to HTML using marked
    const htmlContent = marked(data);
    // Send the HTML content as the response
    res.send(htmlContent);
    }
});
});

app.listen(PORT, () => {
    console.log(`Server is running with speed at port ${PORT}`);
})