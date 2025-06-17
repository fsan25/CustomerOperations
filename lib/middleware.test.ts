import { ErrorHandlingMiddlewareFunction } from './middleware';
import { FailedRequestBodyError, InternalServerError, NotFoundError } from '../src/utils/errors';

describe('ErrorHandlingMiddlewareFunction', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('handles FailedRequestBodyError with 400', () => {
    const err = new FailedRequestBodyError('fail');
    ErrorHandlingMiddlewareFunction(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        fault: expect.objectContaining({
          code: 'badRequest',
          httpStatus: 400,
          failures: 'fail',
          message: 'An internal error was encountered processing the request',
          serverDateTime: expect.any(String),
        })
      })
    );
  });

  it('handles InternalServerError with 500', () => {
    const err = new InternalServerError('internal');
    ErrorHandlingMiddlewareFunction(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        fault: expect.objectContaining({
          code: 'internalError',
          httpStatus: 500,
          failures: 'internal',
          message: 'An internal error was encountered processing the request',
          serverDateTime: expect.any(String),
        })
      })
    );
  });

  it('handles NotFoundError with 404', () => {
    const err = new NotFoundError('not found');
    ErrorHandlingMiddlewareFunction(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        fault: expect.objectContaining({
          code: 'notFound',
          httpStatus: 404,
          failures: 'not found',
          message: 'Resource not found',
          serverDateTime: expect.any(String),
        })
      })
    );
  });

  it('handles unknown error with 500', () => {
    const err = new Error('unknown');
    ErrorHandlingMiddlewareFunction(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Server Error');
  });
});
