export const emailTemplet = ({subject='',info='',endMessage=''})=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gym System Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fff;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <!-- Hero Section -->
    <tr>
      <td style="padding: 20px; background-color: #181717; color: #45ffca; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to Our Gym!🎉</h1>
        <p style="font-size: 16px; margin: 10px 0; color: #ffffff;">Achieve your fitness goals with our top trainers and customized programs.</p>
        <a href="https://nitrogym.vercel.app/" style="display: inline-block; padding: 12px 20px; color: #ffffff; background-color: #45ffca; text-decoration: none; font-weight: bold; border-radius: 4px;">Visit Us</a>
      </td>
    </tr>

         <!-- Content Section -->
        <tr>
        <td style="padding: 20px; background-color: #333333; color: #fff; font-size: 16px; line-height: 1.6;">
            <h2 style="color: #45ffca; font-size: 20px;">${subject}</h2>
            <p>${info}</p>
            <p style="color: #fff; "> ${endMessage}</p>
        </td>
        </tr>

        <!-- Footer Section -->
        <tr>
        <td align="center" style="padding: 20px; background-color: #333333; color: #ffffff;">
            <p style="font-size: 14px;">Follow us on:</p>
            <a href="https://facebook.com/yourgym" style="margin: 0 10px; text-decoration: none; color: #45ffca;">Facebook</a> |
            <a href="https://instagram.com/yourgym" style="margin: 0 10px; text-decoration: none; color: #45ffca;">Instagram</a> |
            <a href="https://twitter.com/yourgym" style="margin: 0 10px; text-decoration: none; color: #45ffca;">Twitter</a>
            <p style="font-size: 12px; color: #cccccc;">© 2024 Gym System. All rights reserved.</p>
        </td>
        </tr>
    </table>
    </body>
    </html>
`
}

export default emailTemplet