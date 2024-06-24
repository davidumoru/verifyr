const generateReference = () => {
  const prefix = "SVR-TF";
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return prefix + randomNumber;
};

module.exports = { generateReference };
