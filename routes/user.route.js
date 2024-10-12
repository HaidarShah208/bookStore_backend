import express from 'express';
import { Login, seeProfile, Signup, updateAddresses, uploadAvatar } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
import upload from '../utils/cloudneryUpload.js';
const router = express.Router();


router.post('/signup', Signup)
router.post('/login', Login)
router.get('/see',isAuthenticated ,seeProfile)
router.put('/update',isAuthenticated ,updateAddresses)
router.post('/uploadAvatar', isAuthenticated, upload.single('avatar'), uploadAvatar);


export default router