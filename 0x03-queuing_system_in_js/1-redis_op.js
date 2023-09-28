import { createClient, print } from 'redis';

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

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      console.log(data);
    }
  });
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
