require('dotenv').config() // loads variables 
const app = require('./app') // loads the full express app 
const db = require('./models/db')
const PORT = process.env.PORT || 3000

// Runs once the database connects successfully.
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// Shows an error if the MongoDB connection fails.
db.on('error', (error) => {
  console.error(error.message)
})

// Starts your app and prints a message in the terminal to confirm it's working.
app.listen(PORT, () => {
  console.log(`Blog server running on port ${PORT}`)
})