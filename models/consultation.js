const mongoose = require('mongoose');

const consulationSchema = new mongoose.Schema({
    member: { type: mongoose.Schema.Types.ObjectId, unique: true, required: true },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null  // Default value set to null
      },
    disease: { type: String, required: true }, 
    description: { type: String, required: true },
    time: {
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true }
    },
    status: { type: String, enum: ['pending', 'taken', 'completed', 'cancel'], default: 'pending' },
    prescription: { type: String, required: false,default: null },
});

module.exports = mongoose.model('Consulation', consulationSchema);
