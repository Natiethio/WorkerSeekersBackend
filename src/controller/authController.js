const authService = require("../services/authService");

class AuthController {
    async login(req, res) {
        try {
            const { phone, password } = req.body;

            if (
                typeof phone !== "string" ||
                typeof password !== "string" ||
                !phone.trim() ||
                !password
            ) {
                return res.status(400).json({
                    message: "Phone number and password are required",
                });
            }

            const result = await authService.login(
                phone.trim(),
                password
            );

            return res.status(200).json({
                message: "Login successful",
                token: result.token,
                user: result.user,
            });
        }
        catch (error) {
            if (error.message === "Invalid phone number or password") {
                return res.status(401).json({
                    message: "Invalid phone number or password",
                });
            }

            console.error("Login error:", error.message);

            return res.status(500).json({
                message: "Something went wrong",
            });
        }

    }
}

module.exports = new AuthController();