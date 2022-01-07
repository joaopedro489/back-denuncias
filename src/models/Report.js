const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');

const Report = sequelize.define('Report', {
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	}
});

Report.associate = function(models){
	Report.belongsTo(models.Denunciator);
	Report.belongsTo(models.Address);
}

module.exports = Report;