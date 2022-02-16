import { serviceLogger } from './middleware/logging-middleware';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceConfig {
    carpro: {
        auth: {
            userName: string;
            password: string;
            clientId: string;
            clientSecret: string;
        };
        url: string;
    };
    fasttrack: {
        auth: {
            grantType: string;
            clientId: string;
            clientSecret: string;
        };
        url: string;
    };
}

export const getServiceConfig = (): ServiceConfig => {
    return {
        carpro: {
            auth: {
                userName: getEnvVariable('CARPRO_USER_NAME'),
                clientId: getEnvVariable('CARPRO_CLIENT_ID'),
                clientSecret: getEnvVariable('CARPRO_CLIENT_SECRET'),
                password: getEnvVariable('CARPRO_PASSWORD'),
            },
            url: getEnvVariable('CARPRO_URL'),
        },
        fasttrack: {
            auth: {
                clientId: getEnvVariable('FASTTRACK_CLIENT_ID'),
                clientSecret: getEnvVariable('FASTTRACK_CLIENT_SECRET'),
                grantType: getEnvVariable('FASTTRACK_GRAND_TYPE'),
            },
            url: getEnvVariable('FASTTRACK_URL'),
        },
    };
};

const getEnvVariable = (variableName: string, isOptional = false): string => {
    const value = process.env[variableName] as string;
    if (!value && !isOptional) {
        serviceLogger.error(
            `Error generating service config: Mandatory env variable ${variableName} not found`
        );
        throw new Error('Error generating service config plese check service logs');
    }
    return value;
};
