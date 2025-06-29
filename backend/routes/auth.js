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
        const { username, email, password } = req.body;
        const result = await Auth.register(username, email, password);
        console.log(result);
        res.status(200).json(result);
    }
    catch(error){
        handleError(error, req, res);
    }
})

router.post('/reset-password',async (req, res) => {
    try{
        const email = req.body.email;
        console.log("Burada")
        const response = await Auth.resetPassword(email);
        res.status(200).send({ message: "Parola sıfırlama maili yollandı" });
    }
    catch(error){
        handleError(error, req, res)
    }
})

router.post("/verify-reset-password", async (req, res) => {
    try{
        const { id, token,  newPassword } = req.body;
        const response = await Auth.verifyResetPassword(id, token, newPassword);
        res.status(200).send({ message: "Parolan başarılı bir şekilde değiştirildi" });
    }
    catch(error){
        console.error(error);
    }
    
})

export default router