const asyncHandler = require("express-async-handler");
const userModel = require("../db/models/userModel");
const ApiError = require("../middlewares/apiError");
const { BadRequestError , NotFoundError } = require("../middlewares/apiError");
const {
  SuccessMsgResponse,
  SuccessResponse,
  SuccessMsgDataResponse,
  SuccessResponsePagination,
} = require("../middlewares/apiResponse");

const CommentRepo = require("../db/repositories/commentRepo");
const TaskRepo = require("../db/repositories/taskRepo");


exports.createComment = asyncHandler(async (req, res) => {

  let comment = await CommentRepo.create(req.body);

  let task = await TaskRepo.findByIdAndUpdateComment(
    req.params.id,comment
  );

  return new SuccessMsgDataResponse(task, "Comment created successfully").send(
    res
  );
});