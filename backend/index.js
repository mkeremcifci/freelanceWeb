import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';

import router from './routes/index.js';
import sessionConfig from './configs/sessionConfig.js';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(session(sessionConfig));

mongoose.connect("mongodb://localhost:27017/freelanceWeb")

app.use('/',router);

app.listen(PORT, () => {
    console.log(`Backend localhost:${PORT} adresinde çalışıyor`);
})