const nodemailer=require('nodemailer')
require('dotenv').config()

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

async function sendreminderemail(toEmail,taskTitle){
    await transporter.sendMail({
        from: `"Task Management Platform" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: `Task Reminder : ${taskTitle}`,
        text: `Hello, ${taskTitle} is due today!`
    })
}
module.exports=sendreminderemail;