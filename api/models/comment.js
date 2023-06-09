const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const CommentSchema = new mongoose.Schema({
  user_id: String,
  content: { type: String,required: [true, 'required'] },
},{timestamps:true});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = {Comment,CommentSchema};
