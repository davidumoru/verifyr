const express = require("express")
const paymentsControl = require("../controllers/payments.controllers")

const router = express.Router ()

router.post("/pay", paymentsControl.userController)

router.get("/receipt", (req, res) => {
    console.log(req.body)
    res.status(200).json({
        message: "This is your receipt"
    })
})
 
module.exports = router