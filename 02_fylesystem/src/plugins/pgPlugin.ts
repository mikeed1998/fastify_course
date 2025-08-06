import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { PrismaClient } from "../generated/prisma";


declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const pgPlugin: FastifyPluginAsync = async (
  fastify: FastifyInstance, 
  options: any
) => {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    fastify.log.info('Connected to the database');

    // Decora Fastify con la instancia de Prisma
    fastify.decorate('prisma', prisma);

    // Maneja la desconexión al cerrar la aplicación
    fastify.addHook('onClose', async (instance) => {
      await instance.prisma.$disconnect();
      fastify.log.info('Disconnected from database');
    });

  } catch (error) {
    fastify.log.error('Database connection error:', error);
    throw error; // Propaga el error para que Fastify lo maneje
  }
};

export default fastifyPlugin(pgPlugin);



// import { FastifyInstance, FastifyPlugin, FastifyPluginCallback, FastifyPluginOptions } from "fastify";
// import fastifyPlugin from "fastify-plugin"
// import { PrismaClient } from "../generated/prisma";


// export const pgPlugin = (
//     fastify: FastifyInstance, 
//     options: FastifyPluginOptions, 
//     done: (err?: Error) => void
// ) => {

//     const prisma = new PrismaClient();

//     fastify.addHook('onRequest', () => {
//         prisma
//             .$connect()
//             .then(() => {
//                 console.log('Connection success');
//             })
//             .catch(() => {
//                 console.log('Connection error');
//             });
//     }); 

//     fastify.addHook('onClose', (_, done: any) => {
//         prisma
//             .$disconnect()
//             .then(() => {
//                 console.log('disconnect success');
//                 done();
//             })
//             .catch(() => {
//                 console.log('disconnect error');
//                 done();
//             });
//     });

//     done();
// }

// export default fastifyPlugin(pgPlugin);