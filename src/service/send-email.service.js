import nodemailer from "nodemailer"


export const sendEmail =async ({to='', subject='' , message='',attachments=[] }) => {
    const transporter = nodemailer.createTransport({
        host:"https://gym-system-backend.vercel.app",
        service : 'gmail',
        auth : {
            user : "elsayedshalan64@gmail.com",
            pass : "faimpsmowoevurgg"
        },
        port:587,
        secure:false,
        tls : {
            rejectUnauthorized : false
        },

    })

    const mailOptions = {
        from: "gym system",
        to,
        subject,
        html: message,  
        attachments 
     }
     

    const emailInfo = await transporter.sendMail(mailOptions);
return emailInfo ;
}
