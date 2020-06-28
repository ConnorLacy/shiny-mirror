/*
    Entry point for startin development server. Using express to create a 
    server. 
*/

import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.use('*', (req, res, next) => {
  res.status(200).send('Testing')
})

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
)
