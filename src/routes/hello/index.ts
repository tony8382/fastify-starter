import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";

const example: FastifyPluginAsync = async (fastify: FastifyInstance, opts: FastifyServerOptions): Promise<void> => {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return 'this is an GGGFFGG'
  })
}

export default example;
