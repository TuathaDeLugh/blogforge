import nodemailer from 'nodemailer';
import User from '@/models/user';


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
  emailType: 'VERIFY' | 'RESET' | 'DELETE' | 'EMAIL_CHANGE' | 'WELCOME';
  username?: string;
}

export const sendEmail = async ({ email, emailType, username }: EmailData) => {
  try {
    let userdata;
    if (emailType === "EMAIL_CHANGE") {
      userdata = username;
    } else {
      userdata = await User.findOne({ email });
    }
    if (!userdata) {
      throw new Error("User not found");
    }
    const userId = userdata._id;
    const hashToken = generateRandomToken();

    let updateData: any = {};

    switch (emailType) {
      case "VERIFY":
        updateData = { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 360000 };
        break;
      case "RESET":
        updateData = { forgotPasswordToken: hashToken, forgotPasswordExpiry: Date.now() + 360000 };
        break;
      case "DELETE":
        updateData = { deleteAccountToken: hashToken, deleteAccountTokenExpiry: Date.now() + 360000 };
        break;
      case "EMAIL_CHANGE":
        updateData = { NewMailToken: hashToken, NewMailTokenExpiry: Date.now() + 360000 };
        break;
      case "WELCOME": 
        updateData = {}; 
        break;
      default:
        throw new Error("Invalid email type");
    }
    await User.findByIdAndUpdate(userId, updateData);

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
      }
    });

    //  const transporter = nodemailer.createTransport({
    //       host: "sandbox.smtp.mailtrap.io",
    //       port: 2525,
    //       auth: {
    //         user: "8d8f9fefd0c453",
    //         pass: "e420d9b073e57c"
    //       }
    //     });

    const mailOption = {
      from: "auth@umangsailor.com",
      to: email,
      subject: emailType === 'VERIFY'
        ? "Verify Your Email - BlogForge"
        : emailType === 'WELCOME'
         ? "Welcome to BlogForge!"
        : emailType === 'RESET'
          ? "Reset Your Password - BlogForge"
          : emailType === 'DELETE'
            ? "Delete Your Account - BlogForge"
            : "Confirm Email Change - BlogForge",
      html: emailType === 'VERIFY' ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px; overflow: hidden; background-color: #fff;">
    
    <div style="background-color: #FFB347; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">
            Verify Your Email for
            <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
                <img src="https://blogforge.umangsailor.com/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
            </span>
        </h1>
    </div>

    <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
    <div style="text-align: center; margin-bottom: 15px;">
        <img src="${userdata.avatar || 'https://blogforge.umangsailor.com/_next/image?url=%2FBlogForge.png&w=64&q=75'}" alt="User Avatar" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover;">
      </div>
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${userdata.username || 'Valued User'}!</h2>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
            Welcome to <strong>BlogForge</strong>! We're excited to have you as part of our community of bloggers and creators.
        </p>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
            To keep your account secure, please verify your email address by clicking the button below.
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.API_URL!}verifyemail?token=${hashToken}" style="background-color: #FFB347; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                Verify Email
            </a>
        </div>

        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
            Alternatively, you can copy and paste the link below into your browser:
        </p>
        <p style="color: #FFB347; word-wrap: break-word; font-size: 14px;">
            <a href="${process.env.API_URL!}verifyemail?token=${hashToken}" style="color: #FFB347; text-decoration: none;">${process.env.API_URL!}verifyemail?token=${hashToken}</a>
        </p>

        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
            Thank you for verifying your email and joining BlogForge. We can't wait to see your creative work come to life!
        </p>
    </div>

    <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">This email was sent from BlogForge. Please do not reply to this email.</p>
        <p style="color: #888; font-size: 12px;">If you have any questions, feel free to <a href="mailto:contact@umangsailor.com" style="color: #FFB347; text-decoration: none;">contact us</a>.</p>
    </div>
