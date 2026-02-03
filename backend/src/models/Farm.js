import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    state: {
      type: String, 
      required: true,
      trim: true
    },
    district: {
      type: String, 
      required: true,
      trim: true
    },
    village: {
      type: String, 
      required: true,
      trim: true
    },
  },
  landsize: {
    type: Number,
    required: true,
    min: [0.1, 'Land size must be greater than 0.']
  },
  soiltype: {
    type: String,
    enum: ["Alluvial", "Black", "Red", "Laterite", "Sandy", "Loamy"],
    required: true
  },
  irrigationtype: {
    type: String,
    enum: ["Canal", "Tube well", "River", "Rainfed", "Sprinkler", "Drip"],
    required: true
  },
  cropsgrown: [{
    type: String,
    required: true,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
},{
  timestamps: true
})

const Farm = mongoose.model('Farm', farmSchema);
export default Farm 