/**
 * @author Earl Cameron
 * @description Error handlers
 */
/**
 * @name FormSubmissionError
 * @description             Gets thrown when an incoming form has an error in one o fits fields
 * @param {string} message  Message specifics for error
 */
class FormSubmissionError extends Error {
    constructor(message) {
        super(message)
        this.name = 'FormSubmissionError'
        this.message = message
    }
}
/**
 * @name NoSelectedRoleError
 * @description             Gets thrown when there is no role specified in the request query
 * @param {string} message  Message specifics for error
 */
class NoSelectedRoleError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NoSelectedRoleError'
        this.message = message
    }
}
/**
 * @name IncorrectPasswordError
 * @description             Gets thrown when the specified password doesn't match a hash
 * @param {string} message  Message specifics for error
 */
class IncorrectPasswordError extends Error {
    constructor(message) {
        super(message)
        this.name = 'IncorrectPasswordError'
        this.message = message
    }
}
/**
 * Exports
 */
module.exports= {
    FormSubmissionError,
    NoSelectedRoleError,
    IncorrectPasswordError
}