const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const admins = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim());

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: "Name is require",
    },
    lastName: {
      type: String,
      require: "lastName is require",
    },
    userName: {
      type: String,
      require: "Username is require",
      unique: true,
    },
    email: {
      type: String,
      require: "Email is require",
      unique: true,
    },
    password: {
      type: String,
      require: "Password is require",
    },
    birthday: {
      type: Date,
      require: "Birthday is require",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "guest"],
      default: "guest",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  if (admins.includes(this.email)) {
    this.role = "admin";
  }

  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.method("checkPassword", function (password) {
  return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
