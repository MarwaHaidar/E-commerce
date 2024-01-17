import Author from '../models/auth.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// login user
const loginuser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const auth = await Author.findOne({ email });
    // compare password with hashed password
    if (auth && (await bcrypt.compare(password, auth.password) && auth.verifyStatus === true)) {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });

        // If the user already exists, update the access token
        if (existingUser) {
            existingUser.access_token = jwt.sign({
                user: {
                    first_name: auth.first_name,
                    last_name: auth.last_name,
                    email: auth.email,
                    id: existingUser.id,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

            await existingUser.save();

            res.status(200).json({ user: existingUser });
        } else {

              // If the user does not exist, create a new user entry
              const accessToken = jwt.sign({
                user: {
                    first_name: auth.first_name,
                    last_name: auth.last_name,
                    email: auth.email,
                    id: auth.id,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
             // Create a new User document with the specified schema
             const user = await User.create({
                first_name: auth.first_name,
                last_name: auth.last_name,
                email: auth.email,
                password: auth.password, // You may want to consider hashing the password again
                access_token: accessToken,
            });

           
            res.status(201).json({ user });
        }
    } else {
        res.status(401);
        throw new Error("Email or password is not valid!");
    }
});

export { loginuser };

  


// =====================================================================================================================
// current user info
const currentuser=asyncHandler(async(req,res)=>{
    res.json(req.user);
});
export {currentuser}