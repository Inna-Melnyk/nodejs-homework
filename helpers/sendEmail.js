const sgMail = require("@sendgrid/mail");
// const{ SENDGRID_API_KEY} = require(process.env)

sgMail.setApiKey(process.env.SENDGRID_KEY);


const sendEmail = async (data) => {
    const email = { ...data, from: 'inamelnyk@ukr.net' };
    await sgMail.send(email)
    return true;

}
 
// const email = {
//   to: "wicid55818@searpen.com",
//   from: "inamelnyk@ukr.net",
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<p><strong>and easy to do anywhere, even with Node.js</strong></p>",
// };

// sgMail
//   .send(email)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = sendEmail;