import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true,unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    awatar: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    favourties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
    if (this.isModified(("password"))) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

  userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


  userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  };


export default mongoose.model("user", userSchema);
