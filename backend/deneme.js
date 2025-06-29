import { text } from 'express';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "freelanceallinfo@gmail.com",
        pass:"tzzaykleigjbwytf",
    },
});

const mailOptions = {
    from: 'freelanceallinfo@gmail.com',
    to: 'rumeyysaak@gmail.com',
    subject: "Test mail",
    text: "Test yazısı",
};

transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        console.error(error);
    }
    else{
        console.log("Mail yollandı");   
    }
})