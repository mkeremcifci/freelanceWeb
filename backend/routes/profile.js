import express, { Router } from 'express';
import User from '../models/User.js';



const router = express.Router();

router.get("/", async (req, res) => {
    req.session.userId
    try{
        const user = await User.findById(req.session.userId).select("username email searchHistory");
        console.log(user);
        res.status(200).json({ data: user });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Sunucu hatası" });
    }
})

export default router