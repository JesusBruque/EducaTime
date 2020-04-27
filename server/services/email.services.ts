import config from "../config";
import nodemailer from 'nodemailer';

const transport = {
    host: config.email_host,
    auth: {
        user:config.email_user,
        pass: config.email_pass
    }
};
const transporter = nodemailer.createTransport(transport);

transporter.verify((err,success) => {
    if(err) console.error(err);
    if(success) console.log('conexion al email correcto.');
});


export const sendEmail = (emailTo,subject,htmlMessage) => {
    const email = {
        from: `Casor.Academia de formación deportiva <formacion@casor.com>`,
        to: emailTo,
        subject: subject,
        html: htmlMessage,
    };
    transporter.sendEmail(email,(err,data) => {
        if(err) console.error(err);
        if(data) console.log(data);
    });
};
