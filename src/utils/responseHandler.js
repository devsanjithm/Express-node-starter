const _ = require('lodash');
function removePasswordParameters(obj) {
  if (_.has(obj, 'user')) {
    delete obj.user.password;
  }
  return obj;
}
exports.resHandler = function (req, res, next) {
  const data = {
    data: removePasswordParameters(_.get(res.locals, 'res')),
    status: true,
  };
  res.send(data);
};
