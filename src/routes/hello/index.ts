import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";

type HelloRequest = FastifyRequest<{
  Params: { name: string },
  Querystring: {
    test: string,
    test2: string
  }
}>

const example: FastifyPluginAsync = async (fastify: FastifyInstance, opts: FastifyServerOptions): Promise<void> => {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    request.log.debug(null, "GGGGGGG: %s ", "123")
    return 'this is an GGGFFGG'
  })
  fastify.get('/:name', async (request: HelloRequest, reply: FastifyReply) => {
    const { name } = request.params;
    const { test, test2 } = request.query;

    request.log.info("GGGGGGG: %s, test:%s, test2:%s ", name, test, test2)
    return {
      name,
      test,
      test2
    }
  })
}

export default example;
