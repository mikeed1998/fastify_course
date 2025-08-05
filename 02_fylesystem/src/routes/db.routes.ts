import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { DbUsersController } from "../controllers/dbUsers.controller";


const dbRoutes = async (fastify: FastifyInstance) => {

    const dbUsersController = new DbUsersController();

    fastify.get('/users', dbUsersController.findAll);
    fastify.get('/users/:id', dbUsersController.findById);
    fastify.get('/users/zodiac/:zodiac_sign', dbUsersController.findManyByZodiacSign);
}


export default fastifyPlugin(dbRoutes);