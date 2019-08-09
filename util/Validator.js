/**
 * @author Earl Cameron
 * @description Data validators
 */
/**
 * Dependencies
 */
const {
    FormSubmissionError
} = require('./Error')
/**
 * @name ValidateFields
 * @description             Validates that all field for incoming request
 * @param {string} required list of fields needed to be present 
 * @param {string} body     request from client with a new form to be validated
 * @TODO                    update this fn to properly check field names
 */
const validateFields = ({
    required,
    body
}) => {
    return new Promise((resolve, reject) => {
        let errFlag = false
        const errFields = []
        for (field in body) {
            for (reqField of required) {
                //check field names
                if (field === reqField.field) {
                    //check field nullable
                    //console.log(reqField.field, 'is nullable:', reqField.nullable, 'and is currently:', body[field], (body[field] ? true : false))
                    if (!reqField.nullable) {
                        if (!body[field]) {
                            !errFlag
                            errFields.push(field)
                        } else break
                    } else break
                }
            }!errFlag
        }
        //console.log('Fields with errors',errFields)
        if (errFields.length === 0) resolve(true)
        else reject(new FormSubmissionError(`Field(s):'${errFields}' can't be validated.`))
    })
}
/**
 * Exports
 */
module.exports = {
    validateFields: validateFields
}