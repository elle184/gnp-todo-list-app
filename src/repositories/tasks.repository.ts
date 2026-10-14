import { database } from "../database/database";

export class TasksRepository {
    findAll(completed? : boolean) {
        const query = `SELECT id, title, description, completed, created_at, updated_at FROM tasks`;

        return (undefined === completed) 
            ? database.prepare(query).all() 
            : database.prepare(query + " WHERE completed = ?").all(completed ? 1 : 0);
    }

    findById(id : number) {
        const query = `SELECT id, title, description, completed, created_at, updated_at FROM tasks`;

        return database.prepare(query).get(id);
    }

    persist(task : any) {
        const query = `INSERT INTO tasks (title, description, completed, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`;

        const now = new Date().toISOString();
        const result = database.prepare(query).run(task.title, task.description, task.completed ? 1 : 0, now, now);

        return this.findById(result.lastInsertRowid as number);  
    }

    merge(id : number, task : any) {
        const query = `UPDATE tasks SET title = ?, description = ?, completed = ?, updated_at = ? WHERE id = ?`;

        const now = new Date().toISOString();
        database.prepare(query).run(task.title, task.description, task.completed ? 1 : 0, now, id);

        return this.findById(id);
    }

    detach(id : number) {
        const query = `DELETE FROM tasks WHERE id = ?`;

        database.prepare(query).run(id);
    }
}