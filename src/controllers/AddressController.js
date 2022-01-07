const Address = require('../models/Address');

const store = async(dataApi) => {
	try{
		const data = {
			street: dataApi.street,
			district: dataApi.adminArea6,
			city: dataApi.adminArea5,
			country: dataApi.adminArea1,
			state: dataApi.adminArea3,
			cep: dataApi.postalCode
		};
		const address = await Address.create(data);
		return address;
	} catch(err){
		throw err + '!';
	}
}

module.exports = {
	store
};