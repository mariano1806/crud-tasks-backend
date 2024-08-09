import { createConnection } from "mysql2/promise";

export const conectar = async () => {
    try {
        const connection = await createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "tasks_db"
        })
        await connection.connect();
        console.log("conectado a la base de datos");
        return connection
    } catch (error) {
        console.log("error al conectar a la base de datos:", error);
    }
    
}