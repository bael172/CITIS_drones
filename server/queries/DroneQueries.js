const { Drone } = require('../db/models');
class Queries {
    async createDrone(req, res, next) {
        try {
            const droneData = req.body;
            const newDrone = await Drone.create(droneData);
            res.status(201).json({ message: "Дрон создан", drone: newDrone });
        } catch (error) {
            console.error("Ошибка при создании дрона:", error);
            next(error);
        }
    }

    async getDroneById(req, res, next) {
        try {
            const id = req.params.id;
            const drone = await Drone.findByPk(id);
            if (!drone) {
                return res.status(404).json({ message: `Дрон с ID ${id} не найден` });
            }
            res.status(200).json({ message: `Дрон с ID ${id} найден`, drone: drone });
        } catch (error) {
            console.error("Ошибка при чтении дрона:", error);
            next(error);
        }
    }

    async updateDrone(req, res, next) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const drone = await Drone.findByPk(id);
            if (!drone) {
                return res.status(404).json({ message: `Дрон с ID ${id} не найден` });
            }
            const updatedDrone = await drone.update(updateData);
            res.status(200).json({ message: `Дрон с ID ${id} обновлен`, drone: updatedDrone });
        } catch (error) {
            console.error("Ошибка при обновлении дрона:", error);
            next(error);
        }
    }

    async deleteDrone(req, res, next) {
        try {
            const id = req.params.id;
            const drone = await Drone.findByPk(id);
            if (!drone) {
                return res.status(404).json({ message: `Дрон с ID ${id} не найден` });
            }
            await drone.destroy();
            res.status(200).json({ message: `Дрон с ID ${id} успешно удален` });
        } catch (error) {
            console.error("Ошибка при удалении дрона:", error);
            next(error);
        }
    }

    async getAllDrones(req, res, next) {
        try {
            const drones = await Drone.findAll();
            res.status(200).json({ message: "Список всех дронов", drones: drones });
        } catch (error) {
            console.error("Ошибка при получении всех дронов:", error);
            next(error);
        }
    }
}
module.exports = new Queries();