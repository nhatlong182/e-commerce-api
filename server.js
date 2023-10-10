import app from './src/app.js'

const PORT = 3055

const server = app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => console.log('server closed'))
  // notify something
})