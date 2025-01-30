const { User } = require('../db/models'); // Путь к вашей модели User

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const ApiError = require('../error/ApiError');

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class Person {
  async registration(req, res, next){
        const {login, passwd, passwdAgain, phone} = req.body
        if(!(login && passwd && passwdAgain && phone)) {
           return res.status(401).json({message:'Введите все обязательные поля'})
        }
        if(!passwdAgain){
            return next(ApiError.badRequest("Повторно введите ваш пароль"))
        }
        const candidate = await User.findOne({
            where:{login}
        })
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
        }
        if(passwd === passwdAgain){
            const hashPasswd = await bcrypt.hash(passwd,5)
            const user = await User.create({
                 login, passwd:hashPasswd,phone })
            const token = generateJwt(user.id, user.login, user.role)
            return res.status(200).json({token})
        }
       else return res.status(403).json({message:'Пароли не совпадают'})
    }

    async login(req,res,next){
        const {login, passwd} = req.body
        if(passwd === undefined) return res.status(401).json({message:"Введите поле passwd"})
        if(!(login && passwd)) return res.status(401).json({message:'Введите логин и пароль'})
        if(!passwd) return res.status(402).json({message:'Введите пароль'})
        const user = await User.findOne({
            where:{login}
        })
        if(!user) return res.status(403).json({message:'Введен неверный логин или нет такого логина'})
        let comparePassword = bcrypt.compareSync(passwd, user.passwd)
        if(!comparePassword) return res.status(404).json({message:'Указан неверный пароль'})
       const token = generateJwt(user.id, user.login, user.role)
        return res.status(200).json({token})
    }
    async check(req,res,next){
         const token = generateJwt(req.user.id, req.user.login, req.user.role)
          if (token) return res.status(200).json({message: "ALL RIGHT" });
    }
     async changePasswd(req,res,next){
        const {login, passwd, newPasswd} = req.body
        if(passwd === newPasswd) return res.status(400).json({message:"Пароли совпадают"})
        if(req.body.login === req.user.login){
            const hashpasswd = await bcrypt.hash(newPasswd,5)
            await User.update({passwd:hashpasswd},{where:{login:req.params.login}})
            const response = await User.findOne({where:{login}})
            return res.status(200).json(response)
        }
        return res.status(404).json({message:"Вы вторгаетесь в чужой аккаунт"})
    }
  async createUser(req, res, next) {
    try {
      const userData = req.body;
      const newUser = await User.create(userData);
      res.status(201).json({ message: "Пользователь создан", user: newUser });
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: `Пользователь с ID ${id} не найден` });
      }
      res.status(200).json({ message: `Пользователь с ID ${id} найден`, user: user });
    } catch (error) {
      console.error("Ошибка при чтении пользователя:", error);
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: `Пользователь с ID ${id} не найден` });
      }
      const updatedUser = await user.update(updateData);
        res.status(200).json({ message: `Пользователь с ID ${id} обновлен`, user: updatedUser });
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: `Пользователь с ID ${id} не найден` });
      }
      await user.destroy();
      res.status(200).json({ message: `Пользователь с ID ${id} успешно удален` });
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json({ message: "Список всех пользователей", users: users });
    } catch (error) {
      console.error("Ошибка при получении всех пользователей:", error);
      next(error);
    }
  }
}
module.exports = new Person()