import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().max(255).min(2),
    description: z.string().max(255).optional()
});

export const UpdateTaskSchema = z.object({
    title: z.string().max(255).min(2),
    description: z.string().max(255).optional(),
    completed: z.boolean().default(false)
});

export const TaskResponseSchema = z.object({
    id: z.number().optional(),
    title: z.string().max(255).min(2),
    description: z.string().max(255).optional(),
    completed: z.boolean().default(false),
    created_at: z.string(),
    updated_at: z.string()
});