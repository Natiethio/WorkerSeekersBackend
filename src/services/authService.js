const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// require("dotenv").config({ path: path.join(__dirname, '../../.env') });

class AuthService {

    async login(phone, password) {
        const user = await User.findOne({ phone }).select("+password");

        if (!user) {
            throw new Error("Invalid phone number or password");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid phone number or password");
        }

        // Create a signed token after successful verification.
        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Never return the password hash.
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone,
            }
        }
    }
}

module.exports = new AuthService();
