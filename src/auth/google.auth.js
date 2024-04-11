const { JWT } = require("google-auth-library");

module.exports = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
