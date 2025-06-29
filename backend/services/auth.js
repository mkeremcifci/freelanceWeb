import bcrypt from 'bcrypt';
import crypto from 'crypto'

import { BadRequestError } from "../models/Error.js";
import User from "../models/User.js";
import Token from "../models/Token.js";
import hashPassword from '../utils/hashPassword.js';
import sendEmail from '../utils/sendMail.js';

export default class Auth{
    static async login(username, password) {
        const user = await User.findOne({ username });
        if(!user){
            throw new BadRequestError("Kullanıcı bulunamadı");
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new BadRequestError("Şifre hatalı");
        }
        return {message: 'Başarılı', id:user._id };
    }


    static async register(username, email, password){
        try{
            const existingUser = await User.findOne({ username });
            if(existingUser){
                throw new BadRequestError("Zaten bu kullanıcı var");
            }
            const hashedPassword = await hashPassword(password);
            const existingUser2 = await User.findOne({ email })
            if(existingUser2){
                throw new BadRequestError("Bu email zaten mevcut");
            }
            const newUser = new User({
                username,
                password: hashedPassword,
                email: email,
            });

            await newUser.save();

            return { message: "Kayıt başarılı" };
        }
        catch(error){
            throw new Error(`Kayıt başarısız: ${error.message}`);
        }
    }

    static async resetPassword(email){
        const user = await User.findOne({ email });
        if(!user){
            throw new BadRequestError("User not found");
        }

        let now = new Date();
        const twoMinutesAgo = now.setMinutes(now.getMinutes() - 2);

        const tokenCreatedInLastTwoMinutes = await Token.findOne({
            userId: user._id,
            createdAt: { $gt: new Date(twoMinutesAgo) },
        })

        if(tokenCreatedInLastTwoMinutes){
            throw new BadRequestError("İki dakika içinde sadece 1 istekte bulunabilirsin");
        }

        const token = await Token.findOne({ userId: user._id });

        if(token){
            await token.deleteOne();
        }

        let resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await hashPassword(resetToken);

        await new Token({
            userId: user._id,
            token: hashedToken,
            createdAt: Date.now()
        }).save();
        
        const url = "localhost:5173"

        const mailObject = {
            email: user.email,
            subject: "Password reset request",
            payload: { name: user.username, link:`${url}/reset-password-verify?token=${resetToken}&id=${user._id}` },
        }

        await sendEmail(
            mailObject.email,
            mailObject.subject,
            mailObject.payload,
            mailObject.payload.link
        );
    }

    static async verifyResetPassword(id, token, newPassword) {
        const user = await User.findById(id);
        user.password = await hashPassword(newPassword);
        await user.save();
    }
}