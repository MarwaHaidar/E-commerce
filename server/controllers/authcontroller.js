import Author from '../models/auth.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
// ====================================================================================================================
// Function to send a verification email
// function sendVerificationEmail(email, verificationToken) {
//     const transporter = nodemailer.createTransport({
//         // Set up your email transport configuration (e.g., SMTP, Gmail, etc.)
//         // Example for using Gmail:
//         service: 'gmail',
//         auth: {
//             user: 'globalimpactglobalimpact@gmail.com',
//             pass: 'hubi ltcu olxs tmli',
//         },
//     });

//     const mailOptions = {
//         from: 'globalimpactglobalimpact@gmail.com',
//         to: email,
//         subject: 'Verify Your Email',
//         text: `Click the following link to verify your email: https://localhost:3000/author/login/verify?token=${verificationToken}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// }




// ==============================================================================================================
// register user
const registeruser=asyncHandler(async(req,res)=>{
    const {first_name,last_name,email,password}=req.body;
    if(!first_name || !last_name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
        // Email validation using a regular expression
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            res.status(400);
            throw new Error("Please enter a valid email address");
        }
        //check  email existance in database 
    const authorAvailable=await Author.findOne({email});
    if(authorAvailable){
        res.status(400);
        throw new Error("User already registered!")
    }
    // Additional password validation
    if (password.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
        res.status(400);
        throw new Error("Password must be at least 6 characters long and contain both letters and numbers.");
    }
    // hash password
    const hashedpass= await bcrypt.hash(password,10);
    console.log(`hasshed password: ${hashedpass}`)
     // Generate a verification token
     const verificationToken = jwt.sign({ email }, process.env.EMAIL_VERIFICATION_SECRET, { expiresIn: '1d' });

    const author= await Author.create({first_name,last_name,email,password:hashedpass,verificationToken,});
    // Log the verification token and email message (for testing purposes)
    console.log(`Verification Token: ${verificationToken}`);
    console.log(`Email Message: Click the following link to verify your email: https://your-app.com/verify?token=${verificationToken}`);

    // Send the verification email
    // sendVerificationEmail(email, verificationToken);
    console.log(`user is created ${author}`)
    if(author){
        res.status(201).json({_id: author.id,email:author.email})
    }else{
        res.status(400);
        throw new Error("user data is not valid, can't create user")
    }
});
export {registeruser}
// ============================================================================================================

// login user
const loginuser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mendatory!")
    }
    const auth=await Author.findOne({email});
    //compare password with hashed password
if(auth && (await bcrypt.compare(password,auth.password))){
    //concerning the jwt: json web token 
    // go to jwt.io
    //jwt consist of 3 parts:the first part is the header algorithm of the token(red color)
    //the second is in pink color is the payload where it has the user information we want to add to the token
    // third part in green is the signature verification 
    const accessToken=jwt.sign({
        user:{
            first_name:auth.first_name,
            last_name:auth.last_name,
            email:auth.email,
            id:auth.id,
        }// payload
//now we want to provide an access token secret so in order to get it we just define an access
// token secret in ourenvironment variable file so go to .env (environment variable file )
// now we should provide the expiration date of this token so that after the token is expired the user can't use it
// in order to call the api so we should set the expiry time as 1 min for testing now 

    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1d"})
    
    res.status(201).json({accessToken});
}else{
    res.status(401);
    throw new Error("email or password is not valid!")
}
});
export {loginuser}


// =====================================================================================================================
// current user info
const currentuser=asyncHandler(async(req,res)=>{
    res.json({message:"current user info"})
});
export {currentuser}