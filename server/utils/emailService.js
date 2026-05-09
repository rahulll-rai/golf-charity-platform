const sendEmail = (to, subject, htmlBody) => {
  // Mock Email Service that logs to the console
  console.log("==================================================");
  console.log(`✉️ MOCK EMAIL SENT`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${htmlBody}`);
  console.log("==================================================");
};

module.exports = { sendEmail };
