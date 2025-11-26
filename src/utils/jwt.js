import jwt from 'jsonwebtoken';
import config from '../config.js';

// Generate JWT Token
export const generateToken = (payload, expiresIn = config.jwtExpiresIn) => {
    try {
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: expiresIn,
            issuer: config.jwtIssuer,
            audience: config.jwtAudience,
         });
        return token;
}
    catch (error) {
        throw new Error('Error generating token:',${error.message});
    }
};

// Verify JWT Token
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.jwtSecret, {
            issuer: config.jwtIssuer,
            audience: config.jwtAudience,
        });
        return decoded;
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        }
        else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        }
        else {
        throw new Error(`Error verifying token: ${error.message}`);
        }
    }
};

// Authenticate token
export const authenticateToken = (req, res, next) => {
    try{
        //Get token from Authorizaton header
        const authHeader = req.header["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; //FORMAT: "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ error: "Access Denied. No token provided." });
        }

        //Verify Token
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(400).json({error: error.message});
    }
};