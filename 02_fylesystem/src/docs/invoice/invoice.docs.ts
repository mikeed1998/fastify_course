import { RouteShorthandOptions } from "fastify";


export const invoiceDocs: RouteShorthandOptions = {
    schema: {
        summary: 'Invoice Report PDF',
        description: 'Invoice Report PDF',
        tags: ['PDF', 'Auth Routes'],
        headers: {
            type: 'object',
            properties: {
                authorization: {
                    type: 'string',
                    description: 'Bearer Token',
                },
            },
        },
        response: {
            200: {

            },
            401: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Message',
                        example: 'Email or Password Invalid',
                    },
                },
            },
            500: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Message',
                        example: 'Password must be at leat 8 characters long',
                    },
                },
            },
        },
    },
};