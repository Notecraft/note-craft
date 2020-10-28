import { Response } from "express";
import errorHandler from "../../../src/server/middlewares/ErrorHandler";

describe("ErrorHandler", () => {
  it("should render error page", () => {
    const mockErr = jest.fn();
    const mockRequest: any = {
      app: {
        get: jest.fn((env) => "development"),
      },
    };
    const mockResponse = {
      locals: jest.fn(),
      status: jest.fn(),
      render: jest.fn(),
    } as Partial<Response>;

    errorHandler(mockErr, mockRequest, mockResponse, null);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.render).toHaveBeenCalledWith("error");
  });
});
