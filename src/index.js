import express from 'express';
import { conectar } from './database.js';
import { tasksRouter } from './routes.js';

const app = express();

// Conectar a la base de datos
conectar()
.then(() => {
    console.log('Conectado a la base de datos');

    // Configuración del servidor
    app.use(express.text());
    app.use(express.json());
    app.use('/tasks', tasksRouter);

    app.listen(3000, () => {
        console.log('Servidor corriendo en el puerto 3000');
    });
})
.catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});
