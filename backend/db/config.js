const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://chandarjun10:employee@employee.n3s3dpa.mongodb.net/";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;
