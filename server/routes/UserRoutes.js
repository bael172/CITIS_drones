const express = require('express');
const router = express.Router();
const personQueries = require('../queries/UserQueries'); // Путь к вашему файлу с классом Person
const checkToken = require('../secutiry/checkTocken')

// Роут для регистрации
router.post('/registration', personQueries.registration);
// Роут для авторизации
router.post('/login', personQueries.login);
// Роут для проверки авторизации
router.get('/auth', checkToken, personQueries.check);
// Роут для смены пароля
router.post('/changePasswd', checkToken, personQueries.changePasswd)

// Роут для создания пользователя
router.post('/users', personQueries.createUser);
// Роут для получения пользователя по ID
router.get('/users/:id', personQueries.getUserById);
// Роут для обновления пользователя
router.put('/users/:id', personQueries.updateUser);
// Роут для удаления пользователя
router.delete('/users/:id', personQueries.deleteUser);
// Роут для получения всех пользователей
router.get('/users', personQueries.getAllUsers);