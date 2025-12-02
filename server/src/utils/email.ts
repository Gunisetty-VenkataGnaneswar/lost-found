import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email error:', error);
  }
};

export const sendClaimNotification = (to: string, itemTitle: string, claimerName: string) => {
  const html = `
    <h2>Claim Attempt on Your Item</h2>
    <p>Someone has attempted to claim your found item: <strong>${itemTitle}</strong></p>
    <p>Claimer: ${claimerName}</p>
    <p>Please log in to review the claim.</p>
  `;
  return sendEmail(to, 'Claim Attempt on Your Item', html);
};

export const sendClaimSuccessNotification = (to: string, itemTitle: string) => {
  const html = `
    <h2>Claim Verified Successfully</h2>
    <p>Your claim for <strong>${itemTitle}</strong> has been verified!</p>
    <p>The item owner's contact information has been shared with you. Please coordinate the pickup.</p>
  `;
  return sendEmail(to, 'Claim Verified', html);
};
