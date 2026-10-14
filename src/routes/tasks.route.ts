import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { TasksController } from '../controllers/tasks.controller';
import { CreateTaskSchema, UpdateTaskSchema, TaskResponseSchema } from '../schemas/tasks.schema';

const controller = new TasksController();
const tasks = new OpenAPIHono();

const getTasksRoute = createRoute({
    method : "get",
    path : "/tasks",
    tags : ["Tasks"],
    responses : {
        200 : {
            description : "A full list of tasks",
            content : {
                "application/json" : {
                    schema : TaskResponseSchema.array()
                }
            }
        }
    }
});

tasks.openapi(getTasksRoute, (c) => {
    const taskList = controller.getAll(
        c.req.query("completed") === "true"
    ) as z.infer<typeof TaskResponseSchema>[];

    return c.json(taskList, 200);
});

const getTaskByIdRoute = createRoute({
    method : "get",
    path : "/tasks/{id}",
    tags : ["Tasks"],
    responses : {
        200 : {
            description : "A full information about a task",
            content : {
                "application/json" : {
                    schema : TaskResponseSchema
                }
            }
        },
        404 : {
            description : "Task not found",
            content : {
                "application/json" : {
                    schema : TaskResponseSchema.omit({
                        id : true,
                        title : true,
                        completed : true,
                        created_at : true,
                        updated_at : true
                    }).extend({
                        message : z.string().default("Task not found")
                    })
                }
            }
        }
    }
});

tasks.openapi(getTaskByIdRoute, (c) => {
    const taskId = parseInt(c.req.param("id"));
    const task = controller.getById(taskId) as z.infer<typeof TaskResponseSchema>;

    if (!task) {
        return c.json({ message : "Task not found" }, 404);
    }

    return c.json(task, 200);
});

const createTaskRoute = createRoute({
    method : "post",
    path : "/tasks",
    tags : ["Tasks"],
    requestBody : {
        description : "Task to create",
        required : true,
        content : {
            "application/json" : {
                schema : CreateTaskSchema as any
            }
        }
    },
    responses : {
        201 : {
            description : "Task created successfully",
            content : {
                "application/json" : {
                    schema : TaskResponseSchema
                }
            }
        },
        400 : {
            description : "Invalid request body",
            content : {
                "application/json" : {
                    schema : TaskResponseSchema.omit({
                        id : true,
                        title : true,
                        completed : true,
                        created_at : true,
                        updated_at : true
                    }).extend({
                        message : z.string().default("Invalid request body")
                    })
                }
            }
        }
    }
});

tasks.openapi(createTaskRoute, async (c) => {
    const taskData = await c.req.json() as z.infer<typeof CreateTaskSchema>;
    const newTask = controller.create(taskData) as z.infer<typeof TaskResponseSchema>;

    return c.json(newTask, 201);
});

const updateTaskRoute = createRoute({
    method : "put",
    path : "/tasks/{id}",
    tags : ["Tasks"],
    requestBody : {
        description : "Task to update",
        required : true,
        content : {
            "application/json" : {
                schema : UpdateTaskSchema as any
            }
        }
    },
    responses : {
        200 : {
            description : "Task updated successfully",
            content : {
                "application/json" : {
                    schema : TaskResponseSchema
                }
            }
        },
        400 : {
            description : "Invalid request body",
            content : {
                "application/json" : {
                    schema : TaskResponseSchema.omit({
                        id : true,
                        title : true,
                        completed : true,
                        created_at : true,
                        updated_at : true
                    }).extend({
                        message : z.string().default("Invalid request body")
                    })
                }
            }
        },
        404 : {
            description : "Task not found",
            content : {
                "application/json" : {
                    schema : TaskResponseSchema.omit({
                        id : true,
                        title : true,
                        completed : true,
                        created_at : true,
                        updated_at : true
                    }).extend({
                        message : z.string().default("Task not found")
                    })
                }
            }
        }
    }
});

tasks.openapi(updateTaskRoute, async (c) => {
    const taskId = parseInt(c.req.param("id"));
    const taskData = await c.req.json() as z.infer<typeof UpdateTaskSchema>;
    const updatedTask = controller.update(taskId, taskData) as z.infer<typeof TaskResponseSchema>;

    if (!updatedTask) {
        return c.json({ message : "Task not found" }, 404);
    }

    return c.json(updatedTask, 200);
});

const deleteTaskRoute = createRoute({
    method : "delete",
    path : "/tasks/{id}",
    tags : ["Tasks"],
    responses : {
        204 : {
            description : "Task deleted successfully"
        },
        404 : {
            description : "Task not found",
            content : {
                "application/json" : {
                    schema : TaskResponseSchema.omit({
                        id : true,
                        title : true,
                        completed : true,
                        created_at : true,
                        updated_at : true
                    }).extend({
                        message : z.string().default("Task not found")
                    })
                }
            }
        }
    }
});

tasks.openapi(deleteTaskRoute, (c) => {
    const taskId = parseInt(c.req.param("id"));
    const deleted = controller.delete(taskId) as boolean | undefined;

    if (!deleted) {
        return c.json({ message : "Task not found" }, 404);
    }

    return c.body(null, 204);
});

export default tasks;