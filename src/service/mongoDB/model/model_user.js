import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    minLength: 1,
  },
  profile_img: {
    type: String,
    default: "",
  },
  join_date: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  wr_posts: {
    type: [String],
    default: [],
  },
  wr_comments: {
    type: [String],
    default: [],
  },
});

userSchema.pre("save", function (next) {
  this.join_date = new Date();
  next();
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