</div>

      ` 
     : emailType === 'WELCOME' ? `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px; overflow: hidden; background-color: #fff;">
    
    <div style="background-color: #FFB347; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 28px;">
        Welcome to
        <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
          <img src="https://blogforge.umangsailor.com/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
        </span>
      </h1>
    </div>

 
    <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">

      <div style="text-align: center; margin-bottom: 15px;">
        <img src="${userdata.avatar || 'https://blogforge.umangsailor.com/_next/image?url=%2FBlogForge.png&w=64&q=75'}" alt="User Avatar" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover;">
      </div>

      
      <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${userdata.username || 'Valued User'}!</h2>
      <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
        We're absolutely thrilled to have you on board at <strong>BlogForge</strong>! You've joined a growing community of passionate writers, creators, and readers.
      </p>
      <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
        Whether you're here to share your insights, discover new ideas, or connect with like-minded individuals, BlogForge is the perfect place to grow and nurture your creative side.
      </p>


      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.API_URL!}" style="background-color: #FFB347; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
          Start Your Journey
        </a>
      </div>

      <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
        Need help getting started? Check out our <a href="${process.env.API_URL!}contact" style="color: #FFB347; text-decoration: none;">Help Center</a> or feel free to reach out to our support team anytime.
      </p>

      <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
        We look forward to seeing your stories and ideas come to life on BlogForge. Welcome to the family!
      </p>
    </div>

  
    <div style="background-color: #fff; padding: 20px; border-top: 1px solid #eee;">
      <h3 style="color: #333; text-align: center; margin-bottom: 20px;">What's waiting for you?</h3>
      <ul style="list-style: none; padding: 0; margin: 0; text-align: center;">
        <li style="margin-bottom: 10px;">
          <span style="color: #FFB347; font-weight: bold;">📄 Write & Share:</span> Create stunning blog posts with ease using our powerful editor.
        </li>
        <li style="margin-bottom: 10px;">
          <span style="color: #FFB347; font-weight: bold;">🌟 Build Your Audience:</span> Connect with readers and grow your following.
        </li>
        <li style="margin-bottom: 10px;">
          <span style="color: #FFB347; font-weight: bold;">💬 Engage & Interact:</span> Receive comments, feedback, and likes from your readers.
        </li>
        <li style="margin-bottom: 10px;">
          <span style="color: #FFB347; font-weight: bold;">📊 Analytics & Insights:</span> Track your blog's performance with detailed stats.
        </li>
      </ul>
    </div>


    <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
      <p style="color: #888; font-size: 12px;">You are receiving this email because you joined BlogForge.</p>
      <p style="color: #888; font-size: 12px;">BlogForge, All rights reserved.</p>
      <p style="color: #888; font-size: 12px;">This email was sent to ${email}. If you have any questions, feel free to <a href="mailto:contact@umangsailor.com" style="color: #FFB347; text-decoration: none;">contact us</a>.</p>
    </div>
  </div>`
      : emailType === 'RESET'
        ? `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px; overflow: hidden; background-color: #fff;">
    
    <div style="background-color: #FFB347; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">
            Reset Your Password for
            <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
                <img src="https://blogforge.umangsailor.com/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
            </span>
        </h1>
    </div>

    <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${userdata.username || 'Valued User'}!</h2>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
            We received a request to reset your password for your BlogForge account. To proceed, please click the button below.
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.API_URL!}reset?token=${hashToken}" style="background-color: #FFB347; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
              Reset Password
            </a>
        </div>

        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
            Alternatively, you can copy and paste the link below into your browser:
        </p>
        <p style="color: #FFB347; word-wrap: break-word; font-size: 14px;">
            <a href="${process.env.API_URL!}reset?token=${hashToken}" style="color: #FFB347; text-decoration: none;">${process.env.API_URL!}reset?token=${hashToken}</a>
        </p>

        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
            If you did not request this password reset, please ignore this email.
        </p>
    </div>

    <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">This email was sent from BlogForge. Please do not reply to this email.</p>
        <p style="color: #888; font-size: 12px;">If you have any questions, feel free to <a href="mailto:contact@umangsailor.com" style="color: #FFB347; text-decoration: none;">contact us</a>.</p>
    </div>
