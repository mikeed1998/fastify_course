import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuid } from "uuid";
import { TaskEntity } from "../interfaces/task.interface";
import z from "zod";


export class TasksController {

    private tasks: TaskEntity[] = [
        {
            id: uuid(),
            title: "Task 1",
            description: 'Description 1',
            done: false
        },
        {
            id: uuid(),
            title: "Task 2",
            description: 'Description 2',
            done: true
        },
    ];

    findAll = async (request: FastifyRequest, reply: FastifyReply) => {
        reply.code(200);
        return { tasks: this.tasks, message: 'Tasks found successfully', ok: true };
    }

    private verifyBodyTaskEntity = (title: string, description: string) => {
        const Task = z.object({
            title: z.string().min(3),
            description: z.string().min(3)
        });

        Task.parse({ title, description });
    }

    create = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { title, description } = request.body as TaskEntity;

            this.verifyBodyTaskEntity(title, description);

            const newTask: TaskEntity = {
                id: uuid(),
                title,
                description,
                done: false
            };

            return newTask;
        } catch (error: any) {
            reply.code(400);
            return { message: JSON.parse(error.message), ok: false };
        }
    }

}