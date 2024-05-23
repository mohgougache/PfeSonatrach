// 
import nodemailer from 'nodemailer';
import fs from 'fs';

class Email {
    static async email(userEmail, subject, htmlContent) {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "mohamedgougachemg@gmail.com",
                    pass: "ojot yyqf txvf mzzc"
                }
            });
    
            const mailOptions = {
                from: "mohamedgougachemg@gmail.com",
                to: userEmail,
                subject: subject,
                html: htmlContent
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
                } else {
                    console.log('E-mail envoyé :', info.response);
                }
            });
        } catch (error) {
            console.log(error);
            throw new Error("Erreur interne du serveur");
        }
    }
}

export default Email;
