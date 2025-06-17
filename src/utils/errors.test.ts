import * as errors from "./errors";
describe("utils/errors", () => {
  it("should export error classes", () => {
    expect(errors.InternalServerError).toBeDefined();
    expect(errors.FailedRequestBodyError).toBeDefined();
    expect(errors.NotFoundError).toBeDefined();
  });

  it("InternalServerError.response() should return fault object", () => {
    const err = new errors.InternalServerError("failures");
    const resp = err.response();
    expect(resp.fault).toBeDefined();
    expect(resp.fault.code).toBe("internalError");
  });

  it("FailedRequestBodyError.response() should return fault object", () => {
    const err = new errors.FailedRequestBodyError("failures");
    const resp = err.response();
    expect(resp.fault).toBeDefined();
    expect(resp.fault.code).toBe("badRequest");
  });

  it("NotFoundError.response() should return fault object", () => {
    const err = new errors.NotFoundError("failures");
    const resp = err.response();
    expect(resp.fault).toBeDefined();
    expect(resp.fault.code).toBe("notFound");
  });

  it("NotFoundError uses default message if not provided", () => {
    const err = new errors.NotFoundError();
    expect(err.message).toBe("Resource not found");
  });

  it("FailedRequestBodyError uses default message if not provided", () => {
    const err = new errors.FailedRequestBodyError();
    expect(err.message).toBe("An internal error was encountered processing the request");
  });
});
