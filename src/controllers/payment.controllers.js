function userController(req, res) {
    console.log(req.body)
    res.status(200).json({
        message: "Login Successful"
    })
}

function registerController(req, res) {
    console.log(req.body)
    res.status(200).json({
        message: "Login Successful"
    })
}

module.exports = {
    loginController,
    registerController
}