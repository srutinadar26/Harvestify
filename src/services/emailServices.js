const nodemailer = require('nodemailer');

// Create transporter (configure for your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use 'smtp.ethereal.email' for testing
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your app password
  }
});

const emailService = {
  // Send verification OTP
  sendVerificationOTP: async (email, otp, name) => {
    try {
      const mailOptions = {
        from: `"Harvestify" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Harvestify Account',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #2E7D32;">🌾 Harvestify</h1>
            </div>
            <h2>Hello ${name}!</h2>
            <p>Thank you for registering with Harvestify. Please verify your email address using the OTP below:</p>
            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 5px;">
              ${otp}
            </div>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't create an account with Harvestify, please ignore this email.</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
            <p style="color: #666; font-size: 12px; text-align: center;">
              © ${new Date().getFullYear()} Harvestify. All rights reserved.
            </p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Verification email sent:', info.messageId);
      return { success: true };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  },

  // Send welcome email after verification
  sendWelcomeEmail: async (email, name) => {
    try {
      const mailOptions = {
        from: `"Harvestify" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Harvestify!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #2E7D32;">🌾 Harvestify</h1>
            </div>
            <h2>Welcome ${name}!</h2>
            <p>Your email has been successfully verified. You can now:</p>
            <ul style="line-height: 1.6;">
              <li>Get personalized crop recommendations</li>
              <li>Detect plant diseases using AI</li>
              <li>Check real-time market prices</li>
              <li>Access weather forecasts</li>
              <li>Save your prediction history</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/dashboard" style="background-color: #2E7D32; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Go to Dashboard
              </a>
            </div>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
            <p style="color: #666; font-size: 12px; text-align: center;">
              © ${new Date().getFullYear()} Harvestify. All rights reserved.
            </p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Welcome email sent:', info.messageId);
      return { success: true };
    } catch (error) {
      console.error('Welcome email error:', error);
      return { success: false };
    }
  },

  // Send password reset OTP
  sendPasswordResetOTP: async (email, otp, name) => {
    try {
      const mailOptions = {
        from: `"Harvestify" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Your Harvestify Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #2E7D32;">🌾 Harvestify</h1>
            </div>
            <h2>Hello ${name}!</h2>
            <p>We received a request to reset your password. Use the OTP below:</p>
            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 5px;">
              ${otp}
            </div>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Password reset email error:', error);
      return { success: false };
    }
  }
};

module.exports = emailService;