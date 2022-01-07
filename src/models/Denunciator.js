const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const Denunciator = sequelize.define('Denunciator',{
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	cpf: {
		type: DataTypes.STRING,
		maxLength: 11,
		allowNull: false,
		unique: true
	}
});

Denunciator.associate = function(models){
	Denunciator.hasMany(models.Report);
}

module.exports = Denunciator;