import Author from '../models/auth.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { validateToken } from '../Middleware/validateTokenHandler.js';
  
const sendResetEmail = (userEmail) => {
    // Send an email containing the reset link with the token
    // You can use nodemailer or any other email sending library
    // Include the reset token in the link, e.g., /reset-password?token=yourTokenHere
    console.log(`Sending reset email to ${userEmail}`);
    const transporter = nodemailer.createTransport({
        // Set up your email transport configuration (e.g., SMTP, Gmail, etc.)
        // Example for using Gmail:
        service: 'gmail',
        auth: {
            user: 'globalimpactglobalimpact@gmail.com',
            pass: 'hubi ltcu olxs tmli',
        },
    });

    const mailOptions = {
        from: 'globalimpactglobalimpact@gmail.com',
        to: userEmail,
        subject: 'reset your password',
        text: 'Click the following link to reset your password: ',
        html:`<a href="https://localhost:3000/author/resetpassword">Reset password</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
  };

  const requestPasswordReset = asyncHandler(async (req, res) => {
    try {
        // Use the validateToken middleware to enforce authentication
        validateToken(req, res, async () => {
            const userEmail = req.body.email;
            const user = await User.findOne({ email: userEmail });
        
            if (user) {
                // const resetToken = jwt.sign({
                //     user: {
                //         first_name: user.first_name,
                //         last_name: user.last_name,
                //         email: user.email,
                //         id: user.id,
                //     }
                // }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "1h" });
        
                // // Save the reset token and expiration in the database
                // await User.updateOne(
                //     { email: userEmail },
                //     {
                //         $set: {
                //             access_token: resetToken,
                //         },
                //     }
                // );
        
                // Send the reset email
                sendResetEmail(userEmail);
                console.log("email sent successfully")

        
                // // // Verify the token
                // jwt.verify(resetToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
                //     if (err) {
                //         res.status(401).json({ message: "Token verification failed" });
                //     } else {
                //         // Redirect to the reset password page if token is verified
                //         res.redirect(`/resetpass`);
                //     }
                // });
            } else {
                res.status(401).json({ message: "Email is not valid" });
            }
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token has expired' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

export { requestPasswordReset };

  //==================================reset the password=================================================================

  const resetPassword = async (req, res) => {
    try {
        // Use the validateToken middleware to enforce authentication
        validateToken(req, res, async () => {

            const { newPassword } = req.body;
            //const { token } = req.query;

            // Access the user ID from the decoded information attached by the middleware
            const userEmail = req.user.email;
            console.log(userEmail);

            // Find the user based on the user ID
            const user = await User.findOne({ email: userEmail });
             // Find the auth based on the user ID
             const auth = await Author.findOne({ email: req.user.email });


            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // // Check if the token matches the user's stored token
            // if (user.access_token !== token) {
            //     return res.status(401).json({ message: 'Invalid token' });
            // }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password in the database
            await User.updateOne(
                { _id: user._id },
                {
                    $set: {
                        password: hashedPassword,
                        access_token: null, // Clear the reset token after successful reset
                    },
                }
            );
            // Update the author's password in the database
            await Author.updateOne(
                { email: auth.email },
                {
                    $set: {
                        password: hashedPassword,
                       
                    },
                }
            );

            res.status(200).json({ message: 'Password reset successfully' });
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token has expired' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};


export { resetPassword };
