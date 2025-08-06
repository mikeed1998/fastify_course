import { FastifyReply, FastifyRequest } from "fastify";
import jwt from '@fastify/jwt';


export class AuthController {
    
    private jwt = jwt;

    signin = async (
        request: FastifyRequest, 
        reply: FastifyReply
    ) => {

        

        return {
            message: 'Signin route',
        }
    }

}