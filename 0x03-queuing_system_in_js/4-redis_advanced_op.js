import { createClient, print } from 'redis';

const client = createClient()
  .on('connect', () => {
    console.log('Redis connected to the server');
  })
  .on('error', (error) => {
    console.log('Redis not connected to the server: ', error.message);
  });

const holbertonSchools = {
  Portland: '50',
  Seattle: '80',
  'New York': '20',
  Bogota: '20',
  Cali: '40',
  Paris: '2',
};

for (const key in holbertonSchools) {
  const value = holbertonSchools[key];

  client.hset('HolbertonSchools', key, value, (error, result) => {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }
    print(`Reply: ${result}`);
  });
}

client.hgetall('HolbertonSchools', (error, result) => {
  if (error) {
    console.log(`Error: ${error}`);
    return;
  }
  console.log(result);
});
