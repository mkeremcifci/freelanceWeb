import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Geçerli bir e-posta adresi girin.']
    },
    password:{
        type: String,
        required: true,
    },
    searchHistory: {
        type: [String],
        default: [],
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;