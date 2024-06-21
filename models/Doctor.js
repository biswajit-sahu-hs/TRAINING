const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    doctorId: { type: String, unique: true, required: true },
    degree: { type: String, required: true },
    college: { type: String, required: true },
    regno: { type: String, required: true },
    description: { type: String, required: true },
    specialization: { type: String, required: true },
    
});

module.exports = mongoose.model('Doctor', doctorSchema);
