const express = require('express');
const {
    login,
    processLogin,
    register,
    createRegister,
    adminPanel,
    profile,
    update,
    remove,
    updatePassword,
    logout,
} = require('../controllers/usersController');
const loginValidator = require('../validations/loginValidator');
const profileValidator = require('../validations/profileValidator');

const passwordValidator = require('../validations/passwordValidator');

const registerValidator = require('../validations/registerValidator');
const userCheck = require('../middlewares/userCheck');
const adminCheck = require('../middlewares/adminCheck');
const notUserCheck = require('../middlewares/notUserCheck');
const uploadUser = require('../middlewares/uploadUser');
const router = express.Router();

/* Users */
router
    .get('/login', notUserCheck, login)
    .post('/login', loginValidator, processLogin)
    .get('/register', register)
    .post('/register', registerValidator, createRegister)
    .get('/admin', adminCheck, adminPanel)
    .get('/profile/:id', userCheck, profile)
    .put(
        '/update/:id',
        uploadUser.single('avatar'),
        profileValidator,
        userCheck,
        update
    )
    .put('/update-password/:id', passwordValidator, updatePassword)
    .delete('/delete/:id', remove)
    .get('/logout', logout);

module.exports = router;
