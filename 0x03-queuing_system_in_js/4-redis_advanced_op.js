import { createClient, print } from 'redis';

const client = createClient()
  .on('error', (err) =>
    console.log(`Redis client not connected to the server: ${err}`)
  )
  .on('connect', () => console.log('Redis client connected to the server'));

const schools = {
  Portland: '50',
  Seattle: '80',
  'New York': '20',
  Bogota: '20',
  Cali: '40',
  Paris: '2',
};

for (const school in schools) {
  const value = schools[school];
  client.HSET('HolbertonSchools', school, value, print);
}

client.HGETALL('HolbertonSchools', (err, value) => {
  console.log(value);
});
