import fastify, { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";


export const pingRoute = async (fastify: FastifyInstance) => {

    fastify.get('/ping', async (request, reply) => {
        // reply.code(200);
        const params = request;
        // return { params: { query: params.query, ip: params.ip, ips: params.ips, hostname: params.hostname, url: params.url, } };
        // return { params: { headers: params.headers, method: params.method } };
        return { message: "pong", query: params.query }
    });


    fastify.post('/ping', async (request, reply) => {
        const body = request.body;
        return { message: 'pong', body, headers: request.headers }
    });


    fastify.patch('/ping', async (request, reply) => {
        return { message: 'pong' }
    });


    fastify.delete('/ping', async (request, reply) => {
        return { message: 'pong' }
    });

}

export default fastifyPlugin(pingRoute);