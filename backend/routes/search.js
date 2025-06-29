import express from 'express';

import Search from '../services/search.js';
import handleError from '../utils/handleError.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res)=> {
    try{
        const { keyword } = req.body;
        const result = await Search.search(keyword);
        if(req.session.userId){
            console.log(req.session.userId);
            const user = await User.findById(req.session.userId)
            user.searchHistory.push(keyword);
            await user.save();
        }
        res.status(200).json({data:result});
    }
    catch(error){
        handleError(error, req, res);
    }
});

export default router;