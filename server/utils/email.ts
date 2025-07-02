const mailer = require("nodemailer")

interface IEmail {
    to: string
    subject: string
    text: string
    html?: string;
}

export const sendEmail = ({ to, subject, text }: IEmail) => new Promise((resolve, reject) => {
    const transport = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.FROM_PASS,
        },
    })
    console.log(process.env.FROM_EMAIL, process.env.FROM_PASS)

    transport.sendMail(
        {
            from: process.env.FROM_EMAIL,
            to,
            subject,
            html: text,
        },
        (err: Error | null, info: any) => {
            if (err) {
                console.error("Error sending email:", err)
                reject(err)
            } else {
                console.log("Email sent successfully:", info.response)
                resolve(true)
            }
        }
    )
})
