import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";

const root: FastifyPluginAsync = async (fastify: FastifyInstance, opts: FastifyServerOptions): Promise<void> => {
  fastify.get('/', async function (request: FastifyRequest, reply: FastifyReply) {
    return { root: true }
  })
}

export default root;
