const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const Address = sequelize.define('Address', {
	street: {
		type: DataTypes.STRING,
		allowNull: true
	},
	district: {
		type: DataTypes.STRING,
		allowNull: true
	},
	city: {
		type: DataTypes.STRING,
		allowNull: true
	},
	state: {
		type: DataTypes.STRING,
		allowNull: true
	},
	country: {
		type: DataTypes.STRING,
		allowNull: true
	},
	cep: {
		type: DataTypes.STRING,
		allowNull: true
	}
});

Address.associate = function(models){
	Address.hasMany(models.Report, {});
}

module.exports = Address;