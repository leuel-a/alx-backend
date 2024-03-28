import { createClient, print } from 'redis';

const client = createClient()
  .on('connect', () => {
    console.log('Redis connected to the server');
  })
  .on('error', (error) => {
    console.log('Redis not connected to the server: ', error.message);
  });

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (error, result) => {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }
    print(result);
    return;
  });
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (error, result) => {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }
    console.log(result);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
