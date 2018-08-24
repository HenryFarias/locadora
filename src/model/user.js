module.exports = function (sequelize, DataTypes) {
    const md5 = require('md5');

	const User = sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
            unique: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'user',
        hooks: {
            beforeCreate: (user) => {
                user.password = md5(user.password);
            }
        },
        defaultScope: {
            attributes: {exclude: ['deletedAt']},
        },
	});

	User.login = (email, password) => User.findOne({
		where: {
			email: email,
			password: md5(password)
		}
	});

    User.new = (request) => User.create(request);

    User.find = (id) => User.findById(id);

	return User;
};
