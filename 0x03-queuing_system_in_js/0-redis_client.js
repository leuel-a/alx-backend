import { createClient } from 'redis'

const client = createClient()
  .on('connect', () => {
    console.log('Redis connected to the server')
  })
  .on('error', error => {
    console.log('Redis not connected to the server: ', error.message)
  })
