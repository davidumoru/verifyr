function registerCompany(req, res) {
    console.log(req.body)
    res.status(200).json({
        message: "Company registered"
    })
}

module.exports = {registerCompany}