const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,

    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email format");
      }
    },
  },
  marketingConsent: {
    type: Boolean,
    default: false,
    required: true,
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});


userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      const hashed = await bcryptjs.hash(this._update.password, 10);
      this._update.password = hashed;
      next();
    }
    next();
  } catch (err) {
    return next(err);
  }
});

// Hide user credentials data
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  deletedElements = ["__v", "tokens"];
  deletedElements.forEach((element) => {
    delete user[element];
  });
  return user;
};

userSchema.methods.generateToken = async function () {
  const userData = this;
  const token = jwt.sign({ _id: userData._id }, process.env.tokenPassword);
  userData.tokens = userData.tokens.concat({ token });
  await userData.save();
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
