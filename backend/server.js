const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');


//workout router
const workoutRouter = require('./routes/workoutRoutes');
const userRouter = require('./routes/userRoutes');

//express app
const app = express();

//middleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.method, req.url);
    next();
})

//wrokout routes
app.use('/api/workouts', workoutRouter);
app.use('/api/user', userRouter);




//connect to data base && listen for request 
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db & listenign on port 4000')
        })        
    })
    .catch((error)=>{
        console.log(error)
    })