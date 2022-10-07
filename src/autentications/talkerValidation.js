const validateName = (req, res, next) => {
  const { name } = req.body;
if (!name) {
  return res.status(400).json({
  message: 'O campo "name" é obrigatório',
});
}
  next();
};

const validateNameFormat = (req, res, next) => {
  const { name } = req.body;
  const nameMinLength = 3;
if (name.length <= nameMinLength) {
  res.status(400).json({
  message: 'O "name" deve ter pelo menos 3 caracteres',
});
} else {
  next();
}
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
if (!age) {
  res.status(400).json({
  message: 'O campo "age" é obrigatório',
});
} else {
  next();
}
};

const validateAgeFormat = (req, res, next) => {
  const { age } = req.body;
  const ageMin = 18;
if (age <= ageMin) {
  res.status(400).json({
  message: 'A pessoa palestrante deve ser maior de idade',
});
} else {
  next();
}
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
if (!talk) {
  res.status(400).json({
  message: 'O campo "talk" é obrigatório',
});
} else {
  next();
}
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;  
if (!watchedAt) {
  res.status(400).json({
  message: 'O campo "watchedAt" é obrigatório',
});
} else {
  next();
}
};

const validateWatchedAtFormat = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;  
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
if (!regexDate.test(watchedAt)) {
  res.status(400).json({
  message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
});
} else {
  next();
}
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;  
if (rate === undefined) {
  res.status(400).json({
  message: 'O campo "rate" é obrigatório',
});
} else {
  next();
}
};

const validateRateFormat = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;  
  const rateMin = 1;
  const rateMax = 5;
if (rate < rateMin || rate > rateMax) {
  res.status(400).json({
  message: 'O campo "rate" deve ser um inteiro de 1 à 5',
});
} else {
  next();
}
};

module.exports = {
  validateName,
  validateNameFormat,
  validateAge,
  validateAgeFormat,
  validateTalk,
  validateWatchedAt,
  validateWatchedAtFormat,
  validateRate,
  validateRateFormat,
  // validateToken,
  // validateTokenFormat,
};