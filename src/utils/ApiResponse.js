/**
 * @author  Muhammad Bilal
 * @since   2021
 */

/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
exports.ApiSuccess = (message, results, statusCode) => {
    let response = {
            message,
            status: true,
            code: statusCode,
            ...results
        }
        // if (results)
        //     response['results'] = results;

    return response;
};

/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
exports.ApiValidation = (errors) => {
    return {
        message: "Validation errors",
        error: true,
        code: 422,
        errors
    };
};