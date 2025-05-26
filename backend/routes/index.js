import express from 'express';

import searchRouter from './search.js';
import authRouter from './auth.js'
import profileRouter from './profile.js';
import isAuthenticated from '../middleware/isAutheticated.js';

const router = express.Router();

router.use('/search',searchRouter);
router.use('/auth', authRouter);

router.use(isAuthenticated);

router.use('/profile',profileRouter);


export default router;
