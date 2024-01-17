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
            next();
        });
    } else {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

export { validateToken };

