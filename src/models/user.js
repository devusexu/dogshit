const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: {
    type: String,
    unique: true,
  },
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    // eslint-disable-next-line no-param-reassign
    delete ret.password; // Exclude the password field
    return ret;
  },
});

// Hash password before saving
// eslint-disable-next-line func-names
userSchema.pre("save", async function (next) {
  // password would be hashed only if it's modified
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});
module.exports = mongoose.model("User", userSchema);
