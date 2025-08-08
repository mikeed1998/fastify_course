import fastify from "fastify";
import fsRoutes from "./routes/fs.routes";
import { FsMiddleware } from "./middleware/fs.middleware";
import reportsRoutes from "./routes/reports.routes";
import dbRoutes from "./routes/db.routes";
import mailRoutes from "./routes/mail.routes";
import authPlugin from "./plugins/auth.plugin";
import pgPlugin from "./plugins/pgPlugin";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import authRoutes from "./routes/auth.routes";


const _fastify = fastify({ logger: true });
// _fastify.register(pgPlugin);

const start = async () => {
    try {

        // await _fastify.register(fastifyEnv, {
        //     dotenv: true,
        //     schema: {},
        // });

        await _fastify.register(fastifySwagger);
        await _fastify.register(fastifySwaggerUi, {
            routePrefix: '/docs',
            uiConfig: {
                docExpansion: 'list',
                deepLinking: false
            },
            uiHooks: {
                onRequest: function(request, reply, next) {
                    next();
                },
                preHandler: function(request, reply, next) {
                    next();
                },
            },
            staticCSP: true,
            transformStaticCSP: (header) => header,
            transformSpecification: (
                swaggerObject,
                request,
                reply
            ) => {
                return swaggerObject;
            },
            transformSpecificationClone: true,
        });

        _fastify.register(fastifyJwt, {
            secret: process.env.JWT_SECRET,
        } as any);

        _fastify.register(pgPlugin);
        _fastify.register(authPlugin);

        _fastify.addHook('onRequest', FsMiddleware.verifyIsExistFilesDir);

        _fastify.register(fsRoutes, {
            prefix: '/fs'
        });

        _fastify.register(reportsRoutes, {
            prefix: '/reports'
        });

        _fastify.register(mailRoutes, {
            prefix: '/mail'
        });

        _fastify.register(authRoutes, {
            prefix: '/auth'
        });


        _fastify.register(dbRoutes, {
            prefix: '/db'
        });

        await _fastify.listen({ port: 3000 });
        _fastify.log.info("App listening on port 3000")
    } catch (error) {
        _fastify.log.error(error);
    }
}

start();


