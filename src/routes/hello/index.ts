import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest, FastifyServerOptions, RouteShorthandOptions } from "fastify";
import { Type } from '@sinclair/typebox'

type HelloRequest = FastifyRequest<{
  Params: { name: string },
  Querystring: {
    test: string,
    test2: string
  }
}>
type HelloSubmitRequest = FastifyRequest<{
  Body: HelloSubmitRequestBody
}>
type HelloSubmitRequestBody = {
  test: string
}

const schemaByTypebox = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  status: Type.String()
})

const routeOptions: RouteShorthandOptions = {
  schema: {
    body: schemaByTypebox
  }
}

const example: FastifyPluginAsync = async (fastify: FastifyInstance, opts: FastifyServerOptions): Promise<void> => {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    request.log.info(null, "GGGGGGG: %s ", "123")
    fastify.counter().inc()
    return 'this is an GGGFFGG'
  })

  fastify.post('/validate', routeOptions, async (request: FastifyRequest, reply: FastifyReply) => {
    // request.log.info("BODY INFO: %j ", request.body)
    return 'this is an GGGFFGG'
  })

  fastify.get('/:name', async (request: HelloRequest, reply: FastifyReply) => {
    const { name } = request.params;
    const { test, test2 } = request.query;
    // request.log.info("AAA: %s", fastify.someSupport())
    // request.log.info("GGGGGGG: %s, test:%s, test2:%s ", name, test, test2)
    return {
      name,
      test,
      test2
    }
  })
  fastify.post('/submit', async (request: HelloSubmitRequest, reply: FastifyReply) => {
    // const body: HelloSubmitRequestBody = request.body
    // request.log.info("Submit: %s", JSON.stringify(body))
    return {
      ok: true
    }
  })
}

export default example;
