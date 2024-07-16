const mongoose = require('mongoose');

const magicMoverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
});

magicMoverSchema.methods.canCarry = function(itemWeight) {
    return this.currentWeight + itemWeight <= this.weightLimit;
};

module.exports = mongoose.model('MagicItem', magicMoverSchema);