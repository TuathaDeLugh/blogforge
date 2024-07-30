import nodemailer from 'nodemailer';
import User from '@/models/user';

interface EmailData {
  email: string;
  emailType: string;
}

function generateRandomToken(length: number = 32): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

interface EmailData {
  email: string;
  emailType: string;
}

export const sendEmail = async ({ email, emailType }: EmailData) => {
  try {
    const userdata = await User.findOne({ email });
    if (!userdata) {
      throw new Error("User not found");
    }
    const userId = userdata._id;
    const hashToken = generateRandomToken();

    let updateData: any = {};
    let deleteAccountToken: string | null = null;

    switch (emailType) {
      case "VERIFY":
        updateData = { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 360000 };
        break;
      case "RESET":
        updateData = { forgotPasswordToken: hashToken, forgotPasswordExpiry: Date.now() + 36000 };
        break;
        case "DELETE":
          updateData = { deleteAccountToken: hashToken, deleteAccountTokenExpiry: Date.now() + 36000 };
          break;
          default:
            throw new Error("Invalid email type");
          }
          await User.findByIdAndUpdate(userId, updateData);
          
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.MAILUSER,
    //     pass: process.env.MAILPASS
    //   }
    // });

     const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "8d8f9fefd0c453",
            pass: "e420d9b073e57c"
          }
        });

    const mailOption = {
      to: email,
      subject: emailType === 'VERIFY'
        ? "Verify Your Email - BlogForge"
        : emailType === 'RESET'
          ? "Reset Your Password - BlogForge"
          : "Delete Your Account - BlogForge",
      html: emailType === 'VERIFY' ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px;">
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                  <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Welcome to BlogForge!</h1>
                  <p style="color: #555; text-align: center; margin-bottom: 20px;">Dear user,</p>
                  <p style="color: #555; text-align: center;">We're excited to have you as a part of our blogging community. To ensure the security of your account, please verify your email address.</p>
                  <div style="text-align: center; margin-bottom: 20px;">
                      <a href="${process.env.API_URL!}verifyemail?token=${hashToken}" style="display: inline-block; padding: 12px 24px; background-color: #FFB347; color: #fff; border-radius: 4px; text-decoration: none;">Verify Email</a>
                  </div>
                  <p style="color: #555; text-align: center; margin-bottom: 20px;">Alternatively, you can click the link below:</p>
                  <p style="color: #FFB347; text-align: center; margin-bottom: 20px; word-wrap: break-word;"><a href="${process.env.API_URL!}verifyemail?token=${hashToken}" style="color: #FFB347; text-decoration: none;">${process.env.API_URL!}/verifyemail?token=${hashToken}</a></p>
                  <p style="color: #555; text-align: center;">Thank you for choosing BlogForge!</p>
              </div>
              <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                  <p style="color: #555; font-size: 12px;">This email was sent from BlogForge. Please do not reply to this email.</p>
              </div>
          </div>
      ` : emailType === 'RESET'
        ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px;">
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                  <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Reset Your Password - BlogForge</h1>
                  <p style="color: #555; text-align: center; margin-bottom: 20px;">Dear user,</p>
                  <p style="color: #555; text-align: center;">You have requested to reset your password for your BlogForge account. Please click the button below to proceed with the password reset.</p>
                  <div style="text-align: center; margin-bottom: 20px;">
                      <a href="${process.env.API_URL!}reset?token=${hashToken}" style="display: inline-block; padding: 12px 24px; background-color: #FFB347; color: #fff; border-radius: 4px; text-decoration: none;">Reset Password</a>
                  </div>
                  <p style="color: #555; text-align: center; margin-bottom: 20px;">Alternatively, you can click the link below:</p>
                  <p style="color: #FFB347; text-align: center; margin-bottom: 20px; word-wrap: break-word;"><a href="${process.env.API_URL!}reset?token=${hashToken}" style="color: #FFB347; text-decoration: none;">${process.env.API_URL!}/reset?token=${hashToken}</a></p>
                  <p style="color: #555; text-align: center;">If you did not request this change, please ignore this email.</p>
                  <p style="color: #555; text-align: center;">Thank you,</p>
                  <p style="color: #555; text-align: center;">The BlogForge Team</p>
              </div>
              <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                  <p style="color: #555; font-size: 12px;">This email was sent from BlogForge. Please do not reply to this email.</p>
              </div>
          </div>
      ` : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px;">
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                  <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Delete Your Account - BlogForge</h1>
                  <p style="color: #555; text-align: center; margin-bottom: 20px;">Dear user,</p>
                  <p style="color: #555; text-align: center;">We’re sorry to see you go. Deleting your account will remove all your blogs and data permanently. If you have any feedback or there’s anything we can do to improve your experience, please let us know.</p>
                  <div style="text-align: center; margin-bottom: 20px;">
                      <a href="${process.env.API_URL!}deleteaccount?token=${hashToken}" style="display: inline-block; padding: 12px 24px; background-color: #FFB347; color: #fff; border-radius: 4px; text-decoration: none;">Delete Account</a>
                  </div>
                  <p style="color: #555; text-align: center; margin-bottom: 20px;">Alternatively, you can click the link below:</p>
                  <p style="color: #FFB347; text-align: center; margin-bottom: 20px; word-wrap: break-word;"><a href="${process.env.API_URL!}deleteaccount?token=${hashToken}" style="color: #FFB347; text-decoration: none;">${process.env.API_URL!}deleteAccountTokenExpdeleteaccount?token=${hashToken}</a></p>
                  <p style="color: #555; text-align: center; margin-bottom: 20px; font-weight: bold;">Please do not share this email or link with anyone.</p>
                  <p style="color: #555; text-align: center;">Thank you for choosing BlogForge!</p>
              </div>
              <div style="text-align: center; padding: 10px; background-color: #f9f9f9; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                  <p style="color: #555; font-size: 12px;">This email was sent from BlogForge. Please do not reply to this email.</p>
              </div>
          </div>
      `
    };

    await transporter.sendMail(mailOption);
  } catch (error) {
    console.error(error);
  }
};
