const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./src/routes/user-route');
const captainRoutes = require('./src/routes/captain-route')
const mapsRoutes = require('./src/routes/maps-route')
const rideRoutes = require('./src/routes/ride-route')


connectToDb();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.use('/api/users', userRoutes);
app.use('/api/captain', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);



module.exports = app;