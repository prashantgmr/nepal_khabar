const express = require('express');
const router = express.Router();
const { getUser, addUser, deleteUser ,getCurrentUser} = require('../controller/userController');

router
  .route('/')
  .post(addUser);

router
  .route('/:id')
  .get(getCurrentUser)
  .delete(deleteUser);

module.exports = router;