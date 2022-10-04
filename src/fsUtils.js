const fs = require('fs/promises');
const path = require('path');

async function talkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, './talker.json'));
    const talker = JSON.parse(data);
    // console.log(talker);
    return talker;
  } catch (error) {
    console.error('Algo deu errado! 😖');
    console.error(error);
  }
}

module.exports = talkerData;