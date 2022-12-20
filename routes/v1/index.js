const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
