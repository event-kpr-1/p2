import jwt from "jsonwebtoken";
import AdminUser from "../model/AdminUserModel.js";

const protectRoute = async (req, res, next) => {
    try {
        // Ensure cookie-parser middleware is used in the app
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(400).json({ error: 'No token found' });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_STRING);
        if (!decoded) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        // Find user by decoded userId
        const user = await AdminUser.findOne({ _id: decoded.id }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'No user found' });
        }

        // Attach user to the request
        req.AdminUser = user;
        next();
    } catch (err) {
        console.log('Error in protectRoute:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default protectRoute;
