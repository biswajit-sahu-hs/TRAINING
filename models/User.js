const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullname: { type: String, required: true },
    dob: { type: String, required: true },
    address: {
        street: { type: String, required: false,default: '' },
        city: { type: String, required: false,default: '' },
        state: { type: String, required: false,default: '' },
        country: { type: String, required: false,default: '' },
        zipCode: { type: String, required: false,default: '' },
        
    },
    phone: {type: Number, required: true},
    role: { 
        type: String,
        enum: ['doctor', 'member', 'admin'],
        default: 'member',
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
