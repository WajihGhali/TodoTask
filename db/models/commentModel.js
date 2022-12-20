const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    // task: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Task",
    // },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Comment', commentSchema);