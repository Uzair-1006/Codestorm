import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["jobseeker", "hr"], default: "jobseeker" }
});

export default mongoose.model("User", userSchema);
