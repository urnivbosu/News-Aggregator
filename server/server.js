const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./route/user')
require('dotenv').config();

const database = require('./config/database');
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)

app.use('/api/v1/user', userRoutes);
database.connect();

app.listen(PORT, () => {
    console.log(`App is listening on ${ PORT }`)
})