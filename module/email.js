import email from 'nodemailer';


class Emeil{
  static async email(userEmail,subject,texte){
    try {
        const tronsporter = email.createTransport({
            service:"gmail",
            auth:{
                user: "mohamedgougachemg@gmail.com",
                pass:"ojot yyqf txvf mzzc"
            }
             
        });
        
        const mailOptions = {
            from : "mohamedgougachemg@gmail.com",
            to: userEmail,
            subject: subject,
            text:texte,
        }
        const info = await tronsporter.sendMail(mailOptions);
        console.log(info.response);

        
    } catch (error) {
        console.log(error);
        throw new Error("Internal serveur Error ")
    }
}}

    

export default Emeil;