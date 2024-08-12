const express = require("express");
const upload = require("../utils")
const { GetUsers, GetUserById, CreateUser, UpdateUser, DeleteUser, } = require("../controllers/User.controller");

const router = express.Router();

router.get('/user', GetUsers);

router.get('/user/:id', GetUserById);

router.post('/user', upload.single('profilePhoto'), CreateUser);

router.put('/user/:id', UpdateUser);

router.delete('/user/:id', DeleteUser);

module.exports = router;
