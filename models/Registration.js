const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    department: String,
    position: String,
    consent: { type: Boolean, required: true }
});

module.exports = mongoose.model('Registration', RegistrationSchema);