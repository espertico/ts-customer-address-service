
import { CustomerService } from './customer-service';
import { customLogger, Logger } from '../../middleware/logging-middleware';

export class customerServiceServiceImpl implements CustomerService {
    logger: Logger;

    constructor() {
        this.logger = new customLogger();
        this.logger.setComponent('customerServiceService');
    }

    public  addressCreate() {
        const logger = this.logger.setOperation('addressCreate');
        logger.context({ additional: 'info' }).info(
            'Address successfully created'
        );
        logger.info('this log message shall be found $addressId')
        return {
            addressId: '77',
        };
    }
    public  addressDelete() {
        const logger = this.logger.setOperation('addressDelete');
        logger.context({ additional: 'info' }).err({ err: 'err' }).info(
            'Address successfully deleted'
        );
        return {
        };
    }
    public  addressRetrieve() {
        const logger = this.logger.setOperation('addressRetrieve');
        logger.context({ additional: 'info' }).err({ err: 'err' }).info(
            'Trying to retrieve Address'
        );
        logger.context({ additional: 'info' }).err({ err: 'err' }).info(
            'Address successfully retireved'
        );
        return {
            address: {
                city: 'London',
                countryCode: 'GB',
                street: 'diagon alley',
                houseNumber: '7',
                zipCode: '77777',
            },
        };
    }
}
