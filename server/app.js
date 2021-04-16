const express = require('express')
const app = express()
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT} `);
})