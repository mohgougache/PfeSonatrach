// 
import nodemailer from 'nodemailer';
import fs from 'fs';

class Email {
    static async email(userEmail, subject,path) {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "mohamedgougachemg@gmail.com",
                    pass: "ojot yyqf txvf mzzc"
                }
            });

            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    console.error('Erreur lors de la lecture du fichier HTML :', err);
                    return;
                }

                const mailOptions = {
                    from: "mohamedgougachemg@gmail.com",
                    to: userEmail,
                    subject: subject,
                    // text:text, 
                    html:data
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
                    } else {
                        console.log('E-mail envoyé :', info.response);
                    }
                });
            });
        } catch (error) {
            console.log(error);
            throw new Error("Internal serveur Error ");
        }
    }
}

export default Email;
