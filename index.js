const util = require('util')
const assert = require('assert')

/**
 * Create constructor for new error type
 * @param {string} subErrorName - name of new error type
 * @param {object} options
 * @param {function} options.baseError - base constructor to inherit from
 * @param {any} options.code - error code
 * @param {string} options.defaultMessage - default message for newly created error
 * @return {function} constructor for new error type
 */
module.exports = function factory (subErrorName, options = {}) {
  // Require subtype name
  assert(subErrorName, 'Subtype name for new error is required')

  // Base error
  const BaseError = options.baseError || Error
  const baseInstance = new BaseError()

  const SubErrorType = function SubErrorType (message, extra) {
    // Handle call without new keyword
    if (!(this instanceof SubErrorType)) {
      return new SubErrorType(message, extra)
    }

    // Initiate members
    this.name = subErrorName
    this.code = options.code || baseInstance.code
    this.message = message || options.defaultMessage || baseInstance.message
    this.extra = extra
    this.expose = false

    Error.captureStackTrace(this, this.constructor)
  }

  util.inherits(SubErrorType, BaseError)

  SubErrorType.prototype.toString = function toString () {
    return `${this.name}: ${util.inspect(this.message)}`
  }

  return SubErrorType
}
