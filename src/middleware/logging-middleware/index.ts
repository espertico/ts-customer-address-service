import * as winston from 'winston';
import * as fs from 'fs';

const apiJson = JSON.parse(fs.readFileSync(__dirname + '/../../../src/generated/service.openapi.json').toString());

//export const expressLoggerMiddleware = expressLoggerMiddlewareCreator(apiJson);

export const expressErrorLoggerMiddleware = [
    (err, req, res, next) => {
        // Skip error chain to avoid unnecessary logs
    },
];

export interface Logger {
    setComponent(obj: string)
    setOperation(obj: string)
    context(obj: any): Logger
    err(obj: any): Logger
    info(message: string)
    error(message: string)
    warn(message: string)
}

// inspired by https://stackoverflow.com/questions/14837558/nodejs-winston-logging-with-multiple-arguments
export class customLogger implements Logger {
    logger: winston.Logger;
    ctxObj: any;
    tracingId: string;

    constructor(id?: string) {
        this.logger = winston.createLogger({
            level: process.env.STAGE === 'prod' ? 'info' : 'debug',
            format: winston.format.json(),
            transports: [new winston.transports.Console()],
        });
        this.ctxObj = {};
        this.tracingId = id || '';
    }

    setComponent(obj: string) {
        this.ctxObj = { ...this.ctxObj, component: obj };
    }

    setOperation(obj: string): Logger {
        const l = new customLogger();
        l.logger = this.logger;
        l.ctxObj = { ...this.ctxObj, operation: obj };
        return l;
    }

    context(obj: any): Logger {
        const l = new customLogger();
        l.logger = this.logger;
        l.ctxObj = { ...this.ctxObj, ...obj };
        return l;
    }

    err(obj: any): Logger {
        const l = new customLogger();
        l.logger = this.logger;
        l.ctxObj = { ...this.ctxObj, error: obj };
        return l;
    }

    // wrapping the winston function to allow for multiple arguments
    info(msg: string) {
        this.logger.info(msg, { tracingId: this.tracingId, context: this.ctxObj });
    }

    error(msg: string) {
        this.logger.error(msg, { tracingId: this.tracingId, context: this.ctxObj });
    }

    warn(msg: string) {
        this.logger.warn(msg, { tracingId: this.tracingId, context: this.ctxObj });
    }
}

export const serviceLogger = new customLogger();
