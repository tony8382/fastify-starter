import fp from 'fastify-plugin';

import { Counter } from 'prom-client';

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  })

  fastify.decorate('counter', function () {
    return new Counter({
      name: 'my_custom_metric',
      help: 'This is my custom metric'
    });
  })

})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
    counter(): Counter;
  }
}
