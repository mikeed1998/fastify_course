import fastify from "fastify";


const app = fastify({
    logger: true
});

const start = async() => {

    try {
        await app.listen({ port: 3000 });
    } catch(error) {
        console.log(error);
    }

}

start();
