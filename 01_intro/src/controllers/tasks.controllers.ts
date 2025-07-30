import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuid } from "uuid";
import { CreateTaskDatasourceEntity, FindByIdTaskEntity, TaskEntity } from "../interfaces/task.interface";
import z from "zod";
import { TasksAdapter } from "../adapters/tasks.adapter";


export class TasksController {

    private tasks: TaskEntity[] = [
        {
            id: "b602f33f-685c-4f8b-bedd-b6328fcbeb25",
            title: "Task 1",
            description: 'Description 1',
            done: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: uuid(),
            title: "Task 2",
            description: 'Description 2',
            done: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ];

    findAll = async (request: FastifyRequest, reply: FastifyReply) => {
        reply.code(200);
        return { 
            tasks: this.tasks,
            length: this.tasks.length, 
            message: 'Tasks found successfully', 
            ok: true 
        };
    }

    finOneById = async (request: FastifyRequest, reply: FastifyReply) => {
        
        const { id } = request.params as FindByIdTaskEntity;

        const task = this.tasks.find((task) => task.id === id);

        if(!task) {

            reply.code(404);

            return {
                message: 'Task not found',
                ok: false
            }
        }

        reply.code(200);
        
        return { 
            task,
            message: 'Tasks found successfully', 
            ok: true 
        };
    }

    private verifyBodyTaskEntity = (datasource: CreateTaskDatasourceEntity) => {
        const Task = z.object({
            title: z.string().min(3),
            description: z.string().min(3)
        });

        Task.parse(datasource);
    }

    create = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { title, description } = request.body as CreateTaskDatasourceEntity;

            this.verifyBodyTaskEntity({ title, description });

            const newTask = TasksAdapter.datasourceCreateEntity({ 
                title, 
                description 
            });

            this.tasks.push(newTask);

            return newTask;
        } catch (error: any) {
            reply.code(400);
            return { message: JSON.parse(error.message), ok: false };
        }
    }

    update = async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as FindByIdTaskEntity;
        const { title, description } = request.body as CreateTaskDatasourceEntity;

        let task = this.tasks.find((task) => task.id === id);

        if(!task) {
            reply.code(404);

            return {
                message: 'Task not found',
                ok: false
            };
        }

        task = TasksAdapter.updateEntity({
            ... task,
            title: title || task.title,
            description: description || task.description
        });
        
        this.tasks = [ ... this.tasks.filter((task) => task.id !== id), task ];

        return task;
    }

}