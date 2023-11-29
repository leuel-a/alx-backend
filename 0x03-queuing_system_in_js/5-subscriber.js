import { createClient, print } from 'redis';

const client = createClient()
  .on('error', (err) =>
    console.log(`Redis client not connected to the server: ${err}`)
  )
  .on('connect', () => console.log('Redis client connected to the server'));

client.subscribe('holberton school channel', 'message');

client.on('message', (channel, message) => {
  if (message == 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
  console.log(message);
});
