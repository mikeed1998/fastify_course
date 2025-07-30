import fastify from "fastify";
import fsRoutes from "./routes/fs.routes";
import { FsMiddleware } from "./middleware/fs.middleware";
import reportsRoutes from "./routes/reports.routes";


const _fastify = fastify({ logger: true });

_fastify.addHook('onRequest', FsMiddleware.verifyIsExistFilesDir);

_fastify.register(fsRoutes, {
    prefix: '/fs'
});

_fastify.register(reportsRoutes, {
    prefix: '/reports'
});

const start = async () => {
    try {
        await _fastify.listen({ port: 3000 });
        _fastify.log.info("App listening on port 3000")
    } catch (error) {
        _fastify.log.error(error);
    }
}

start();


