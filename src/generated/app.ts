/// <reference path="models.ts" />

import * as express from 'express';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import { IncomingHttpHeaders } from 'http';
import { HttpError } from 'http-errors';

const apiJson = JSON.parse(fs.readFileSync('./src/generated/service.openapi.json').toString());
const serviceJson = JSON.parse(fs.readFileSync('./service.json').toString());
const manual = fs.readFileSync('./SERVICE.md').toString();
const changelog = fs.readFileSync('./CHANGELOG.md').toString();
const risklog = fs.readFileSync('./RISKLOG.md').toString();

export const app = express();

export const beforeMiddleware = [] as any;

export const afterMiddleware = [] as any;

const port = process.env.PORT || 8080;

app.listen(port, () => {
    // Notify the developer
    console.log(`The service has been started successfully on port ${port}!`);
    // List all routes
    app._router.stack.filter(r => r.route).map(r => {
        const method = Object.keys(r.route.methods)[0];
        const path = `http://localhost:${port}${r.route.path}`;
        const formatString = '\x1b[36m%s\x1b[0m\t\x1b[33m%s\x1b[0m';
        console.log(formatString, method, path);
    });
});

app.use('/customer-address-service/portal/api-ui', swaggerUi.serve, swaggerUi.setup(apiJson));
app.use(bodyParser.json());

// Define default routes
app.get('/customer-address-service/portal/api', (req, res) => res.send(apiJson));
app.get('/customer-address-service/portal/manual', (req, res) => res.send(manual));
app.get('/customer-address-service/portal/changelog', (req, res) => res.send(changelog));
app.get('/customer-address-service/portal/risklog', (req, res) => res.send(risklog));
app.get('/customer-address-service/portal/config', (req, res) => res.send(serviceJson));

export const healthCheck = () => app.get('/customer-address-service/health', (req, res) => res.send('Healthy'));

export const createCustomerAddress = (action: (req: {
    body: Paths.CreateCustomerAddress.RequestBody;
    headers: IncomingHttpHeaders;
    params: Paths.CreateCustomerAddress.PathParameters;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 201) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.CreateCustomerAddress.Responses.$201>) =>
    app.post(
        '/customer-address-service/customers/:customerId/addresses',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const getCustomerAddresses = (action: (req: {
    body: any;
    headers: IncomingHttpHeaders;
    params: Paths.GetCustomerAddresses.PathParameters;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200 | 404) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.GetCustomerAddresses.Responses.$200 | Paths.GetCustomerAddresses.Responses.$404>) =>
    app.get(
        '/customer-address-service/customers/:customerId/addresses',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const deleteCustomerAddresses = (action: (req: {
    body: any;
    headers: IncomingHttpHeaders;
    params: Paths.DeleteCustomerAddresses.PathParameters;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 204 | 404) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.DeleteCustomerAddresses.Responses.$204 | Paths.DeleteCustomerAddresses.Responses.$404>) =>
    app.delete(
        '/customer-address-service/customers/:customerId/addresses/:addressId',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const createVerificationDocument = (action: (req: {
    body: Paths.CreateVerificationDocument.RequestBody;
    headers: IncomingHttpHeaders;
    params: Paths.CreateVerificationDocument.PathParameters;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 201 | 404) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.CreateVerificationDocument.Responses.$201 | Paths.CreateVerificationDocument.Responses.$404>) =>
    app.post(
        '/customer-address-service/customers/:customerId/addresses/:addressId/verification',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const getVerificationDocument = (action: (req: {
    body: any;
    headers: IncomingHttpHeaders;
    params: Paths.GetVerificationDocument.PathParameters;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.GetVerificationDocument.Responses.$200>) =>
    app.get(
        '/customer-address-service/customers/:customerId/addresses/:addressId/verification',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );
