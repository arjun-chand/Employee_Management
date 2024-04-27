const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    education: {
        type: String,
    },
    hobbies: {
        type: [String],
    }
});

// Create the Employee model using the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
