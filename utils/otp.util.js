export function generateOtps() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp) {
return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  
  <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">
    
    <h2 style="color: #333; text-align: center;">
      Email Verification
    </h2>

    <p style="font-size: 16px; color: #555;">
      Hello,
    </p>

    <p style="font-size: 16px; color: #555;">
      Use the following One-Time Password (OTP) to verify your account:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <span style="
        display: inline-block;
        padding: 15px 30px;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 5px;
        color: #ffffff;
        background-color: #2563eb;
        border-radius: 8px;
      ">
        ${otp}
      </span>
    </div>

    <p style="font-size: 14px; color: #777;">
      This OTP will expire in 10 minutes.
    </p>

    <p style="font-size: 14px; color: #777;">
      If you did not request this OTP, please ignore this email.
    </p>

    <hr style="margin: 20px 0;">

    <p style="font-size: 12px; color: #999; text-align: center;">
      © 2026 Your App Name. All rights reserved.
    </p>

  </div>

</body>
</html>
`
}