</div>



      ` : emailType === 'DELETE' ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FF6347; border-radius: 8px; overflow: hidden; background-color: #fff;">
    
    <div style="background-color:#FF6347; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 28px;">
        Account Deletion
        <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
          <img src="https://blogforge.umangsailor.com/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
        </span>
      </h1>
    </div>

    <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">

        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${userdata.username || 'User'}!</h2>

        <p style="color: #555; text-align: center;">You have requested to delete your BlogForge account. We’re sorry to see you go. Please be aware of the following consequences:</p>
        
        <ul style="color: #555; text-align: left; margin: 20px auto; max-width: 500px; list-style-type: disc; padding-left: 20px;">
            <li style="margin-bottom: 10px;">📄 You will no longer be able to add new blogs.</li>
            <li style="margin-bottom: 10px;">💬 You will lose the ability to comment on blogs.</li>
            <li style="margin-bottom: 10px;">👤 Your created blogs will be transferred to admin.</li>
            <li style="margin-bottom: 10px;">💾 You will no longer be able to save blogs to your list.</li>
            <li style="margin-bottom: 10px;">🗂️ All your current saved blogs and preferences will be lost.</li>
            <li style="margin-bottom: 10px;">🔄 Rejoining will require a new account creation and setup.</li>
        </ul>

        <p style="color: #555; text-align: center;">If you are sure you want to delete your account, please click the button below:</p>
        
        <div style="text-align: center; margin-bottom: 20px;">
            <a href="${process.env.API_URL!}deleteaccount?token=${hashToken}" style="display: inline-block; padding: 12px 24px; background-color: #FF6347; color: #fff; border-radius: 4px; text-decoration: none;">Confirm Account Deletion</a>
        </div>
        
        <p style="color: #555; text-align: center; margin-bottom: 20px;">Alternatively, you can click the link below:</p>
        <p style="color: #FF6347; text-align: center; margin-bottom: 20px; word-wrap: break-word;"><a href="${process.env.API_URL!}deleteaccount?token=${hashToken}" style="color: #FF6347; text-decoration: none;">${process.env.API_URL!}deleteaccount?token=${hashToken}</a></p>
        
        <p style="color: #555; text-align: center;">If you did not request this change, please ignore this email.</p>
    </div>

    <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">You are receiving this email because you requested to delete your BlogForge account.</p>
        <p style="color: #888; font-size: 12px;">BlogForge, All rights reserved.</p>
        <p style="color: #888; font-size: 12px;">This email was sent to ${email}. If you have any questions, feel free to <a href="mailto:contact@umangsailor.com" style="color: #FF6347; text-decoration: none;">contact us</a>.</p>
    </div>
</div>



      `
          :
          `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px; overflow: hidden; background-color: #fff;">
    
    <div style="background-color: #FFB347; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 28px;">
        Confirm Email Change
        <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
          <img src="https://blogforge.umangsailor.com/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
        </span>
      </h1>
    </div>

    <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
      <div style="text-align: center; margin-bottom: 15px;">
      </div>

      <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${userdata.username || 'Valued User'}!</h2>
      <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
        You have requested to change your email address for your BlogForge account. Please click the button below to confirm this change.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.API_URL!}verifyemail?type=update&token=${hashToken}" style="background-color: #FFB347; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
          Confirm Email Change
        </a>
      </div>
      <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
        Alternatively, you can click the link below:
      </p>
      <p style="color: #FFB347; text-align: center; margin: 10px 0; word-wrap: break-word;">
        <a href="${process.env.API_URL!}verifyemail?type=update&token=${hashToken}" style="color: #FFB347; text-decoration: none;">${process.env.API_URL!}verifyemail?type=update&token=${hashToken}</a>
      </p>
      <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
        If you did not request this change, please ignore this email.
      </p>
    </div>

    <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
      <p style="color: #888; font-size: 12px;">You are receiving this email because you requested an email change for your BlogForge account.</p>
      <p style="color: #888; font-size: 12px;">BlogForge, All rights reserved.</p>
      <p style="color: #888; font-size: 12px;">This email was sent to ${email}. If you have any questions, feel free to <a href="mailto:contact@umangsailor.com" style="color: #FFB347; text-decoration: none;">contact us</a>.</p>
    </div>
</div>
`
    };

    await transporter.sendMail(mailOption);
    console.log("Mail Sent");

  } catch (error) {
    console.error(error);
  }
};
