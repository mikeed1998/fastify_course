import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from '@fastify/jwt';
import { RegisterUserRequest } from "../interfaces/request/registerUser.interface";
import { PrismaClient } from "../generated/prisma";
import bcrypt from 'bcrypt';


export class AuthController {

    private prisma = new PrismaClient();

    renewToken = async (
        request: FastifyRequest, 
        reply: FastifyReply,
        fastify: FastifyInstance
    ) => {

        const { authorization } = request.headers;
        
        if(!authorization) {
            return reply.code(401).send({
                message: 'Token is required',
            });
        }
        
        const token = authorization.split(" ")[1];
        const currentToken = fastify.jwt.verify(token) as any;
        const renewedToken = fastify.jwt.sign(
            {
                uid: currentToken.id,
                username: currentToken.username,
                email: currentToken.email, 
            },
            {
                expiresIn: '1h',
            },
        );
        
        return {
            token: renewedToken,
            user: {
                uid: currentToken.uid,
                username: currentToken.username,
                email: currentToken.email
            },
        };    
    }

    register = async (
        request: FastifyRequest,
        reply: FastifyReply,
        fastify: FastifyInstance
    ) => {
        try {
            const { 
                first_name,
                last_name,
                email,
                password
            } = request.body as RegisterUserRequest;
        
            if(password.length < 8) {
                return reply.code(400).send({ message: 'Password must be at leat 8 characters long' });
            }
        
            const hashPassword = bcrypt.hashSync(password, 12);
        
            const user = await this.prisma.users.create({
                data: {
                    first_name,
                    last_name,
                    country: 'MX',
                    email,
                    favorite_color: 'blue',
                    followers: 100,
                    username: `${first_name}_${last_name}`,
                    website: 'https://michcvdev.com',
                    zodiac_sign: 'cancer',  
                    password: hashPassword
                },
            });
        
            const payload = {
                uid: user.id,
                username: user.username,
                email: user.email
            };
        
            const token = fastify.jwt.sign(payload, {
                expiresIn: '1h'
            });
        
            return reply.send({ token, user: payload });
        } catch (error: any) {
            return reply.status(500).send({ message: error.message });
        }
    }

    login = async (
        request: FastifyRequest,
        reply: FastifyReply,
        fastify: FastifyInstance
    ) => {
        try {
            const { email, password } = request.body as RegisterUserRequest;

            const user = await this.prisma.users.findFirst({
                where: {
                    email,
                }
            });

            if(!user) {
                return reply.code(401).send({ message: 'Invalid Credentials' });
            }

            const validPassword = bcrypt.compareSync(
                password,
                user.password!
            );

            if(!validPassword) {
                return reply.code(401).send({ message: 'Email or Password is Invalid' });
            }

            const payload = {
                uid: user.id,
                username: user.username,
                email: user.email
            };

            const token = fastify.jwt.sign(payload, {
                expiresIn: '1h'
            });

            return reply.send({ token, user: payload });
        } catch (error: any) {
            return reply.status(500).send({ message: error.message });
        }
    }

}