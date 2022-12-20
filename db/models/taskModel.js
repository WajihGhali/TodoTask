const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // ref: "User",
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }],
    readers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Task', taskSchema);
