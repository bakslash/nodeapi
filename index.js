const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./api/routes/users');

const app = express()

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000
app.listen( PORT , ()=> console.log('listening at port 5000'))