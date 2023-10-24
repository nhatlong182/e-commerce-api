'use strict'

import reasonPhrases from "../utils/reasonPhrases.js"
import statusCodes from "../utils/statusCodes.js"


class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = reasonPhrases.CONFLICT, status = statusCodes.CONFLICT) {
    super(message, status)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = reasonPhrases.BAD_REQUEST, status = statusCodes.BAD_REQUEST) {
    super(message, status)
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(message = reasonPhrases.UNAUTHORIZED, status = statusCodes.UNAUTHORIZED) {
    super(message, status)
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = reasonPhrases.NOT_FOUND, status = statusCodes.NOT_FOUND) {
    super(message, status)
  }
}

export {
  ConflictRequestError,
  BadRequestError,
  AuthFailureError,
  NotFoundError
}