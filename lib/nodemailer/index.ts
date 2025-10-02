// imports required components(modules)
import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

// creates and exports transporter object, this object is used to send emails
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})


// creates async function to send welcome email
export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    // creates html template for welcome email and replaces placeholders with actual values
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    // creates object with mail options
    const mailOptions = {
        from: `"Signalist" <signalist@warrenbuffett.pro>`,
        to: email,
        subject: `Welcome to Signalist - your stock market toolkit is ready!`,
        text: 'Thanks for joining Signalist',
        html: htmlTemplate,
    }


    // sends email using transporter object
    await transporter.sendMail(mailOptions);
}


// creates and exports async function to send news summary email
export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    // creates html template for news summary email and replaces placeholders with actual values
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    // creates object with mail options
    const mailOptions = {
        from: `"Signalist News" <signalist@warrenbuffett.pro>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from Signalist`,
        html: htmlTemplate,
    };

    // sends email using transporter object
    await transporter.sendMail(mailOptions);
};
