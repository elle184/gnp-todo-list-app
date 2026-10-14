import Database from "better-sqlite3";

export const database = new Database('todo-list.sqlite', { verbose: console.log });