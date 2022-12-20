const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");
const authController = require("../../controllers/authController");
const commentController = require("../../controllers/commentController");
const {
  createTask,
  updateTask,
  getTasks,
  checkTaskId
} = require("./schemas/taskSchemas");
const { schemaValidator } = require("../../middlewares/schemaValidator");
const { createComment } = require("./schemas/commentSchema");


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns the list of all the tasks
 *     tags: [Task]
 *     parameters:
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *        - in: query
 *          name: description
 *          schema:
 *            type: string
 *        - in: query
 *          name: isCompleted
 *          schema:
 *            type: boolean
 *        - in: query
 *          name: deleted
 *          schema:
 *            type: string
 *        - in: query
 *          name: sort
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

 router.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  schemaValidator(getTasks, "query"),
  taskController.getTasks
);


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Task Creation
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/CreateTask'
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Task creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 *
 */

 router.post(
  "/",
  authController.protect,
  schemaValidator(createTask),
  taskController.createTask
);


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: update one task by id
 *     tags: [Task]
 *     parameters:
 *      - in: path
 *        name: id
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

 router.put(
  "/:id",
//   authController.protect,
//   authController.restrictTo("admin"),
  schemaValidator(checkTaskId, "params"),
  schemaValidator(updateTask),
  taskController.updateTask
);


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: delete one task by id
 *     tags: [Task]
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

 router.delete(
  "/:id",
  authController.protect,
  // authController.restrictTo("admin"),
  schemaValidator(checkTaskId, "params"),
  taskController.deleteTask
);

/**
 * @swagger
 * /tasks/{id}/comment:
 *   put:
 *     summary: update one task by id
 *     tags: [Task]
 *     parameters:
 *      - in: path
 *        name: id
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/CommentTask'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

 router.put(
  "/:id/comment",
  authController.protect,
  schemaValidator(checkTaskId, "params"),
  schemaValidator(createComment),
  commentController.createComment
);


/**
 * @swagger
 * /tasks/{id}/share:
 *   patch:
 *     summary: update one task by id
 *     tags: [Task]
 *     parameters:
 *      - in: path
 *        name: id
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/CommentTask'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

 router.put(
  "/:id/share",
  authController.protect,
  schemaValidator(checkTaskId, "params"),
  taskController.shareTask
);

/**
 * @swagger
 * /tasks/shared/me:
 *   get:
 *     summary: Returns the list of all the tasks shared to me
 *     tags: [Task]
 *     parameters:
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *        - in: query
 *          name: description
 *          schema:
 *            type: string
 *        - in: query
 *          name: isCompleted
 *          schema:
 *            type: boolean
 *        - in: query
 *          name: deleted
 *          schema:
 *            type: string
 *        - in: query
 *          name: sort
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

 router.get(
  "/shared/me",
  authController.protect,
  schemaValidator(getTasks, "query"),
  taskController.getSharedTasks
);



module.exports = router;
