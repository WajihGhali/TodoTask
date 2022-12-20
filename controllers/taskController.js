const asyncHandler = require("express-async-handler");
const userModel = require("../db/models/userModel");
const ApiError = require("../middlewares/apiError");
const { UnauthorizedError , NotFoundError } = require("../middlewares/apiError");
const {
  SuccessMsgResponse,
  SuccessResponse,
  SuccessMsgDataResponse,
  SuccessResponsePagination,
} = require("../middlewares/apiResponse");

const TaskRepo = require("../db/repositories/taskRepo");
const UserRepo = require("../db/repositories/userRepo");



exports.getTask = asyncHandler(async (req, res) => {
  
  const task = await TaskRepo.findById(req.params.id);
  if (!task) {
    throw new NotFoundError("No task found with that id");
  }
  return new SuccessResponse(task).send(res);
 
});

exports.createTask = asyncHandler(async (req, res) => {

  let task = await TaskRepo.create({...req.body,owner:req.user._id});
  
  return new SuccessMsgDataResponse(task, "Task created successfully").send(
    res
  );
});

exports.getTasks = asyncHandler(async (req, res) => {
  
  const { page, perPage } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
  };
  const tasks = await TaskRepo.findByObjPaginate({}, options, req.query);
  if (!tasks) {
    return new SuccessMsgResponse("No tasks found").send(res);
  }
  const { docs, ...meta } = tasks;

  return new SuccessResponsePagination(docs, meta).send(res);
  
});

exports.deleteTask = asyncHandler(async (req, res) => {

  const taskReq =await TaskRepo.findById(req.params.id);

  if (taskReq.owner.toString() !== req.user._id.toString()) {
      throw new UnauthorizedError("You are not allowed to delete this task");
  }

  const task = await TaskRepo.findOneByObj({ _id: req.params.id, deletedAt: null});
 
  if (!task) {
    throw new NotFoundError("Task not found!");
  }
  let deletedTask = await TaskRepo.deleteTask(task);
  return new SuccessMsgDataResponse(deletedTask, "Task deleted successfully").send(
    res
  );
  
});

exports.updateTask = asyncHandler(async (req, res) => {

  const taskReq =await TaskRepo.findById(req.params.id);

  if (taskReq.owner.toString() !== req.user._id.toString()) {
      throw new UnauthorizedError("You are not allowed to update this task");
  }

  const task = await TaskRepo.findByIdAndUpdate( req.params.id, req.body);
  if (!task) {
    throw new NotFoundError("No task found with that id");
  }
  return new SuccessMsgDataResponse(task, "Task updated successfully").send(
    res
  );
  
});


exports.shareTask = asyncHandler(async (req, res) => {

  const taskReq =await TaskRepo.findById(req.params.id);

  if (taskReq.owner.toString() !== req.user._id.toString()) {
      throw new UnauthorizedError("You are not allowed to share this task");
  }

  const users = await UserRepo.find({ deletedAt: null,status: "active"});

  const task = await TaskRepo.findByIdAndAddReader(
    req.params.id,users
  );

  return new SuccessMsgDataResponse(task, "Task shared successfully").send(
    res
  );

});

exports.getSharedTasks = asyncHandler(async (req, res) => {

    
  const { page, perPage } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
  };
  const tasks = await TaskRepo.findByObjPaginate({readers: req.user._id}, options, req.query);
  if (!tasks) {
    return new SuccessMsgResponse("No tasks found").send(res);
  }
  const { docs, ...meta } = tasks;

  return new SuccessResponsePagination(docs, meta).send(res);
 
});




