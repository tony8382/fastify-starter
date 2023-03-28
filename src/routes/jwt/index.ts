import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";

const example: FastifyPluginAsync = async (fastify: FastifyInstance, opts: FastifyServerOptions): Promise<void> => {
  fastify.post('/sign', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = fastify.jwt.sign({ payload: request.body })
    fastify.logger().info( "GGGGGGG: %s ", "123")

    return token
  })
  fastify.post('/verify', async (request: FastifyRequest, reply: FastifyReply) => {
    return "OK"
  })
}

export default example;
