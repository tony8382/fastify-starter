import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";

const example: FastifyPluginAsync = async (fastify: FastifyInstance, opts: FastifyServerOptions): Promise<void> => {
  fastify.post('/sign', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = fastify.jwt.sign({ payload: request.body })
     return token
  })
  fastify.post('/verify', async (request: FastifyRequest, reply: FastifyReply) => {
    const token :string =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InRlc3RHR0ciOiJHR0dHRzEyMyJ9LCJpYXQiOjE2Nzc1ODcxMTR9.Ql_vyOMt3ddvX_ZtVnFE-_PEdh20UGvn1Vg3Q3sBtKU"

    const decoded = fastify.jwt.verify(token)

     return decoded
  })
}

export default example;
