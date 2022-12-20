const Joi = require('joi');
const { JoiObjectId } = require('../../../middlewares/schemaValidator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: The title of task
 *     CreateComment:
 *       type: object
 *       required:
 *         - content
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

exports.createComment = Joi.object({
  content: Joi.string().trim().min(3).max(255).required(),
});

