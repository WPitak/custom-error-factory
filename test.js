/* eslint-env jest */
const factory = require('./index')

describe('custom error factory', () => {
  it('creates constructor for object inheriting from give base error', () => {
    const AError = factory('AError')
    const error = new AError()
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(AError)
  })
  it('accepts base error constructor to be inherited from', () => {
    const AError = factory('AError')
    const BError = factory('BError', { BaseError: AError })
    const aError = new AError()
    const bError = new BError()
    expect(bError).toBeInstanceOf(Error)
    expect(bError).toBeInstanceOf(AError)
    expect(bError).toBeInstanceOf(BError)
    expect(aError).not.toBeInstanceOf(BError)
  })
})

describe('error constructor', () => {
  it('handles missing new keyword', () => {
    const AError = factory('AError')
    const error1 = AError()
    const error2 = new AError()
    expect(error1).toEqual(error2)
  })
  it('accepts message and extra information arguments', () => {
    const AError = factory('AError')
    const message = 'custom message'
    const extra = { x: true }
    const error = new AError(message, extra)
    expect(error.message).toBe(message)
    expect(error.extra).toEqual(extra)
  })
  it('defaults code and message to those of base class', () => {
    const code = 101
    const defaultMessage = 'something went wrong'
    const AError = factory('AError', { code, defaultMessage })

    const a = new AError()
    expect(a.code).toBe(code)
    expect(a.message).toBe(defaultMessage)

    const BError = factory('BError', { BaseError: AError })
    const b = new BError()
    expect(b.code).toBe(code)
    expect(b.message).toBe(defaultMessage)
  })
})
