import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        // Extract the token from the Authorization header
        token = authHeader.split(" ")[1];

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }

            // Attach the user information to the request object
            req.user = decoded.user;
            next();//go to controller if validation is done
        });
    } else {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

// Modified validateToken for admin authorization
const validateTokenForAdmin = asyncHandler(async (req, res, next) => {
    // Use the validateToken middleware to enforce authentication
    validateToken(req, res, async () => {
        // Access the user role from the decoded information
        const userRole = req.user.role;

        // Check if the user has admin permissions
        if (userRole !== 'admin') {
            res.status(403).json({ message: 'Admin permissions required' });
        } else {
            // User has admin permissions, proceed to the next middleware/route
            next();
        }
    });
});

//validate the refresh token

const validateRefreshToken = asyncHandler(async (req, res, next) => {
// Client sends the refresh token to the server
const refreshToken = req.cookies.refreshToken;

// Verify the refresh token
jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
        res.status(401).json({ message: "Invalid refresh token" });
    } else {
        // Generate a new access token
        const newAccessToken = jwt.sign({
            user: {
                id: decoded.user.id,
                first_name: decoded.user.first_name,
                last_name: decoded.user.last_name,
                email: decoded.user.email,
                role: decoded.user.role,
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3m" });

        // Send the new access token to the client
        res.json({ accessToken: newAccessToken });
    }
});
});

export { validateToken, validateTokenForAdmin,validateRefreshToken };

