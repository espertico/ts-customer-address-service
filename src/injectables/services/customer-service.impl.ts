
import { CustomerService } from './customer-service';
import { customLogger, Logger } from '../../middleware/logging-middleware';

function DeleteAddressException(message) {
    this.message = message;
    this.name = "DeleteAddressException";
  }

export class customerServiceServiceImpl implements CustomerService {
    logger: Logger;

    constructor() {
        this.logger = new customLogger();
    }

    public  addressCreate() {
        const addressId = 'ID77'
        this.logger.info('creating address with addressID: ${addressId}')
        return {
            addressId: addressId,
        };
    }

    public  addressRetrieve() {
        const address =  {
            name: 'Max Power',
            creditcard: '4678-3456-1673-7799',
            city: 'London',
            countryCode: 'GB',
            street: 'diagon alley',
            houseNumber: '7',
            zipCode: '77777',
        }
        this.logger.debug('$address')
        return { address };
    }
    public  addressDelete() {
        this.logger.error('Address not found');
        throw new DeleteAddressException('Address not found')
    }
}
