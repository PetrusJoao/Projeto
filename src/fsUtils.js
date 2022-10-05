const fs = require('fs/promises');
const path = require('path');

async function talkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../src/talker.json'));
    const talker = JSON.parse(data);
    // console.log(talker);
    return talker;
  } catch (error) {
    console.error('Algo deu errado! 😖');
    console.log(error);
  }
}

async function writeTalkerData(newTalker) {
  try {
    const previousTalkers = await talkerData();
    const newTalkerWithId = { id: previousTalkers.length + 1, ...newTalker };
    const allTalkers = JSON.stringify([...previousTalkers, newTalkerWithId]);
    await fs.writeFile(path.resolve(__dirname, '../src/talker.json'), allTalkers);
    return newTalkerWithId;
  } catch (error) {
    console.log('Erro na escrita do arquivo');
  }
}

module.exports = { talkerData, writeTalkerData };