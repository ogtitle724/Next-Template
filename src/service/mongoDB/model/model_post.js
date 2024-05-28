import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: {
    name: String,
    email: String,
  },
  content: String,
  wr_date: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  re_date: {
    type: Date,
    immutable: false,
    default: () => Date.now(),
  },
  meta: {
    like: Number,
    dislike: Number,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
  },
  author: {
    uid: { type: String, default: "" },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    profile_img: {
      type: String,
      default: "",
    },
  },
  topic: {
    type: String,
    minLength: 1,
  },
  is_public: {
    type: Boolean,
    default: true,
  },
  content: {
    type: String,
    minLength: 1,
  },
  summary: {
    type: String,
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
  thumbnail: {
    type: String,
    default: "",
  },
  wr_date: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  re_date: {
    type: Date,
    immutable: false,
    default: () => new Date(),
  },
  tags: {
    type: [String],
    default: [],
  },
  meta: {
    view_cnt: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
});

postSchema.pre("save", function (next) {
  this.re_date = new Date();
  next();
});

/* postSchema.pre("findOne", function (next) {
  this.update({}, { $inc: { "meta.view_cnt": 1 } }, { multi: true });
  next();
}); */

//here make vertual method that calc score(best)
const Post = mongoose.models?.posts || mongoose.model("posts", postSchema);

export default Post;
