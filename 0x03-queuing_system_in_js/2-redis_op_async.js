import { promisify } from 'util';
import { createClient, print } from 'redis';

const client = createClient()
  .on('error', (err) =>
    console.log(`Redis client not connected to the server: ${err}`)
  )
  .on('connect', () => console.log('Redis client connected to the server'));

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

const displaySchoolValue = async (schoolName) => {
  const asyncGet = promisify(client.get).bind(client);

  const value = await asyncGet(schoolName);
  console.log(value);
};

// TODO: Update the syntax of the IIF to async/await and prettier support
(async () => {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
})();
