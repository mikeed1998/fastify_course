
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { TasksController } from './../controllers/tasks.controllers';

const tasksRoutes = async (fastify: FastifyInstance) => {

    // fastify.get('/tasks', async (request, reply) => {
    //     return { message: 'tasks' };
    // });

    const tasksController = new TasksController();

    fastify.get('/tasks', tasksController.findAll);
    fastify.post('/tasks', tasksController.create);

}

export default fastifyPlugin(tasksRoutes);