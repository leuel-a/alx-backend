import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, (err, reply) => {
    if (err) throw err;
    print(`Reply: ${reply}`);
  });
};

const displaySchoolValue = async (schoolName) => {
  const asyncGet = promisify(client.get).bind(client);
  const data = await asyncGet(schoolName);

  console.log(data);
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
