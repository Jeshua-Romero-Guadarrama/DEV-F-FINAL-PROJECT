export class HttpError extends Error {
  constructor(statusCode, message, details) {
    super(message)
    this.statusCode = statusCode
    this.details = details
    this.name = "HttpError"
  }
}

export const createHttpError = (statusCode, message, details) => new HttpError(statusCode, message, details)
