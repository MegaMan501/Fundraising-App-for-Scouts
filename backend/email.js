const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

/* Credit for Nodemailer handlebars setup:
 * https://www.codementor.io/@olatundegaruba/password-reset-using-jwt-ag2pmlck0 
 */
const handlebarsOptions = {
	viewEngine: {
		extName: '.html',
		partialsDir: './templates/',
		layoutsDir: './templates',
		defaultLayout: ''
	},
	viewPath: path.resolve('./templates/'),
	extName: '.html'
};


/* Credit for OAuth and Nodemailer setup steps: 
 * https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
 */

/* Setting up OAuth client for Google OAuth Playground that is associated with
    our development gmail account used for testing. This may be deleted if
    using a standard STMP server, or a service like Twilio Sendgrid */
const oauth2Client = new OAuth2(
    process.env.OAUTH2_CLIENT_ID, // ClientID
    process.env.OAUTH2_CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH2_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken();

/* Setup for nodemailer using createTransport */
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: process.env.EMAIL_USER, 
         clientId: process.env.OAUTH2_CLIENT_ID,
         clientSecret: process.env.OAUTH2_CLIENT_SECRET,
         refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
         accessToken: accessToken
    }});

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = smtpTransport;
