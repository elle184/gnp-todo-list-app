import { TasksRepository } from "../repositories/tasks.repository";

const repository = new TasksRepository();

export class TasksService {
    getAll(completed? : boolean) {
        return repository.findAll(completed);
    }

    getById(id : number) {
        return repository.findById(id);
    }

    create(task : any) {
        return repository.persist(task);
    }

    update(id : number, task : any) {
        return repository.merge(id, task);
    }

    delete(id : number) {
        return repository.detach(id);
    }
}