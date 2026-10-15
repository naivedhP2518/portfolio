import nodemailer from 'nodemailer';

export const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user,
      pass,
    },
  });
};

export const sendContactEmails = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> => {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn('⚠️ EMAIL_PASS / EMAIL_USER not set in .env. Email delivery skipped (logged to console):');
    console.log(`From: ${name} <${email}>`);
    console.log(`Message: ${message}`);
    return false;
  }

  const receiverEmail = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;

  // 1. Email to Naivedh (Admin notification)
  const adminMailOptions = {
    from: `"${name} (Portfolio Inquiry)" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: receiverEmail,
    subject: `🚀 New Portfolio Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #6366f1; margin-top: 0;">New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
        <p><strong>Message:</strong></p>
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
        <p style="font-size: 12px; color: #888;">Sent from your Portfolio contact form.</p>
      </div>
    `,
  };

  // 2. Automated Thank-You / Receipt to Sender
  const userReceiptOptions = {
    from: `"Naivedh Patel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for reaching out, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #6366f1; margin-top: 0;">Thanks for connecting!</h2>
        <p>Hi ${name},</p>
        <p>I have received your message and will review it and get back to you as soon as possible.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
        <p style="color: #555; font-size: 14px;"><strong>A copy of your message:</strong></p>
        <blockquote style="margin: 0; padding-left: 15px; border-left: 3px solid #6366f1; color: #555; font-style: italic;">
          ${message}
        </blockquote>
        <br />
        <p>Best regards,<br/><strong>Naivedh Patel</strong><br/>Full-Stack Developer | UI/UX Designer</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userReceiptOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
