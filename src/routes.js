import { Router } from "express";

const tasksRouter = Router()

import {    
    getTaskById,
    getTasks,
    createTask,
    updateTask,
    deleteTask} from "./controllers.js";

tasksRouter.get('/tasks', getTasks);
tasksRouter.get('/tasks/:id', getTaskById);
tasksRouter.post('/tasks', createTask);
tasksRouter.put('/tasks/:id', updateTask);
tasksRouter.delete('/tasks/:id', deleteTask);

export { tasksRouter };