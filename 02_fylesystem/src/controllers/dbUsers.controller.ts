import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "../generated/prisma";
import { FindUserByIdParams, FindUsersByZodiacSignParams } from "../interfaces/request/findUserById.interface";


export class DbUsersController {

    private readonly prisma: PrismaClient = new PrismaClient();

    findAll = async (
        req: FastifyRequest, 
        reply: FastifyReply
    ) => {
        const users = await this.prisma.users.findMany({
            take: 10
        });

        const response = {
            users,
            count: users.length
        };

        return reply.send(response);
    }

    findById = async (
        req: FastifyRequest, 
        reply: FastifyReply
    ) => {
        const { id } = req.params as FindUserByIdParams;

        const user = await this.prisma.users.findUnique({
            where: {
                id,
            }
        });

        return reply.send(id);
    }

    findManyByZodiacSign = async (
        req: FastifyRequest, 
        reply: FastifyReply
    ) => {
        const { zodiac_sign } = req.params as FindUsersByZodiacSignParams;

        const users = await this.prisma.users.findMany({
            where: {
                zodiac_sign,
            },
            take: 30
        });

        return reply.send({ count: users.length, users });
    }
}