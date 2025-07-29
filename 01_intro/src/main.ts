import fastify from "fastify";
import pingRoutes from "./routes/ping.routes";
import tasksRoutes from "./routes/tasks.routes";


const _fastify = fastify({
    logger: true
});

_fastify.register(pingRoutes);
_fastify.register(tasksRoutes);

const start = async() => {

    try {
        await _fastify.listen({ port: 3000 });

        // _fastify.log.info(`Server listening on port 3000`);
        // console.log('first');
        _fastify.log.error('Server listening on port 3000');

    } catch(error) {
        _fastify.log.error(error);
    }

}

start();
