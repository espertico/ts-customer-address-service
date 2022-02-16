import { Client, axiosErrorConverter } from './error.utils';
import * as createError from 'http-errors';

describe('Utils', () => {
    describe('Carpro', () => {
        it('should create CARPRO errors', () => {
            expect(axiosErrorConverter(null, Client.CARPRO)).toEqual(
                new createError.InternalServerError('An unexpected error ocurred')
            );
            expect(axiosErrorConverter({ data: 'some data' }, Client.CARPRO)).toEqual(
                new createError.InternalServerError('')
            );
            expect(axiosErrorConverter({ response: { status: 400 } }, Client.CARPRO)).toEqual(
                new createError.BadRequest('')
            );
            expect(
                axiosErrorConverter(
                    { response: { status: 400, data: 'some test error' } },
                    Client.CARPRO
                )
            ).toEqual(new createError.BadRequest('some test error'));
            expect(
                axiosErrorConverter(
                    {
                        response: {
                            status: 400,
                            data: { Message: ' First part', ExceptionMessage: 'Second part  ' },
                        },
                    },
                    Client.CARPRO
                )
            ).toEqual(new createError.BadRequest('First part Second part'));
            expect(
                axiosErrorConverter(
                    {
                        response: {
                            status: 400,
                            data: {
                                statusCode: 400,
                                error: 'Bad Request',
                                messages: [
                                    'Validation failed',
                                    'interactionManagementStatus must be a valid enum value',
                                ],
                            },
                        },
                    },
                    Client.CARPRO
                )
            ).toEqual(
                new createError.BadRequest(
                    '{"statusCode":400,"error":"Bad Request","messages":["Validation failed","interactionManagementStatus must be a valid enum value"]}'
                )
            );

            expect(axiosErrorConverter({ request: {} }, Client.CARPRO)).toEqual(
                new createError.InternalServerError('No response was received from service')
            );
        });
    });

    describe('Fasttrack', () => {
        it('Should create Fasttrack errors', () => {
            expect(
                axiosErrorConverter(
                    { data: 'some data', message: 'test error message' },
                    Client.FASTTRACK
                )
            ).toEqual(new createError.InternalServerError('test error message'));

            expect(
                axiosErrorConverter(
                    {
                        response: { status: 400, data: { errors: ['error1', 'error2'] } },
                    },
                    Client.FASTTRACK
                )
            ).toEqual(new createError.BadRequest('{"errors":["error1","error2"]}'));

            const error = axiosErrorConverter(
                {
                    response: {
                        status: 422,
                        data: {
                            detail: [
                                {
                                    loc: ['string1', 'string2'],
                                    msg: 'some message 1',
                                    type: 'type 1',
                                },
                                {
                                    loc: ['string'],
                                    msg: 'some message 2',
                                    type: 'type 2',
                                },
                            ],
                        },
                    },
                },
                Client.FASTTRACK
            );
            const expectedError = new createError.UnprocessableEntity();
            expectedError.detail = [
                {
                    loc: ['string1', 'string2'],
                    msg: 'some message 1',
                    type: 'type 1',
                },
                {
                    loc: ['string'],
                    msg: 'some message 2',
                    type: 'type 2',
                },
            ];
            expect(error).toEqual(expectedError);
        });
    });

    describe('Unknown client', () => {
        it('Should create error', () => {
            expect(
                axiosErrorConverter(
                    { response: { status: 400, data: 'some test error' } },
                    'test' as any
                )
            ).toEqual(new createError.BadRequest('some test error'));
        });
    });
});
