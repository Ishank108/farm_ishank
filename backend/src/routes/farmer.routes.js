import express from 'express';
import {authenticateUser} from '../middleware/auth.middleware.js';
import {
    createFarm,
    getFarmById,
    getAllFarms,
    updateFarm,
    deleteFarm,
} from '../controllers/farmer.controller.js';


const router = express.Router();

router.use(authenticateUser)

router.post('/farm', createFarm);
router.get('/farm/:id', getFarmById);
router.get('/farms', getAllFarms);
router.put('/farm/:id', updateFarm);
router.delete('/farm/:id', deleteFarm);

export default router;