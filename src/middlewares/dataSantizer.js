const httpStatus = require('http-status');
const _ = require('lodash');
const { errorStatus } = require('../utils/constants');

/**
 * Internal function to remove password
 * @param {Object} obj - Object from the service
 * @returns
 */
function removePasswordParameters(obj) {
  if (_.has(obj, 'user')) {
    delete obj.user.password;
  }
  return obj;
}

/**
 * Middleware to sanitize password parameters from the response.
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object
 * @param {Function} next - The callback function to pass control to the next middleware.
 */
const dataSantizer = (req, res, next) => {
  const originalJson = res.json;
  console.log(errorStatus.includes(res.statusCode.toString().charAt(0)), res.statusCode);
  if (errorStatus.includes(res.statusCode.toString().charAt(0))) {
    console.log('------------- res error');
    res.json = function (originalData) {
      originalJson.call(res, { error: originalData, status: false });
    };
  } else {
    console.log('------------- res success');
    res.json = function (originalData) {
      const sanitizedData = removePasswordParameters(originalData);
      originalJson.call(res, { data: sanitizedData, status: true });
    };
  }
  next();
};

module.exports = dataSantizer;
