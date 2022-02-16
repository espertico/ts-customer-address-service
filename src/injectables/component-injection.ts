import axios, { AxiosInstance } from 'axios';
import { getServiceConfig } from '../config';
import { Client, axiosErrorConverter } from '../utils/error.utils';
import { CustomerService } from './services/customer-service';
import { customerServiceServiceImpl } from './services/customer-service.impl';
const devStages = ['local', 'dev', 'int'];

// Ignored from coverage since there is actually no business logic to test in this file so far
/* istanbul ignore file */

/**
 * Method to create and instance of CustomerService  (simulates a kind of basic injection).
 * Enhance code de-coupling as no there is no longer any reference to CustomerService  in the code.
 * Any instance that extends CustomerService  can be returned here, also mocked ones.
 *
 * @returns an instance of the CustomerService
 */
export function getCustomerService(): CustomerService {
    return new customerServiceServiceImpl();
}
