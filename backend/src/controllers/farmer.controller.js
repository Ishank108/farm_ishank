import Farm from "../models/Farm.js";


export const createFarm = async (req, res) => {
  try {
    if( req.user.role !== 'farmer'){
      return  res.status(403).json({ message: 'Forbidden: Only farmers can create farms' });
    }

    const { location, landsize, soiltype, irrigationtype, cropsgrown } = req.body;
    if (!location.state || !location.district || !location.village || !landsize || !soiltype || !irrigationtype || !cropsgrown) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newFarm = new Farm({
      userId: req.user._id,
      location: {
        state: location.state,
        district: location.district,
        village: location.village
      },
      landsize,
      soiltype,
      irrigationtype,
      cropsgrown
    })
    await newFarm.save();

    res.status(201).json({ message: 'Farm created successfully', farm: newFarm });
    
  } catch (error) {
    console.error('Error creating farm:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export const getFarmById = async (req, res) => {
  try {
    const farmId = req.params.id;
    
    const farm = await Farm.findOne({ _id: farmId, isActive: true });
    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    res.status(200).json({ farm });
  } catch (error) {
    console.error('Error fetching farm by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export const getAllFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user._id, isActive: true });
    res.status(200).json({ farms });
  } catch (error) {
    console.error('Error fetching all farms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export const updateFarm = async (req, res) => {
  try {
    const farmId = req.params.id;
    const updates = req.body;

    const farm = await Farm.findOne({ _id: farmId, userId: req.user._id, isActive: true });
    if (!farm) {
      return res.status(404).json({ message: 'Farm not found or you do not have permission to update it' });
    }

    Object.keys(updates).forEach((key) => {
      farm[key] = updates[key];
    });

    await farm.save();
    res.status(200).json({ message: 'Farm updated successfully', farm });
    
  } catch (error) {
    console.error('Error updating farm:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export const deleteFarm = async  (req, res) => {
  try {
    const farmId = req.params.id;
    const farm = await Farm.findOne({ _id: farmId, userId: req.user._id, isActive: true });
    if (!farm) {
      return res.status(404).json({ message: 'Farm not found or you do not have permission to delete it' });
    }
    farm.isActive = false;
    await farm.save();
    res.status(200).json({ message: 'Farm deleted successfully' });
  } catch (error) {
    console.error('Error deleting farm:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}