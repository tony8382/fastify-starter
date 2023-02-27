import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";

type HelloRequest = FastifyRequest<{
  Params: { name: string }
}>

const example: FastifyPluginAsync = async (fastify: FastifyInstance, opts: FastifyServerOptions): Promise<void> => {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    request.log.debug(null, "GGGGGGG: %s ", "123")
    return 'this is an GGGFFGG'
  })
  fastify.get('/:name', async (request: HelloRequest, reply: FastifyReply) => {
    const { name } = request.params;

    request.log.info(null, "GGGGGGG: %s ", name)
    return {test:name}
  })
}

export default example;
