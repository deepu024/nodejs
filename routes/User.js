const express = require("express");
const { GetUsers, GetUserById, CreateUser, UpdateUser, DeleteUser, } = require("../controllers/User.controller");

const router = express.Router();

router.get('/user', GetUsers);

router.get('/user/:id', GetUserById);

router.post('/user', CreateUser);

router.put('/user/:id', UpdateUser);

router.delete('/user/:id', DeleteUser);

module.exports = router;
