const validateEmail = (req, res, next) => {
  const { email } = req.body;
if (!email) {
  res.status(400).json({
  message: 'O campo "email" é obrigatório',
});
} else {
  next();
}
};

const validateEmailFormat = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /\S+@\S+\.\S+/;
if (!regexEmail.test(email)) {
  res.status(400).json({
  message: 'O "email" deve ter o formato "email@email.com"',
});
} else {
  next();
}
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
if (!password) {
  res.status(400).json({
  message: 'O campo "password" é obrigatório',
});
} else {
  next();
}
};

const validatePasswordFormat = (req, res, next) => {
  const { password } = req.body;
  const passwordMinLength = 6;
if (password.length <= passwordMinLength) {
  res.status(400).json({
  message: 'O "password" deve ter pelo menos 6 caracteres',
});
} else {
  next();
}
};

module.exports = {
  validateEmail,
  validateEmailFormat,
  validatePassword,
  validatePasswordFormat,
};