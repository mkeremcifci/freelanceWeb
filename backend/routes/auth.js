import express from 'express';


import handleError from '../utils/handleError.js';
import Auth from '../services/auth.js';



const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;
        const result = await Auth.login(username, password);

        req.session.userId = result.id;

        res.status(200).json(result.message);
    }
    catch(error){
        handleError(error, res, res);
    } 
});

router.post('/register', async (req, res) => {
    try{
        const { username, password } = req.body;
        const result = await Auth.register(username, password);
        console.log(result);
        res.status(200).json(result);
    }
    catch(error){
        handleError(error, req, res);
    }
})

export default router