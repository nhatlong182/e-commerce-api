'use strict'

const statusCode = {
  OK: 200,
  CREATED: 201
}

const reasonStatusCode = {
  OK: 'Success',
  CREATED: 'CREATED'
}

class SuccessResponse {
  constructor({ message, status = statusCode.OK, reason = reasonStatusCode.OK, metadata = {} }) {
    this.message = !message ? reason : message
    this.status = status
    this.metadata = metadata
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this)
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata })
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, status = statusCode.OK, reason = reasonStatusCode.OK, metadata }) {
    super({ message, status, reason, metadata })
  }
}

export {
  SuccessResponse,
  OK,
  CREATED
}