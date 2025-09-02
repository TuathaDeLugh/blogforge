import nodemailer from 'nodemailer';
import User from '@/models/user';
import { EMAIL_TEMPLATES, EMAIL_SUBJECTS } from './emailTemplates';

function generateRandomToken(length: number = 32): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

function generateOTP(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}

interface EmailData {
  email: string;
  emailType:
    | 'VERIFY'
    | 'RESET'
    | 'DELETE'
    | 'EMAIL_CHANGE'
    | 'WELCOME'
    | 'ENABLE_2FA'
    | 'TWO_FA_OTP'
    | 'ADMIN_ACTION';
  username?: string;
  otpCode?: string;
  userId?: string;
  customSubject?: string;
  customHtml?: string;
}

export const sendEmail = async ({
  email,
  emailType,
  username,
  otpCode,
  userId,
  customSubject,
  customHtml,
}: EmailData) => {
  try {
    let userdata;
    let userIdToUpdate;

    if (emailType === 'EMAIL_CHANGE') {
      userdata = { username: username || 'User', email };
      userIdToUpdate = userId;
    } else if (emailType === 'ADMIN_ACTION') {
      // For admin actions, we don't need to find user by email or update tokens
      // Just send the custom email
      userdata = { username: username || 'User', email };
      userIdToUpdate = null; // No token updates needed
    } else {
      userdata = await User.findOne({ email });
      if (!userdata) {
        throw new Error('User not found');
      }
      userIdToUpdate = userdata._id;
    }

    const hashToken = generateRandomToken();

    // Only update user tokens for non-admin actions
    if (emailType !== 'ADMIN_ACTION' && emailType !== 'WELCOME') {
      let updateData: any = {};

      switch (emailType) {
        case 'VERIFY':
          updateData = {
            verifyToken: hashToken,
            verifyTokenExpiry: Date.now() + 360000,
          };
          break;
        case 'RESET':
          updateData = {
            forgotPasswordToken: hashToken,
            forgotPasswordExpiry: Date.now() + 360000,
          };
          break;
        case 'DELETE':
          updateData = {
            deleteAccountToken: hashToken,
            deleteAccountTokenExpiry: Date.now() + 360000,
          };
          break;
        case 'EMAIL_CHANGE':
          updateData = {
            NewMailToken: hashToken,
            NewMailTokenExpiry: Date.now() + 360000,
          };
          break;
        case 'ENABLE_2FA':
          updateData = {
            twoFactorToken: hashToken,
            twoFactorTokenExpiry: Date.now() + 360000,
          };
          break;
        case 'TWO_FA_OTP':
          updateData = {
            twoFactorToken: otpCode,
            twoFactorTokenExpiry: Date.now() + 300000,
          }; // 5 minutes
          break;
      }

      if (Object.keys(updateData).length > 0 && userIdToUpdate) {
        await User.findByIdAndUpdate(userIdToUpdate, updateData);
      }
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
      },
    });

    //  const transporter = nodemailer.createTransport({
    //       host: "sandbox.smtp.mailtrap.io",
    //       port: 2525,
    //       auth: {
    //         user: "8d8f9fefd0c453",
    //         pass: "e420d9b073e57c"
    //       }
    //     });
    let subject: string;
    let html: string;

    // Handle admin actions with custom content
    if (emailType === 'ADMIN_ACTION') {
      subject = customSubject || EMAIL_SUBJECTS.ADMIN_ACTION;
      html = customHtml || '<p>Admin action notification</p>';
    } else {
      // Use predefined templates for other email types
      subject = EMAIL_SUBJECTS[emailType];

      switch (emailType) {
        case 'VERIFY':
          html = EMAIL_TEMPLATES.VERIFY(userdata, hashToken);
          break;
        case 'WELCOME':
          html = EMAIL_TEMPLATES.WELCOME(userdata);
          break;
        case 'RESET':
          html = EMAIL_TEMPLATES.RESET(userdata, hashToken);
          break;
        case 'DELETE':
          html = EMAIL_TEMPLATES.DELETE(userdata, hashToken);
          break;
        case 'ENABLE_2FA':
          html = EMAIL_TEMPLATES.ENABLE_2FA(userdata, hashToken);
          break;
        case 'TWO_FA_OTP':
          html = EMAIL_TEMPLATES.TWO_FA_OTP(userdata, otpCode || '');
          break;
        case 'EMAIL_CHANGE':
          html = EMAIL_TEMPLATES.EMAIL_CHANGE(userdata, hashToken);
          break;
        default:
          throw new Error('Invalid email type');
      }
    }

    const mailOption = {
      from: process.env.MAILUSER,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOption);
    console.log('Mail Sent Successfully');
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

export { generateOTP };
