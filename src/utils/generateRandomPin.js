const generateRandomPin = () => {
    return  Math.floor(Math.random() * 900000) + 10000;
}

module.exports = {generateRandomPin}