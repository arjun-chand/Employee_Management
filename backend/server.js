const connectToMongo = require('./db/config');
connectToMongo();
const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use('/EMS/user', require('./routes/userRoutes'));
app.use('/EMS/employee', require('./routes/employeeRoutes'));


const port = 5000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});