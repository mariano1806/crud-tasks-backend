import { conectar } from "./database.js";
import express from 'express';

const app = express();
const pool = conectar();

app.use(express.json());

export const getTasks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
};

export const createTask = async (req, res) => {
    const { title, description, isComplete } = req.body;
    if (!title || typeof title !== 'string' || title.length > 255) {
        return res.status(400).json({ error: 'Título inválido' });
    }
    if (!description || typeof description !== 'string') {
        return res.status(400).json({ error: 'Descripción inválida' });
    }
    if (typeof isComplete !== 'boolean') {
        return res.status(400).json({ error: 'isComplete inválido' });
    }
    try {
        const [result] = await pool.query('INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)', [title, description, isComplete]);
        res.status(201).json({ mensaje: 'Tarea creada exitosamente', idTarea: result.insertId });
    } catch (err) {
        console.error('Error al insertar en la base de datos:', err);
        res.status(500).json({ error: 'Error al insertar en la base de datos' });
    }
};

export const updateTask = async (req, res) => {
    const { title, description, isComplete } = req.body;
    if (title && (typeof title !== 'string' || title.length > 255)) {
        return res.status(400).json({ error: 'Título inválido' });
    }
    if (description && typeof description !== 'string') {
        return res.status(400).json({ error: 'Descripción inválida' });
    }
    if (isComplete !== undefined && typeof isComplete !== 'boolean') {
        return res.status(400).json({ error: 'isComplete inválido' });
    }
    try {
        const [result] = await pool.query('UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?', [title, description, isComplete, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ mensaje: 'Tarea actualizada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la base de datos' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ mensaje: 'Tarea eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar de la base de datos' });
    }
};