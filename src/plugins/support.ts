import fp from 'fastify-plugin';

import { Counter } from 'prom-client';
import winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  })

  // Register a custom metric
  const counter: Counter = new Counter({
    name: 'my_custom_metric',
    help: 'This is my custom metric'
  });

  const myFormat = printf(info => `${info.timestamp} [${info.level}] [${info.label}] - ${info.message}`);

  const logger: winston.Logger = winston.createLogger({
    level: 'info',
    // 設定輸出格式
    format: combine(
      label({ label: "G" }),
      timestamp(),
      myFormat
    ),    // 設定此 logger 的日誌輸出器
    transports: [
      new winston.transports.Console(),
      // 只有 error 等級的錯誤 , 才會將訊息寫到 error.log 檔案中
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      // info or 以上的等級的訊息 , 將訊息寫入 combined.log 檔案中
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  })

  fastify.decorate('logger', () => logger)
  fastify.decorate('counter', () => counter)

})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
    logger(): winston.Logger;
    counter(): Counter;
  }
}
