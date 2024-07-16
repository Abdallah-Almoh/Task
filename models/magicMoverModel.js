const mongoose = require('mongoose');

const magicMoverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    weightLimit: {
        type: Number,
        required: true,
    },
    questState: {
        type: String,
        enum: ['resting', 'loading', 'on-mission'],
        default: 'resting',
    },
    currentWeight: {
        type: Number,
        default: 0,
    },
    completedMissions: {
        type: Number,
        default: 0,
    },
});

magicMoverSchema.methods.canCarry = function(itemWeight) {
    return this.currentWeight + itemWeight <= this.weightLimit;
};

module.exports = mongoose.model('MagicMover', magicMoverSchema);