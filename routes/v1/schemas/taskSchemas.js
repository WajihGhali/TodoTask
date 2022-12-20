const Joi = require('joi');
const { JoiObjectId } = require('../../../middlewares/schemaValidator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of task
 *         description:
 *           type: string
 *           description: The description of task
 *         isCompleted:
 *           type: boolean
 *           description: Task status
 *     UpdateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of task
 *         description:
 *           type: string
 *           description: The description of task
 *         isCompleted:
 *           type: boolean
 *           description: Task status
 *     CreateTask:
 *       type: object
 *       required:
 *         - title
 *         - description 
 *         - isCompleted 
 *       properties:
 *         title:
 *           type: string
 *           description: The task title
 *         description:
 *           type: string
 *           description: The description title
 *         isCompleted:
 *           type: boolean
 *           description: The status of task completed or not
 */

exports.createTask = Joi.object({
  title: Joi.string().trim().min(3).max(30).required(),
  description: Joi.string().trim().min(3).max(255).required(),
  isCompleted: Joi.boolean(),
});

exports.updateTask = Joi.object({
  title: Joi.string().trim().min(3).max(30).optional(),
  description: Joi.string().trim().min(3).max(255).optional(),
  isCompleted: Joi.boolean(),
});

exports.getTasks = Joi.object({
  title: Joi.string().trim().min(3).max(30).optional(),
  description: Joi.string().trim().min(3).max(255).optional(),
  isCompleted: Joi.boolean(),
  deleted: Joi.boolean().optional(),
  page: Joi.number().optional(),
  perPage: Joi.number().optional(),
  search: Joi.string().optional(),
  sort: Joi.string().optional(),
});

exports.checkTaskId = Joi.object({
  id: JoiObjectId().required(),
});
