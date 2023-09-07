// import { createServer} from 'node:http'

// const server = createServer((request, response) => {
//   response.write("Hello World")
//   return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
// import { DatabaseMemory } from './database-memory.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// GET, POST, PUT, DELETE, PATCH
// REQUEST BODY

server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  console.log(request.body)
  await database.create({
    title,
    description,
    duration,
  })

  return reply.status(201).send('Video Criado')
})

server.get('/videos', async (request) => {
  const search = request.query.search

  const videos = await database.list(search)

  return videos
})

server.put('/videos/:id', async (request, reply) => {
  const { title, description, duration } = request.body
  const videoId = request.params.id

  database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send("Video editado com sucesso!")
})

server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id

  database.delete(videoId)

  return reply.status(204).send("Video deletado com sucesso!")
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
 })