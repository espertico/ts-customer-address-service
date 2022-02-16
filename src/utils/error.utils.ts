import { serviceLogger } from '../middleware/logging-middleware';
import * as createError from 'http-errors';

export enum Client {
    FASTTRACK,
    CARPRO,
}

// function is based on an example provided in axios documentation and adjusted to extract errors received from Accipiens.
/**
 * It extracts the error information from the axios response and shapes it.
 * @param error the axios error
 * @returns returns the error already with the right shape so it can be properly handled by albus
 */
export const axiosErrorConverter = (error: any, client: Client): createError.HttpError => {
    if (error) {
        if (error && error.response) {
            const { status, data, statusText } = error.response;
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            serviceLogger.error(`Original error: ${status} - ${statusText}`, data);

            switch (client) {
                case Client.CARPRO:
                    return extractCarproError(data, status);
                case Client.FASTTRACK:
                    return extractFasttrackError(data, status);
                default:
                    return createError(status, defaultMessageExtraction(data));
            }
        } else if (error.request) {
            // The request was made but no response was received. Since there is no response no information can be extracted
            serviceLogger.error('No response was received from service ', error.request);
            return createError(500, 'No response was received from service');
        } else {
            // Something happened in setting up the request that triggered an Error
            serviceLogger.error('Something happened in setting up the request ', error.message);
            return createError(500, error.message || '');
        }
    }
    serviceLogger.error('An unexpected error ocurred ', error?.config);
    return createError(500, 'An unexpected error ocurred');
};

const extractCarproError = (data, status) => {
    let message;
    if (data?.Message) {
        message = `${data.Message} ${data?.ExceptionMessage}`.trim();
    } else {
        message = defaultMessageExtraction(data);
    }

    return createError(status, message);
};

const extractFasttrackError = (data, status) => {
    if (status === 422) {
        const error = createError(status);
        error.detail = data?.detail ? data.detail : undefined;
        return error;
    }

    return createError(status, defaultMessageExtraction(data));
};

const defaultMessageExtraction = data => {
    return `${typeof data === 'string' ? data : data ? JSON.stringify(data) : ''}`;
};
