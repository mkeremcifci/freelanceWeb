import express, { Router } from 'express';
import User from '../models/User.js';



const router = express.Router();

router.get("/", async (req, res) => {
    req.session.userId
    try{
        const user = await User.findById(req.session.userId).select("username email searchHistory");
        res.status(200).json({ data: user });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Sunucu hatası" });
    }
})

router.put("/update", async (req, res) => {
    try{
        const userId = req.session.userId
        const { cleanedValues } = req.body; 
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: cleanedValues },
            { new: true, runValidators: true }
        );
        res.status(200).json({ message: "Başarılı bir şekilde güncellendi" });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Sunucu hatası" })
    }
})

export default router