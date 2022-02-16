import { getServiceConfig } from './config';

describe('Service Config', () => {
    it('should throw error if not all env variables are present', () => {
        expect(() => getServiceConfig()).toThrowError(
            'Error generating service config plese check service logs'
        );
    });

    it('should return service configuration', () => {
        process.env.CARPRO_USER_NAME = 'carpro-user-name';
        process.env.CARPRO_CLIENT_ID = 'carpro-client-id';
        process.env.CARPRO_CLIENT_SECRET = 'carpro-client-secret';
        process.env.CARPRO_PASSWORD = 'carpro-password';
        process.env.CARPRO_URL = 'carpro-url';
        process.env.FASTTRACK_CLIENT_ID = 'fasttrack-client-id';
        process.env.FASTTRACK_CLIENT_SECRET = 'fasttrack-client-secret';
        process.env.FASTTRACK_GRAND_TYPE = 'fasttrack-grand-type';
        process.env.FASTTRACK_URL = 'fasttrack-url';
        expect(getServiceConfig()).toEqual({
            carpro: {
                auth: {
                    userName: 'carpro-user-name',
                    clientId: 'carpro-client-id',
                    clientSecret: 'carpro-client-secret',
                    password: 'carpro-password',
                },
                url: 'carpro-url',
            },
            fasttrack: {
                auth: {
                    clientId: 'fasttrack-client-id',
                    clientSecret: 'fasttrack-client-secret',
                    grantType: 'fasttrack-grand-type',
                },
                url: 'fasttrack-url',
            },
        });
    });
});
