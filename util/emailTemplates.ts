// Email template constants and functions

export const EMAIL_TEMPLATES = {
  VERIFY: (userdata: any, hashToken: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px; overflow: hidden; background-color: #fff;">
      <div style="background-color: #FFB347; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">
          Verify Your Email for
          <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
            <img src="https://blogforge.in/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
          </span>
        </h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
        <div style="text-align: center; margin-bottom: 15px;">
          <img src="${
            userdata.avatar ||
            'https://blogforge.in/_next/image?url=%2FBlogForge.png&w=64&q=75'
          }" alt="User Avatar" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover;">
        </div>
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${
          userdata.username || 'Valued User'
        }!</h2>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Welcome to <strong>BlogForge</strong>! We're excited to have you as part of our community of bloggers and creators.
        </p>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          To keep your account secure, please verify your email address by clicking the button below.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env
            .API_URL!}verifyemail?token=${hashToken}" style="background-color: #FFB347; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Verify Email
          </a>
        </div>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Alternatively, you can copy and paste the link below into your browser:
        </p>
        <p style="color: #FFB347; word-wrap: break-word; font-size: 14px;">
          <a href="${process.env
            .API_URL!}verifyemail?token=${hashToken}" style="color: #FFB347; text-decoration: none;">${process
            .env.API_URL!}verifyemail?token=${hashToken}</a>
        </p>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Thank you for verifying your email and joining BlogForge. We can't wait to see your creative work come to life!
        </p>
      </div>
      <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">This email was sent from BlogForge. Please do not reply to this email.</p>
        <p style="color: #888; font-size: 12px;">If you have any questions, feel free to <a href="mailto:service@blogforge.in" style="color: #FFB347; text-decoration: none;">contact us</a>.</p>
      </div>
    </div>
  `,

  WELCOME: (userdata: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px; overflow: hidden; background-color: #fff;">
      <div style="background-color: #FFB347; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">
          Welcome to
          <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
            <img src="https://blogforge.in/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
          </span>
        </h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
        <div style="text-align: center; margin-bottom: 15px;">
          <img src="${
            userdata.avatar ||
            'https://blogforge.in/_next/image?url=%2FBlogForge.png&w=64&q=75'
          }" alt="User Avatar" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover;">
        </div>
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${
          userdata.username || 'Valued User'
        }!</h2>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          We're absolutely thrilled to have you on board at <strong>BlogForge</strong>! You've joined a growing community of passionate writers, creators, and readers.
        </p>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Whether you're here to share your insights, discover new ideas, or connect with like-minded individuals, BlogForge is the perfect place to grow and nurture your creative side.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env
            .API_URL!}" style="background-color: #FFB347; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Start Your Journey
          </a>
        </div>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Need help getting started? Check out our <a href="${process.env
            .API_URL!}contact" style="color: #FFB347; text-decoration: none;">Help Center</a> or feel free to reach out to our support team anytime.
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
        <p style="color: #888; font-size: 12px;">This email was sent to ${
          userdata.email
        }. If you have any questions, feel free to <a href="mailto:service@blogforge.in" style="color: #FFB347; text-decoration: none;">contact us</a>.</p>
      </div>
    </div>
  `,

  RESET: (userdata: any, hashToken: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px; overflow: hidden; background-color: #fff;">
      <div style="background-color: #FFB347; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">
          Reset Your Password for
          <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
            <img src="https://blogforge.in/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
          </span>
        </h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${
          userdata.username || 'Valued User'
        }!</h2>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          We received a request to reset your password for your BlogForge account. To proceed, please click the button below.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env
            .API_URL!}reset?token=${hashToken}" style="background-color: #FFB347; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Reset Password
          </a>
        </div>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Alternatively, you can copy and paste the link below into your browser:
        </p>
        <p style="color: #FFB347; word-wrap: break-word; font-size: 14px;">
          <a href="${process.env
            .API_URL!}reset?token=${hashToken}" style="color: #FFB347; text-decoration: none;">${process
            .env.API_URL!}reset?token=${hashToken}</a>
        </p>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          If you did not request this password reset, please ignore this email.
        </p>
      </div>
      <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">This email was sent from BlogForge. Please do not reply to this email.</p>
        <p style="color: #888; font-size: 12px;">If you have any questions, feel free to <a href="mailto:service@blogforge.in" style="color: #FFB347; text-decoration: none;">contact us</a>.</p>
      </div>
    </div>
  `,

  DELETE: (userdata: any, hashToken: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FF6347; border-radius: 8px; overflow: hidden; background-color: #fff;">
      <div style="background-color:#FF6347; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">
          Account Deletion
          <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
            <img src="https://blogforge.in/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
          </span>
        </h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${
          userdata.username || 'User'
        }!</h2>
        <p style="color: #555; text-align: center;">You have requested to delete your BlogForge account. We're sorry to see you go. Please be aware of the following consequences:</p>
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
          <a href="${process.env
            .API_URL!}deleteaccount?token=${hashToken}" style="display: inline-block; padding: 12px 24px; background-color: #FF6347; color: #fff; border-radius: 4px; text-decoration: none;">Confirm Account Deletion</a>
        </div>
        <p style="color: #555; text-align: center; margin-bottom: 20px;">Alternatively, you can click the link below:</p>
        <p style="color: #FF6347; text-align: center; margin-bottom: 20px; word-wrap: break-word;"><a href="${process
          .env
          .API_URL!}deleteaccount?token=${hashToken}" style="color: #FF6347; text-decoration: none;">${process
          .env.API_URL!}deleteaccount?token=${hashToken}</a></p>
        <p style="color: #555; text-align: center;">If you did not request this change, please ignore this email.</p>
      </div>
      <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">You are receiving this email because you requested to delete your BlogForge account.</p>
        <p style="color: #888; font-size: 12px;">BlogForge, All rights reserved.</p>
        <p style="color: #888; font-size: 12px;">This email was sent to ${
          userdata.email
        }. If you have any questions, feel free to <a href="mailto:service@blogforge.in" style="color: #FF6347; text-decoration: none;">contact us</a>.</p>
      </div>
    </div>
  `,

  ENABLE_2FA: (userdata: any, hashToken: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #4CAF50; border-radius: 8px; overflow: hidden; background-color: #fff;">
      <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">
          🔐 Enable Two-Factor Authentication
          <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px; margin-top: 10px;">
            <img src="https://blogforge.in/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
          </span>
        </h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
        <div style="text-align: center; margin-bottom: 15px;">
          <img src="${
            userdata.avatar ||
            'https://blogforge.in/_next/image?url=%2FBlogForge.png&w=64&q=75'
          }" alt="User Avatar" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover;">
        </div>
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${
          userdata.username || 'Valued User'
        }!</h2>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          You have requested to enable <strong>Two-Factor Authentication (2FA)</strong> for your BlogForge account. This will add an extra layer of security to protect your account.
        </p>
        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2e7d32; margin: 0 0 10px 0;">🛡️ Enhanced Security Benefits:</h3>
          <ul style="color: #555; text-align: left; margin: 0; padding-left: 20px;">
            <li>Protection against unauthorized access</li>
            <li>Secure login verification via email</li>
            <li>Peace of mind for your account safety</li>
          </ul>
        </div>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          To confirm and enable 2FA for your account, please click the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env
            .API_URL!}enable-2fa?token=${hashToken}" style="background-color: #4CAF50; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            ✅ Enable Two-Factor Authentication
          </a>
        </div>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Alternatively, you can copy and paste the link below into your browser:
        </p>
        <p style="color: #4CAF50; word-wrap: break-word; font-size: 14px;">
          <a href="${process.env
            .API_URL!}enable-2fa?token=${hashToken}" style="color: #4CAF50; text-decoration: none;">${process
            .env.API_URL!}enable-2fa?token=${hashToken}</a>
        </p>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          If you did not request this change, please ignore this email and your account will remain unchanged.
        </p>
      </div>
      <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">This email was sent from BlogForge. Please do not reply to this email.</p>
        <p style="color: #888; font-size: 12px;">If you have any questions, feel free to <a href="mailto:service@blogforge.in" style="color: #4CAF50; text-decoration: none;">contact us</a>.</p>
      </div>
    </div>
  `,

  TWO_FA_OTP: (userdata: any, otpCode: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #2196F3; border-radius: 8px; overflow: hidden; background-color: #fff;">
      <div style="background-color: #2196F3; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">
          🔑 Login Verification Code
          <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px; margin-top: 10px;">
            <img src="https://blogforge.in/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
          </span>
        </h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
        <div style="text-align: center; margin-bottom: 15px;">
          <img src="${
            userdata.avatar ||
            'https://blogforge.in/_next/image?url=%2FBlogForge.png&w=64&q=75'
          }" alt="User Avatar" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover;">
        </div>
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${
          userdata.username || 'Valued User'
        }!</h2>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Someone is trying to log into your BlogForge account. To complete the login process, please use the verification code below:
        </p>
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 30px 0; border: 2px dashed #2196F3;">
          <h3 style="color: #1976d2; margin: 0 0 10px 0; font-size: 18px;">Your Verification Code:</h3>
          <div style="font-size: 36px; font-weight: bold; color: #1976d2; letter-spacing: 8px; font-family: 'Courier New', monospace;">
            ${otpCode}
          </div>
          <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">This code expires in 5 minutes</p>
        </div>
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <p style="color: #856404; margin: 0; font-size: 14px;">
            ⚠️ <strong>Security Notice:</strong> If you did not attempt to log in, please ignore this email and consider changing your password.
          </p>
        </div>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Enter this code on the login page to access your account. For your security, do not share this code with anyone.
        </p>
      </div>
      <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">This email was sent from BlogForge. Please do not reply to this email.</p>
        <p style="color: #888; font-size: 12px;">If you have any questions, feel free to <a href="mailto:service@blogforge.in" style="color: #2196F3; text-decoration: none;">contact us</a>.</p>
      </div>
    </div>
  `,

  EMAIL_CHANGE: (userdata: any, hashToken: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #FFB347; border-radius: 8px; overflow: hidden; background-color: #fff;">
      <div style="background-color: #FFB347; padding: 20px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">
          Confirm Email Change
          <span style="display: inline-block; vertical-align: middle; background-color: #fff; padding: 5px 10px; border-radius: 5px;">
            <img src="https://blogforge.in/_next/image?url=%2FLogo.png&w=256&q=75" alt="BlogForge Logo" style="width: 120px; height: auto;">
          </span>
        </h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; text-align: center;">
        <h2 style="color: #333; text-align: center; margin-bottom: 15px;">Hello, ${
          userdata.username || 'Valued User'
        }!</h2>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          You have requested to change your email address for your BlogForge account. Please click the button below to confirm this change.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env
            .API_URL!}verifyemail?type=update&token=${hashToken}" style="background-color: #FFB347; color: white; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            Confirm Email Change
          </a>
        </div>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          Alternatively, you can click the link below:
        </p>
        <p style="color: #FFB347; text-align: center; margin: 10px 0; word-wrap: break-word;">
          <a href="${process.env
            .API_URL!}verifyemail?type=update&token=${hashToken}" style="color: #FFB347; text-decoration: none;">${process
            .env.API_URL!}verifyemail?type=update&token=${hashToken}</a>
        </p>
        <p style="color: #555; line-height: 1.6; text-align: center; font-size: 16px;">
          If you did not request this change, please ignore this email.
        </p>
      </div>
      <div style="background-color: #f9f9f9; padding: 10px; text-align: center; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 12px;">You are receiving this email because you requested an email change for your BlogForge account.</p>
        <p style="color: #888; font-size: 12px;">BlogForge, All rights reserved.</p>
        <p style="color: #888; font-size: 12px;">This email was sent to ${
          userdata.email
        }. If you have any questions, feel free to <a href="mailto:service@blogforge.in" style="color: #FFB347; text-decoration: none;">contact us</a>.</p>
      </div>
    </div>
  `,
};

export const EMAIL_SUBJECTS = {
  VERIFY: 'Verify Your Email - BlogForge',
  WELCOME: 'Welcome to BlogForge!',
  RESET: 'Reset Your Password - BlogForge',
  DELETE: 'Delete Your Account - BlogForge',
  ENABLE_2FA: 'Enable Two-Factor Authentication - BlogForge',
  TWO_FA_OTP: 'Your Login Verification Code - BlogForge',
  EMAIL_CHANGE: 'Confirm Email Change - BlogForge',
  ADMIN_ACTION: 'Admin Action Notification - BlogForge',
};
