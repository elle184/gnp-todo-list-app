import { TasksService } from '../services/tasks.service';

const service = new TasksService();

export class TasksController {
    getAll(completed? : boolean) {
        return service.getAll(completed);
    }

    getById(id : number) {
        return service.getById(id);
    }

    create(task : any) {
        return service.create(task);
    }

    update(id : number, task : any) {
        return service.update(id, task);
    }

    delete(id : number) {
        return service.delete(id);
    }
}