import mongoose from 'mongoose';

const soilDataSchema = new mongoose.Schema({
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true
  },
  ph: {
    type: Number,
    required: true,
    min: 0,
    max: 14
  },
  nitrogen: {
    type: Number,
    required: true,
    min: 0
  },
  phosphorus: {
    type: Number,
    required: true,
    min: 0
  },
  potassium: {
    type: Number,
    required: true,
    min: 0
  },
  moisture: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  temperature: {
    type: Number,
  },
  source: {
    type: String,
    enum: ['sensor', 'manual', 'lab report'],
    required: true
  },
  collectedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default SoilData = mongoose.model('SoilData', soilDataSchema);