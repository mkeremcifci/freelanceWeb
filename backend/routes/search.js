import express from 'express';

import Search from '../services/search.js';
import handleError from '../utils/handleError.js';

const router = express.Router();

router.post('/', async (req, res)=> {
    try{
        const { keyword } = req.body;
        const result = await Search.search(keyword);
        console.log(result);
        res.status(200).json({message:result});
    }
    catch(error){
        handleError(error, req, res);
    }
});

export default router;