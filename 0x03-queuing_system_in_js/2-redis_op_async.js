import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient()
  .on('connect', () => {
    console.log('Redis connected to the server');
  })
  .on('error', (error) => {
    console.log('Redis not connected to the server: ', error.message);
  });

const asyncGet = promisify(client.get).bind(client);

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (error, result) => {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }
    print(`Reply: ${result}`);
    return;
  });
}

async function displaySchoolValue(schoolName) {
  try {
    const result = await asyncGet(schoolName);
    console.log(result);
  } catch (e) {
    console.log('Error: ', e);
  }
}

(async () => {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
})();
