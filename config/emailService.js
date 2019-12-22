const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
});

const { mailTemplates } = require("../config/emailTemplates");

module.exports.sendMail = async (order, mailType, to) => {
    let from = `ABC COURSES <${process.env.user}>`,
        template = mailTemplates(mailType, order),
        subject = template.subject,
        html = template.body,
        mailOptions = { from, to, subject, html };
    try {
        return await transporter.sendMail(mailOptions);
    } catch (err) {
        return err;
    }
};
