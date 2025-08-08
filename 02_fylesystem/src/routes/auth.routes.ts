import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { AuthController } from "../controllers/auth.controller";
import { PrismaClient } from "../generated/prisma";
import { renewTokenDocs } from "../docs/auth/renewToken..docs";
import { registerDocs } from "../docs/auth/register.docs";
import { loginDocs } from "../docs/auth/login.docs";


const authRoutes = async (fastify: FastifyInstance) => {

    const prisma = new PrismaClient();

    const authController = new AuthController();

    // fastify.post('/auth/signin', { onRequest: [fastify.signJWT] }, authController.signin);
    fastify.post(
        '/auth/renewToken', 
        { ... renewTokenDocs },
        async (request: FastifyRequest, reply: FastifyReply) => 
            authController.renewToken(request, reply, fastify),
    );

    fastify.post(
        '/auth/register', 
        { ... registerDocs },
        async (request: FastifyRequest, reply: FastifyReply, ) => 
            authController.register(request, reply, fastify)
    );
    
    fastify.post(
        '/auth/login', 
        { ... loginDocs },
        async (request: FastifyRequest, reply: FastifyReply) => 
            authController.login(request, reply, fastify)
    );

}

export default fastifyPlugin(authRoutes);