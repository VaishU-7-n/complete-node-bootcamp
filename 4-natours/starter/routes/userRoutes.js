const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUsers);

router
    .route('/:id')
    .patch(userController.updateUser)
    .get(userController.getUser)
    .delete(userController.deleteUser);

module.exports = router;
