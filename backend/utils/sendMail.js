import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

const sendEmail = async (email, subject, payload, link) => {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "freelanceallinfo@gmail.com",
                pass:"tzzaykleigjbwytf",
            },
        });

        const compiledTemplate = handlebars.compile(
            `
            <html>
                <head>
                <style></style>
                </head>
                <body>
                <p>Hi {{name}},</p>
                <p>You requested to reset your password.</p>
                <p> Please, click the link below to reset your password</p>
                <a href="http://{{link}}">Reset Password</a>
                </body>
            </html>`
        );

        const html = compiledTemplate(payload);

        const options = {
            from: "freelanceallinfo@gmail.com",
            to: email,
            subject: subject,
            html: html,
        };

        transporter.sendMail(options, (error, info) => {
            if(error){
                return error;
            }
            else{
                return true
            }
        })
    }
    catch(error){
        console.error(error);
    }
}

export default sendEmail