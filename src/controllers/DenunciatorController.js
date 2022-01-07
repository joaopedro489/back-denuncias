const Denunciator = require('../models/Denunciator');

const store = async(dataReq) => {
	try {
		const data = {
			name: dataReq.nome,
			cpf: dataReq.cpf
		};
		const denunciator = await Denunciator.create(data);
		return denunciator;
	} catch (err) {
		throw err + '!';
	}
}

module.exports = {
	store
}