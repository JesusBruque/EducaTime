import config from "../config";
import nodemailer from 'nodemailer';

const transport = {
    host: config.email_host,
    auth: {
        user:config.email_user,
        pass: config.email_pass
    }
};

export const sendEmail = async (emailTo,subject,htmlMessage) => {

    const transporter = nodemailer.createTransport(transport);

    transporter.verify((err,success) => {
        if(err) console.error(err);
        if(success) console.log('conexion al email correcto.');
    });

    const email = {
        from: `Casor.Academia de formación deportiva <formacion@casor.com>`,
        to: emailTo,
        subject: subject,
        html: htmlMessage,
    };
    return new Promise((resolve,reject) => {
        transporter.sendMail(email,(err,data) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            resolve(data);
            console.log(data);
        });
    });
};

