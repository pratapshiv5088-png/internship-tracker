const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authMiddleware");

// Get matching user profile
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Update Profile Action
router.put("/profile", auth, async (req, res) => {
    try {
        const { name, email } = req.body;
        let user = await User.findById(req.user.id);

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.json({ message: "Profile updated successfully!", user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update Password Action
router.put("/password", auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Both current and new password are required" });
        }

        let user = await User.findById(req.user.id);

        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password updated successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
