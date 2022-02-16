/// <reference path="generated/models.ts" />
import { healthCheck, beforeMiddleware, afterMiddleware, createCustomerAddress, getCustomerAddresses, deleteCustomerAddresses } from './generated/app';
import { requestValidatorMiddleware } from './middleware/request-validator-middleware';
import {
    expressErrorLoggerMiddleware,
    //expressLoggerMiddleware,
} from './middleware/logging-middleware';
import { getCustomerService } from './injectables/component-injection';

beforeMiddleware.push(requestValidatorMiddleware);
afterMiddleware.push(expressErrorLoggerMiddleware);

healthCheck();

createCustomerAddress(async (req, res, customerService = getCustomerService()) => {
    return await customerService.addressCreate();
});

getCustomerAddresses(async (req, res, customerService = getCustomerService()) => {
    return await customerService.addressRetrieve();
});

deleteCustomerAddresses(async (req, res, customerService = getCustomerService()) => {
    return await customerService.addressDelete();
});
