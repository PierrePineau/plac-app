export class ApiError extends Error {
    status: number
    constructor(status: number, message: string) {
      super(`Error ${status}: ${message}`)
      this.status = status
      Object.setPrototypeOf(this, ApiError.prototype)
    }
  }
  
  export class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized") {
      super(401, message)
      Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }
  }
  
  export class NotFoundError extends ApiError {
    constructor(message = "Not Found") {
      super(404, message)
      Object.setPrototypeOf(this, NotFoundError.prototype)
    }
  }
  
  export class ValidationError extends ApiError {
    constructor(message = "Validation Error") {
      super(422, message)
      Object.setPrototypeOf(this, ValidationError.prototype)
    }
  }
  
  export class NetworkError extends Error {
    constructor(message = "Network Error") {
      super(message)
      Object.setPrototypeOf(this, NetworkError.prototype)
    }
  }
  