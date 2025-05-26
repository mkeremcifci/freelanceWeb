import bcrypt from 'bcrypt';

import { BadRequestError } from "../models/Error.js";
import User from "../models/User.js";

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


    static async register(username, password){
        try{
            const existingUser = await User.findOne({ username });
            if(existingUser){
                throw new BadRequestError("Zaten bu kullanıcı var")
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                password: hashedPassword,
            });

            await newUser.save();

            return { message: "Kayıt başarılı" };
        }
        catch(error){
            throw new Error(`Kayıt başarısız: ${error.message}`);
        }
    }
}