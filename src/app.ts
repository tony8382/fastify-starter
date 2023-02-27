import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { join } from 'path';
import fastifyMetric from 'fastify-metrics'
import customHealthCheck from 'fastify-custom-healthcheck'
import fastifyGracefulShutdown from 'fastify-graceful-shutdown'

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;


// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify: FastifyInstance,
  opts: AppOptions
): Promise<void> => {
  // Place here your custom code!

  fastify.register(fastifyMetric, { endpoint: '/metrics' })
  fastify.register(customHealthCheck, { path: '/health' })
  fastify.register(fastifyGracefulShutdown)

  fastify.after(() => {
    fastify.gracefulShutdown((signal, next) => {
      fastify.log.info("shout down!")
      next()
    })
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app, options }
