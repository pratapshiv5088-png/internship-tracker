const router = require("express").Router();
const Company = require("../models/Company");
const auth = require("../middleware/authMiddleware");

// Student applies
router.post("/", auth, async (req, res) => {
    const company = await Company.create({
        ...req.body,
        student: req.user._id
    });
    res.json(company);
});

// Get student applications
router.get("/", auth, async (req, res) => {
    try {
        const query = req.user.role === "admin" ? {} : { student: req.user._id };
        const companies = await Company.find(query);
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
// Admin update status
router.put("/:id", auth, async (req, res) => {
    if (req.user.role !== "admin")
        return res.status(403).json("Admin only");

    const updated = await Company.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );

    res.json(updated);
});

module.exports = router;