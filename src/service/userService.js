const User = require('../model/user')(global.db, global.Sequelize);

function service() {

}

service.create = (request) => {
    return User.new(request);
};

module.exports = service;