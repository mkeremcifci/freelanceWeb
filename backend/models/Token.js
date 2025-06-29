import mongoose, { Model } from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
},{autoCreate: true, autoIndex: true, timestamps: true, versionKey: false, collection:"tokens"});

const Token = mongoose.model("Token", TokenSchema);

export default Token;