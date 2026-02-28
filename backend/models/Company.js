const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: String,
    role: String,
    status: {
        type: String,
        enum: ["Applied", "Shortlisted", "Rejected"],
        default: "Applied"
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Company", companySchema);