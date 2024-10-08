import express from 'express';
import { Login, seeProfile, Signup, updateAddresses } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();


router.post('/signup', Signup)
router.post('/login', Login)
router.get('/see',isAuthenticated ,seeProfile)
router.put('/update',isAuthenticated ,updateAddresses)

export default router