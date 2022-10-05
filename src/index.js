const express = require('express');
const bodyParser = require('body-parser');
const { talkerData, writeTalkerData } = require('./fsUtils');
const randomToken = require('./autentications/tolken');
const {
  validateEmail,
  validateEmailFormat,
  validatePassword,
  validatePasswordFormat,
} = require('./autentications/loginValidations');
const { validateToken } = require('./autentications/tokenValidation');
const {
  validateName,
  validateNameFormat,
  validateAge,
  validateAgeFormat,
  validateTalk,
  validateWatchedAt,
  validateWatchedAtFormat,
  validateRate,
  validateRateFormat,
} = require('./autentications/talkerValidation');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_request, response) => {
  try {
    const talker = await talkerData();
    return response.status(HTTP_OK_STATUS).json(talker);    
  } catch (error) {
    response.status(400).json(error);
    console.log(error);
  }
});

app.get('/talker/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const talker = await talkerData();
    const talkerWithID = talker.find((t) => Number(t.id) === Number(id));

    if (!talkerWithID) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });      
    } 
      response.status(HTTP_OK_STATUS).json(talkerWithID);
  } catch (error) {
    response.status(400).json(error);
    console.log(error);
  }
});

app.post(
'/login',
validateEmail,
validateEmailFormat,
validatePassword,
validatePasswordFormat,
(_request, response) => {
  try {
    const token = randomToken();
    response.status(200).json({ token });
  } catch (error) {
    response.status(400).json(error);
    console.log(error);
  }
},
);

app.post('/talker',
validateToken,
validateName, validateNameFormat,
validateAge, validateAgeFormat,
validateTalk,
validateWatchedAt, validateWatchedAtFormat,
validateRate, validateRateFormat,
async (request, response) => {
  try {
    // console.log('validateRateFormat');
    const newTalker = request.body;
    const writeNewTalker = await writeTalkerData(newTalker);
    return response.status(201).json(writeNewTalker);    
  } catch (error) {
    return response.status(400).json(error);
  }
});